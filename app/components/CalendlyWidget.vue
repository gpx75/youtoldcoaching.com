<script setup lang="ts">
declare global {
    interface Window {
        Calendly?: {
            initPopupWidget(options: {
                url: string
                prefill?: {
                    name?: string
                    email?: string
                    date?: Date
                    customAnswers?: Record<string, string>
                }
            }): void
        }
    }
}

// Signal to the layout that this page needs to scroll
const pageScrollable = useState('pageScrollable', () => false)
pageScrollable.value = true
onUnmounted(() => { pageScrollable.value = false })

const booking = useCalendlyBooking()

const form = reactive({ name: '', email: '', notes: '' })

const userTimezone = computed(() => Intl.DateTimeFormat().resolvedOptions().timeZone)

const timeframe = computed(() => {
    const start = new Date()
    start.setDate(start.getDate() + 1)
    start.setHours(0, 0, 0, 0)
    const end = new Date(start)
    end.setDate(end.getDate() + 14)
    return { start: start.toISOString(), end: end.toISOString() }
})

interface DayGroup {
    key: string
    weekday: string
    date: string
    label: string
    slots: typeof booking.slots.value
}

const selectedDayKey = ref<string | null>(null)

const dayGroups = computed((): DayGroup[] => {
    const groups = new Map<string, DayGroup>()
    const keyFmt = new Intl.DateTimeFormat('en-CA', { timeZone: userTimezone.value, year: 'numeric', month: '2-digit', day: '2-digit' })
    const weekdayFmt = new Intl.DateTimeFormat('en', { weekday: 'short', timeZone: userTimezone.value })
    const dayFmt = new Intl.DateTimeFormat('en', { day: 'numeric', timeZone: userTimezone.value })
    const labelFmt = new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric', timeZone: userTimezone.value })

    for (const slot of booking.slots.value) {
        const d = new Date(slot.start)
        const key = keyFmt.format(d)
        const existing = groups.get(key)
        if (existing) {
            existing.slots.push(slot)
        } else {
            groups.set(key, {
                key,
                weekday: weekdayFmt.format(d).toUpperCase(),
                date: dayFmt.format(d),
                label: labelFmt.format(d),
                slots: [slot],
            })
        }
    }

    return Array.from(groups.values()).sort((a, b) => (a.key > b.key ? 1 : -1))
})

const selectedDayGroup = computed(
    () => dayGroups.value.find(g => g.key === selectedDayKey.value) ?? dayGroups.value[0] ?? null,
)

watch(dayGroups, groups => {
    if (groups.length && !selectedDayKey.value) {
        selectedDayKey.value = groups[0]?.key ?? null
    }
}, { immediate: true })

watch(() => booking.selectedEventType.value?.uri, async uri => {
    if (uri) {
        booking.selectedSlot.value = null
        selectedDayKey.value = null
        await booking.loadSlots(timeframe.value.start, timeframe.value.end)
    }
})

const selectedSlotSummary = computed(() => {
    const slot = booking.selectedSlot.value
    if (!slot) return null
    const d = new Date(slot.start)
    const e = new Date(slot.end)
    const dateFmt = new Intl.DateTimeFormat('en-GB', { weekday: 'short', month: 'short', day: 'numeric' })
    const timeFmt = new Intl.DateTimeFormat('en-GB', { hour: 'numeric', minute: '2-digit' })
    return `${dateFmt.format(d)} · ${timeFmt.format(d)} – ${timeFmt.format(e)}`
})

function formatTime(iso: string) {
    return new Intl.DateTimeFormat('en-GB', { hour: 'numeric', minute: '2-digit' }).format(new Date(iso))
}

function openCalendlyPopup() {
    const slot = booking.selectedSlot.value
    if (!slot || !window.Calendly) return

    // Use the slot's own scheduling_url — it already encodes the exact datetime,
    // so Calendly opens directly on the confirmation form rather than the calendar.
    const url = new URL(slot.schedulingUrl)
    url.searchParams.set('hide_gdpr_banner', '1')

    window.Calendly.initPopupWidget({
        url: url.toString(),
        prefill: {
            name: form.name,
            email: form.email,
            customAnswers: form.notes ? { a1: form.notes } : undefined,
        },
    })
}

useHead({
    link: [{ rel: 'stylesheet', href: 'https://assets.calendly.com/assets/external/widget.css' }],
    script: [{ src: 'https://assets.calendly.com/assets/external/widget.js', async: true }],
})

const route = useRoute()

