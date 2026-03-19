<script setup lang="ts">
const props = defineProps<{
    eyebrow?: string;
    title: string;
    subtitle?: string;
    tags?: string[];
    cta?: { label: string; href: string };
    cta2?: { label: string; href: string };
    contentSlides?: any[];
    bgImage?: string;
    videoSrc?: string;
    videoPoster?: string;
    illustration?: string;
    illustrationFill?: boolean;
    contentScroll?: boolean;
}>();

const hasDarkBg = computed(() => !!(props.bgImage || props.videoSrc));

const slideIndex = ref(0);
const slideDir = ref<'next' | 'prev'>('next');

const currentSlide = computed(() => props.contentSlides?.[slideIndex.value]);
const currentTitle = computed(() => (currentSlide.value as any)?.title ?? props.title);
const hasSlides = computed(() => (props.contentSlides?.length ?? 0) > 1);

let timer: ReturnType<typeof setInterval> | null = null;

function advance() {
    slideDir.value = 'next';
    slideIndex.value = (slideIndex.value + 1) % (props.contentSlides?.length ?? 1);
}

function goTo(i: number) {
    slideDir.value = i > slideIndex.value ? 'next' : 'prev';
    slideIndex.value = i;
    resetTimer();
}

function resetTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(advance, 10000);
}

onMounted(() => { if (hasSlides.value) resetTimer(); });
onUnmounted(() => { if (timer) clearInterval(timer); });
</script>

