import { createError } from 'h3'
import type { CalendlyEventType, CalendlySlot } from '../../app/types/calendly'

interface CalendlyUserResponse {
    resource: {
        uri: string
        name: string
        slug: string
    }
}

interface CalendlyEventTypesResponse {
    collection: Array<{
        uri: string
        name: string
        slug: string
        duration: number
        description_plain?: string | null
        scheduling_url: string
        active: boolean
    }>
}

interface CalendlyAvailableTimesResponse {
    collection: Array<{
        status: string
        invitees_remaining: number
        start_time: string
        scheduling_url: string
    }>
}

function useCalendlyConfig() {
    const config = useRuntimeConfig()
    const apiKey = config.calendly?.apiKey

    if (!apiKey) {
        throw new Error('CALENDLY_API_KEY is not configured.')
    }

    return { apiKey, baseUrl: 'https://api.calendly.com' }
}

async function calendlyRequest<T>(path: string, query?: Record<string, string>): Promise<T> {
    const { apiKey, baseUrl } = useCalendlyConfig()

    // Build URL with explicit encoding so URI values in query params are safe
    let fullUrl = `${baseUrl}${path}`
    if (query && Object.keys(query).length > 0) {
        const qs = Object.entries(query)
            .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
            .join('&')
        fullUrl += `?${qs}`
    }

    console.log('[calendlyRequest]', fullUrl.replace(apiKey, '***'))

    try {
        return await $fetch<T>(fullUrl, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        })
    } catch (error: unknown) {
        const err = error as { response?: { status?: number; _data?: unknown }; message?: string }
        const statusCode = err?.response?.status ?? 500
        const data = err?.response?._data as { message?: string } | undefined
        const statusMessage = data?.message ?? err?.message ?? 'Calendly API error'
        console.error('[calendlyRequest] failed', { fullUrl, statusCode, statusMessage, data })
        throw createError({ statusCode, statusMessage })
    }
}

export async function getCalendlyUserUri(): Promise<string> {
    const data = await calendlyRequest<CalendlyUserResponse>('/users/me')
    return data.resource.uri
}

export async function listCalendlyEventTypes(userUri: string): Promise<CalendlyEventType[]> {
    const data = await calendlyRequest<CalendlyEventTypesResponse>('/event_types', {
        user: userUri,
        active: 'true',
    })

    return data.collection.map(et => ({
        uri: et.uri,
        name: et.name,
        slug: et.slug,
        duration: et.duration,
        description: et.description_plain ?? undefined,
        schedulingUrl: et.scheduling_url,
    }))
}

export async function listCalendlyAvailableTimes(
    eventTypeUri: string,
    startTime: string,
    endTime: string,
    durationMinutes: number,
): Promise<CalendlySlot[]> {
    const data = await calendlyRequest<CalendlyAvailableTimesResponse>('/event_type_available_times', {
        event_type: eventTypeUri,
        start_time: startTime,
        end_time: endTime,
    })

    const stepMs = durationMinutes * 60_000

    return data.collection
        .filter(slot => slot.status === 'available' && slot.invitees_remaining > 0)
        .map(slot => ({
            start: slot.start_time,
            end: new Date(new Date(slot.start_time).getTime() + stepMs).toISOString(),
            schedulingUrl: slot.scheduling_url,
        }))
}