onMounted(async () => {
    await booking.loadEventTypes()

    // Pre-select event type from ?type=15 or ?type=90 query param
    const typeParam = Number(route.query.type)
    if (typeParam && booking.eventTypes.value.length) {
        const match = booking.eventTypes.value.find(et => et.duration === typeParam)
        if (match) booking.selectedEventType.value = match
    }

    if (booking.selectedEventType.value) {
        await booking.loadSlots(timeframe.value.start, timeframe.value.end)
    }
})
</script>

<template>
    <section class="w-full py-12 sm:py-16">
        <div class="max-w-5xl mx-auto px-4 sm:px-6">

            <UAlert
                v-if="booking.error.value"
                color="error"
                variant="soft"
                icon="i-heroicons-exclamation-circle"
                :title="booking.error.value"
                class="mb-6"
            />

            <div class="grid gap-8 lg:grid-cols-[1.2fr,1fr]">

                <!-- Left: session type + availability -->
                <div class="space-y-6">

                    <!-- Session type selector -->
                    <UCard>
                        <div class="space-y-4">
                            <div>
                                <p class="font-semibold text-base text-highlighted">Choose a session</p>
                                <p class="text-sm text-muted mt-0.5">Select the type that best matches where you are.</p>
                            </div>

                            <div v-if="booking.loadingEventTypes.value" class="space-y-2">
                                <USkeleton class="h-14 rounded-xl" />
                                <USkeleton class="h-14 rounded-xl" />
                            </div>

                            <div v-else-if="booking.hasEventTypes.value" class="space-y-2">
                                <button
                                    v-for="et in booking.eventTypes.value"
                                    :key="et.uri"
                                    type="button"
                                    class="w-full rounded-xl border px-4 py-3 text-left transition-colors"
                                    :class="booking.selectedEventType.value?.uri === et.uri
                                        ? 'border-(--ui-primary) bg-(--ui-primary)/10'
                                        : 'border-(--ui-border) bg-(--ui-bg-elevated)/60 hover:border-(--ui-primary)/40 hover:bg-(--ui-bg-elevated)'"
                                    @click="booking.selectedEventType.value = et"
                                >
                                    <div class="flex items-center justify-between gap-4">
                                        <span class="text-sm font-semibold text-highlighted">{{ et.name }}</span>
                                        <UBadge color="neutral" variant="soft" size="sm" class="shrink-0 tabular-nums">
                                            {{ et.duration }} min
                                        </UBadge>
                                    </div>
                                    <p v-if="et.description" class="mt-1 text-xs text-muted line-clamp-2">
                                        {{ et.description }}
                                    </p>
                                </button>
                            </div>

                            <UAlert
                                v-else
                                color="warning"
                                variant="soft"
                                icon="i-heroicons-exclamation-triangle"
                                title="No session types found"
                                description="Check your Calendly configuration."
                            />
                        </div>
                    </UCard>

                    <!-- Time slot picker -->
                    <UCard>
                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <p class="font-semibold text-base text-highlighted">Pick a time</p>
                                <span class="text-xs text-muted">{{ userTimezone }}</span>
                            </div>

                            <!-- Loading -->
                            <div v-if="booking.loadingSlots.value" class="space-y-4">
                                <div class="flex gap-2 overflow-x-auto pb-1">
                                    <USkeleton v-for="n in 6" :key="n" class="h-16 w-14 shrink-0 rounded-xl" />
                                </div>
                                <div class="flex flex-wrap gap-2">
                                    <USkeleton v-for="n in 8" :key="n" class="h-9 w-24 rounded-lg" />
                                </div>
                            </div>

                            <!-- Slots -->
                            <div v-else-if="booking.hasSlots.value" class="space-y-5">
                                <!-- Day strip -->
                                <div class="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
                                    <button
                                        v-for="day in dayGroups"
                                        :key="day.key"
                                        type="button"
                                        class="flex min-w-[3.25rem] shrink-0 flex-col items-center rounded-xl border px-2 py-2.5 transition-colors"
                                        :class="selectedDayKey === day.key
                                            ? 'border-(--ui-primary) bg-(--ui-primary)/10'
                                            : 'border-(--ui-border) bg-(--ui-bg-elevated)/60 hover:border-(--ui-primary)/40 hover:bg-(--ui-bg-elevated)'"
                                        @click="selectedDayKey = day.key; booking.selectedSlot.value = null"
                                    >
                                        <span
                                            class="text-[10px] font-semibold uppercase tracking-wider"
                                            :class="selectedDayKey === day.key ? 'text-primary' : 'text-muted'"
                                        >
                                            {{ day.weekday }}
                                        </span>
                                        <span
                                            class="text-xl font-bold leading-tight tabular-nums"
                                            :class="selectedDayKey === day.key ? 'text-primary' : 'text-highlighted'"
                                        >
                                            {{ day.date }}
                                        </span>
                                        <span
                                            class="mt-0.5 text-[10px] tabular-nums"
                                            :class="selectedDayKey === day.key ? 'text-primary' : 'text-muted'"
                                        >
                                            {{ day.slots.length }} open
                                        </span>
                                    </button>
                                </div>

                                <!-- Times for selected day -->
                                <div v-if="selectedDayGroup" class="space-y-2">
                                    <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                                        {{ selectedDayGroup.label }}
                                    </p>
                                    <div class="flex flex-wrap gap-2">
                                        <button
                                            v-for="slot in selectedDayGroup.slots"
                                            :key="slot.start"
                                            type="button"
                                            class="rounded-lg border px-3 py-1.5 text-xs font-medium tabular-nums transition-colors"
                                            :class="booking.selectedSlot.value?.start === slot.start
                                                ? 'border-(--ui-primary) bg-(--ui-primary)/10 text-primary'
                                                : 'border-(--ui-border) bg-(--ui-bg-elevated)/60 hover:border-(--ui-primary)/40 hover:bg-(--ui-bg-elevated) text-highlighted'"
                                            @click="booking.selectedSlot.value = slot"
                                        >
                                            {{ formatTime(slot.start) }}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <UAlert
                                v-else-if="!booking.loadingEventTypes.value && !booking.loadingSlots.value"
                                color="neutral"
                                variant="soft"
                                icon="i-heroicons-calendar-x-mark"
                                title="No availability in the next 14 days"
                                description="Email hello@moyajames.com and we'll find a time."
                            />
                        </div>
                    </UCard>
                </div>

                <!-- Right: selected slot + form -->
                <div class="space-y-4">

                    <!-- Selected slot summary -->
                    <Transition
                        enter-active-class="transition duration-200 ease-out"
                        enter-from-class="opacity-0 -translate-y-1"
                        enter-to-class="opacity-100 translate-y-0"
                        leave-active-class="transition duration-150 ease-in"
                        leave-from-class="opacity-100 translate-y-0"
                        leave-to-class="opacity-0 -translate-y-1"
                    >
                        <UCard v-if="selectedSlotSummary">
                            <div class="flex items-start justify-between gap-4">
                                <div class="space-y-1">
                                    <p class="text-xs uppercase tracking-widest text-muted">Selected</p>
                                    <p class="font-semibold text-sm text-highlighted">{{ selectedSlotSummary }}</p>
                                    <p v-if="booking.selectedEventType.value" class="text-xs text-muted">
                                        {{ booking.selectedEventType.value.name }} · {{ booking.selectedEventType.value.duration }} min
                                    </p>
                                </div>
                                <UButton
                                    size="xs"
                                    variant="ghost"
                                    color="neutral"
                                    icon="i-heroicons-x-mark"
                                    aria-label="Clear selection"
                                    @click="booking.selectedSlot.value = null"
                                />
                            </div>
                        </UCard>
                    </Transition>

                    <!-- Booking form -->
                    <UCard>
                        <div class="space-y-5">
                            <div>
                                <p class="font-semibold text-base text-highlighted">Your details</p>
                                <p class="text-sm text-muted mt-0.5">
                                    I'll use these to prepare for our conversation.
                                </p>
                            </div>

                            <form class="space-y-4" @submit.prevent="openCalendlyPopup">
                                <UFormField label="Name">
                                    <UInput
                                        v-model="form.name"
                                        placeholder="Your name"
                                        size="lg"
                                        class="w-full"
                                        required
                                    />
                                </UFormField>

                                <UFormField label="Email">
                                    <UInput
                                        v-model="form.email"
                                        type="email"
                                        placeholder="you@example.com"
                                        size="lg"
                                        class="w-full"
                                        required
                                    />
                                </UFormField>

                                <UFormField label="What's on your mind?" :required="false">
                                    <UTextarea
                                        v-model="form.notes"
                                        placeholder="A brief note about where you are and what you're navigating (optional)"
                                        :rows="3"
                                        size="lg"
                                        class="w-full"
                                    />
                                </UFormField>

                                <UButton
                                    type="submit"
                                    color="secondary"
                                    size="lg"
                                    class="w-full"
                                    icon="i-heroicons-calendar-days"
                                    :disabled="!booking.selectedSlot.value || !form.name || !form.email"
                                    label="Continue to confirm"
                                />

                                <p v-if="!booking.selectedSlot.value" class="text-center text-xs text-muted">
                                    Select a time slot to continue
                                </p>
                            </form>
                        </div>
                    </UCard>
                </div>
            </div>
        </div>
    </section>
</template>
