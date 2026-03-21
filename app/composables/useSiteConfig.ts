export function useSiteConfig() {
    const { data } = useAsyncData('site-config', () => {
        return queryCollection('site').first()
    })

    const brandName = computed(() => data.value?.brand?.name ?? '')
    const titleSuffix = computed(() => data.value?.metaDefaults?.titleSuffix ?? brandName.value)
    const defaultDescription = computed(() => data.value?.metaDefaults?.description ?? '')
    const contactEmail = computed(() => data.value?.contact?.email ?? '')

    return { data, brandName, titleSuffix, defaultDescription, contactEmail }
}
