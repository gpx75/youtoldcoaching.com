import { getCalendlyUserUri, listCalendlyEventTypes } from '../../utils/calendly'

export default defineEventHandler(async () => {
    try {
        const userUri = await getCalendlyUserUri()
        const eventTypes = await listCalendlyEventTypes(userUri)
        return { eventTypes }
    } catch (error) {
        console.error('[api/calendly/event-types]', error)
        throw createError({ statusCode: 500, statusMessage: 'Unable to load event types.' })
    }
})