<template>
    <section class="relative flex w-full flex-col lg:h-full lg:overflow-hidden">
        <!-- Background image -->
        <div v-if="props.bgImage" class="pointer-events-none absolute inset-0 z-0">
            <img
                :src="props.bgImage"
                alt=""
                aria-hidden="true"
                class="h-full w-full object-cover object-center"
            />
            <div class="absolute inset-0 bg-(--ui-primary)/60" />
        </div>

        <!-- Background video -->
        <div v-if="props.videoSrc" class="pointer-events-none absolute inset-0 z-0">
            <video
                class="h-full w-full object-cover"
                :src="props.videoSrc"
                :poster="props.videoPoster"
                autoplay
                muted
                loop
                playsinline
                preload="metadata"
                aria-hidden="true"
            />
            <div class="absolute inset-0 bg-(--ui-bg)/55" />
        </div>

        <!-- Layout -->
        <div class="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-6 pb-10 md:px-10 lg:flex-row lg:items-stretch lg:gap-12 lg:min-h-0 lg:px-16 lg:py-0">

            <!-- Left: eyebrow + title + subtitle + optional portrait -->
            <div class="flex flex-col lg:w-5/12 lg:shrink-0 lg:py-10" :class="props.illustration ? '' : 'justify-center'">
                <div
                    v-if="props.eyebrow"
                    class="mb-6 inline-flex w-fit items-center gap-2.5 rounded-full px-4 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.3em] backdrop-blur-sm ring-1"
                    :class="hasDarkBg
                        ? 'bg-(--ui-on-dark-pill-bg) ring-(--ui-on-dark-pill-ring) text-(--ui-on-dark-text-soft)'
                        : 'bg-(--ui-primary)/6 ring-(--ui-primary)/30 text-(--ui-primary)/80'"
                >
                    <span
                        class="h-1.5 w-1.5 shrink-0 rounded-full"
                        :class="hasDarkBg ? 'bg-(--ui-on-dark-dot)' : 'bg-(--ui-primary)/70'"
                    />
                    {{ props.eyebrow }}
                </div>

                <h1
                    class="font-serif font-bold text-balance break-words"
                    :class="[
                        hasDarkBg ? 'text-(--ui-on-dark-text)' : 'text-highlighted',
                        props.illustration
                            ? 'mb-4 text-[2.4rem] sm:text-5xl lg:text-[3.5rem]'
                            : 'mb-6 text-[2.4rem] sm:text-5xl lg:text-6xl xl:text-7xl'
                    ]"
                >
                    {{ currentTitle }}
                </h1>

                <p
                    v-if="props.subtitle"
                    class="text-base leading-relaxed text-balance sm:text-lg"
                    :class="[hasDarkBg ? 'text-(--ui-on-dark-text-soft)' : 'text-muted', props.illustration ? 'mb-6' : 'mb-0']"
                >
                    {{ props.subtitle }}
                </p>

                <!-- Portrait (illustration pages only) -->
                <div
                    v-if="props.illustration"
                    class="mt-2 overflow-hidden rounded-2xl"
                    :class="props.illustrationFill ? 'h-64 sm:h-80 lg:h-120' : 'size-64 sm:size-80 lg:size-96'"
                >
                    <img
                        :src="props.illustration"
                        alt="Moya"
                        class="h-full w-full object-cover object-top"
                    />
                </div>
            </div>

            <!-- Right: sliding content + tags + CTA -->
            <div
                v-if="currentSlide || props.tags?.length || props.cta"
                class="flex flex-1 flex-col gap-7"
                :class="props.contentScroll ? 'lg:min-h-0 lg:overflow-hidden lg:py-10' : 'lg:py-10 justify-center'"
            >
                <!-- Slide content -->
                <div
                    v-if="currentSlide"
                    class="relative"
                    :class="props.contentScroll ? 'min-h-0 flex-1 overflow-y-auto scroll-smooth pr-1' : ''"
                >
                    <Transition :name="slideDir === 'next' ? 'slide-next' : 'slide-prev'" mode="out-in">
                        <ContentRenderer
                            :key="slideIndex"
                            :value="currentSlide"
                            class="prose prose-sm md:prose-base max-w-none"
                        />
                    </Transition>
                    <!-- Bottom fade hint when scrollable -->
                    <div
                        v-if="props.contentScroll"
                        class="pointer-events-none sticky bottom-0 hidden h-10 bg-linear-to-t from-default to-transparent lg:block"
                    />
                </div>

                <!-- Tags + CTA -->
                <div v-if="props.tags?.length || props.cta || props.cta2" class="flex flex-wrap items-center gap-3">
                    <div v-if="props.tags?.length" class="flex flex-wrap gap-2">
                        <span
                            v-for="tag in props.tags"
                            :key="tag"
                            class="rounded-full px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm ring-1"
                            :class="hasDarkBg
                                ? 'bg-(--ui-on-dark-pill-bg) ring-(--ui-on-dark-pill-ring-sm) text-(--ui-on-dark-text-muted)'
                                : 'bg-(--ui-bg)/80 ring-default text-muted'"
                        >
                            {{ tag }}
                        </span>
                    </div>
                    <div v-if="props.cta || props.cta2" class="flex flex-wrap gap-3">
                        <UButton
                            v-if="props.cta"
                            :to="props.cta.href"
                            color="secondary"
                            variant="solid"
                            size="lg"
                            trailing-icon="i-heroicons-arrow-right"
                            class="rounded-full"
                        >
                            {{ props.cta.label }}
                        </UButton>
                        <UButton
                            v-if="props.cta2"
                            :to="props.cta2.href"
                            color="neutral"
                            variant="outline"
                            size="lg"
                            :class="hasDarkBg ? 'rounded-full border-(--ui-on-dark-border) text-(--ui-on-dark-text) hover:bg-(--ui-on-dark-hover)' : 'rounded-full'"
                        >
                            {{ props.cta2.label }}
                        </UButton>
                    </div>
                </div>

                <!-- Slide dots -->
                <div v-if="hasSlides" class="flex items-center gap-2">
                    <button
                        v-for="(_, i) in props.contentSlides"
                        :key="i"
                        class="h-1.5 rounded-full transition-all duration-300"
                        :class="i === slideIndex
                            ? 'w-6 bg-primary'
                            : 'w-1.5 bg-primary/30 hover:bg-primary/60'"
                        :aria-label="`Go to slide ${i + 1}`"
                        @click="goTo(i)"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
    transition: opacity 0.4s ease, transform 0.4s ease;
}

.slide-next-enter-from { opacity: 0; transform: translateY(12px); }
.slide-next-leave-to   { opacity: 0; transform: translateY(-12px); }
.slide-prev-enter-from { opacity: 0; transform: translateY(-12px); }
.slide-prev-leave-to   { opacity: 0; transform: translateY(12px); }
</style>
