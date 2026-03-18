import { listCalendlyAvailableTimes } from '../../utils/calendly'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    const eventTypeUri = typeof query.eventTypeUri === 'string' ? query.eventTypeUri : null
    const start = typeof query.start === 'string' ? query.start : null
    const end = typeof query.end === 'string' ? query.end : null
    const duration = query.duration ? Number.parseInt(String(query.duration), 10) : NaN

    if (!eventTypeUri || !start || !end) {
        throw createError({ statusCode: 400, statusMessage: 'Missing required parameters.' })
    }

    if (Number.isNaN(duration) || duration <= 0) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid duration.' })
    }

    // Calendly limits availability to 7 days per request.
    // Split the range into 7-day chunks and merge results.
    const startDate = new Date(start)
    const endDate = new Date(end)
    const sevenDays = 7 * 24 * 60 * 60 * 1000

    const chunks: Array<{ start: string; end: string }> = []
    let cursor = new Date(startDate)

    while (cursor < endDate) {
        const chunkEnd = new Date(Math.min(cursor.getTime() + sevenDays, endDate.getTime()))
        chunks.push({
            start: cursor.toISOString(),
            end: chunkEnd.toISOString(),
        })
        cursor = new Date(chunkEnd.getTime() + 1)
    }

    try {
        const results = await Promise.all(
            chunks.map(chunk => listCalendlyAvailableTimes(eventTypeUri, chunk.start, chunk.end, duration))
        )
        const slots = results.flat()
        return { slots }
    } catch (error) {
        console.error('[api/calendly/slots]', error)
        throw createError({ statusCode: 500, statusMessage: 'Unable to load availability.' })
    }
})
