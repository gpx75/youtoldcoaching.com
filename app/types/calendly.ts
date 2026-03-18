export interface CalendlyEventType {
    uri: string
    name: string
    slug: string
    duration: number
    description?: string
    schedulingUrl: string
}

export interface CalendlySlot {
    start: string
    end: string
    schedulingUrl: string
}
