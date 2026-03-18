import type { CalendlyEventType, CalendlySlot } from '~/types/calendly'

export function useCalendlyBooking() {
    const eventTypes = ref<CalendlyEventType[]>([])
    const slots = ref<CalendlySlot[]>([])
    const selectedEventType = ref<CalendlyEventType | null>(null)
    const selectedSlot = ref<CalendlySlot | null>(null)
    const loadingEventTypes = ref(false)
    const loadingSlots = ref(false)
    const error = ref<string | null>(null)

    async function loadEventTypes() {
        loadingEventTypes.value = true
        error.value = null

        try {
            const data = await $fetch<{ eventTypes: CalendlyEventType[] }>('/api/calendly/event-types')
            eventTypes.value = data.eventTypes ?? []
            if (eventTypes.value.length && !selectedEventType.value) {
                selectedEventType.value = eventTypes.value[0] ?? null
            }
        } catch {
            error.value = 'Failed to load session types.'
        } finally {
            loadingEventTypes.value = false
        }
    }

    async function loadSlots(start: string, end: string) {
        if (!selectedEventType.value) return

        loadingSlots.value = true
        error.value = null
        slots.value = []

        try {
            const data = await $fetch<{ slots: CalendlySlot[] }>('/api/calendly/slots', {
                query: {
                    eventTypeUri: selectedEventType.value.uri,
                    start,
                    end,
                    duration: selectedEventType.value.duration,
                },
            })
            slots.value = data.slots ?? []
        } catch {
            error.value = 'Failed to load availability.'
        } finally {
            loadingSlots.value = false
        }
    }

    const hasEventTypes = computed(() => eventTypes.value.length > 0)
    const hasSlots = computed(() => slots.value.length > 0)

    function reset() {
        selectedSlot.value = null
        error.value = null
    }

    return {
        eventTypes,
        slots,
        selectedEventType,
        selectedSlot,
        loadingEventTypes,
        loadingSlots,
        error,
        hasEventTypes,
        hasSlots,
        loadEventTypes,
        loadSlots,
        reset,
    }
}
