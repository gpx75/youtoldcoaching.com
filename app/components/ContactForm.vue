<script setup lang="ts">
const { data: siteData } = await useAsyncData('site-contact-form', () => {
    return queryCollection('site').first()
})

const labels = computed(() => siteData.value?.contactForm?.labels ?? {})
const contactEmail = computed(() => siteData.value?.contact?.email ?? '')

const form = reactive({
    name: '',
    email: '',
    subject: '',
    message: '',
})

const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
const errorMessage = ref('')

async function handleSubmit() {
    status.value = 'sending'
    errorMessage.value = ''

    try {
        await $fetch('/api/contact', {
            method: 'POST',
            body: {
                name: form.name,
                email: form.email,
                subject: form.subject,
                message: form.message,
            },
        })
        status.value = 'success'
        form.name = ''
        form.email = ''
        form.subject = ''
        form.message = ''
    } catch (err: any) {
        status.value = 'error'
        errorMessage.value = err?.data?.statusMessage || err?.statusMessage || 'Something went wrong. Please try again.'
    }
}
</script>

<template>
    <div>

            <!-- Success state -->
            <Transition
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100"
            >
                <UCard v-if="status === 'success'">
                    <div class="text-center space-y-3 py-4">
                        <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-(--ui-primary)/10">
                            <UIcon name="i-heroicons-check-circle" class="w-7 h-7 text-primary" />
                        </div>
                        <p class="font-serif text-xl font-semibold text-highlighted">
                            {{ labels.successTitle }}
                        </p>
                        <p class="text-sm text-muted">
                            {{ labels.successMessage }}
                        </p>
                        <UButton
                            color="neutral"
                            variant="ghost"
                            size="md"
                            :label="labels.sendAnother"
                            @click="status = 'idle'"
                        />
                    </div>
                </UCard>
            </Transition>

            <!-- Form -->
            <UCard v-if="status !== 'success'">
                <div class="space-y-5">
                    <div>
                        <p class="font-serif text-xl font-semibold text-highlighted">
                            {{ labels.heading }}
                        </p>
                        <p class="text-sm text-muted mt-1">
                            {{ labels.description }}
                        </p>
                    </div>

                    <UAlert
                        v-if="status === 'error'"
                        color="error"
                        variant="soft"
                        icon="i-heroicons-exclamation-circle"
                        :title="errorMessage"
                        class="mb-2"
                    />

                    <form class="space-y-4" @submit.prevent="handleSubmit">
                        <div class="grid gap-4 sm:grid-cols-2">
                            <UFormField :label="labels.nameLabel" required>
                                <UInput
                                    v-model="form.name"
                                    :placeholder="labels.namePlaceholder"
                                    class="w-full"
                                    required
                                />
                            </UFormField>

                            <UFormField :label="labels.emailLabel" required>
                                <UInput
                                    v-model="form.email"
                                    type="email"
                                    :placeholder="labels.emailPlaceholder"
                                    class="w-full"
                                    required
                                />
                            </UFormField>
                        </div>

                        <UFormField :label="labels.subjectLabel">
                            <UInput
                                v-model="form.subject"
                                :placeholder="labels.subjectPlaceholder"
                                class="w-full"
                            />
                        </UFormField>

                        <UFormField :label="labels.messageLabel" required>
                            <UTextarea
                                v-model="form.message"
                                :placeholder="labels.messagePlaceholder"
                                :rows="5"
                                class="w-full"
                                required
                            />
                        </UFormField>

                        <UButton
                            type="submit"
                            color="secondary"
                            size="xl"
                            class="w-full"
                            icon="i-heroicons-paper-airplane"
                            :loading="status === 'sending'"
                            :disabled="!form.name || !form.email || !form.message"
                            :label="status === 'sending' ? labels.sendingButton : labels.submitButton"
                        />
                    </form>

                    <p v-if="contactEmail" class="text-center text-xs text-muted">
                        {{ labels.emailFallback }}
                        <a :href="`mailto:${contactEmail}`" class="text-primary hover:underline">
                            {{ contactEmail }}
                        </a>
                    </p>
                </div>
            </UCard>
    </div>
</template>
