import { Resend } from 'resend'

interface ContactBody {
    name: string
    email: string
    subject?: string
    message: string
}

export default defineEventHandler(async (event) => {
    const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
    if (!checkRateLimit(`contact:${ip}`, 5, 60 * 60 * 1000)) {
        throw createError({ statusCode: 429, statusMessage: 'Too many requests. Please try again later.' })
    }

    const body = await readBody<ContactBody>(event)

    if (!body?.name?.trim() || !body?.email?.trim() || !body?.message?.trim()) {
        throw createError({ statusCode: 400, statusMessage: 'Name, email, and message are required.' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
        throw createError({ statusCode: 400, statusMessage: 'Please provide a valid email address.' })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
        throw createError({ statusCode: 500, statusMessage: 'Email service is not configured.' })
    }

    const resend = new Resend(apiKey)
    const toEmail = process.env.CONTACT_EMAIL || 'hello@hildakilama.com'

    const subjectLine = body.subject?.trim()
        ? `[Website] ${body.subject.trim()}`
        : `[Website] New message from ${body.name.trim()}`

    const { error } = await resend.emails.send({
        from: `Hilda Kilama Website <onboarding@resend.dev>`,
        to: [toEmail],
        replyTo: body.email.trim(),
        subject: subjectLine,
        text: [
            `Name: ${body.name.trim()}`,
            `Email: ${body.email.trim()}`,
            body.subject?.trim() ? `Subject: ${body.subject.trim()}` : '',
            '',
            'Message:',
            body.message.trim(),
        ].filter(Boolean).join('\n'),
    })

    if (error) {
        console.error('Resend error:', error)
        throw createError({ statusCode: 500, statusMessage: 'Failed to send message. Please try again.' })
    }

    return { success: true }
})
