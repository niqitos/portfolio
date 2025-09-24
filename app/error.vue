<script setup lang="ts">
import type { NuxtError } from '#app'

const { navLinks } = useLinks()
const { t, locale } = useI18n()

defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true
  }
})

useHead({
  htmlAttrs: {
    lang: locale.value
  }
})

useSeoMeta({
  title: t('error.404.title'),
  description: t('error.404.description')
})

const [{ data: navigation }, { data: files }] = await Promise.all([
  useAsyncData('navigation', () => Promise.all([
    queryCollectionNavigation(`blog_${locale.value}`)
  ]), {
    transform: data => data.flat()
  }),
  useLazyAsyncData('search', () => Promise.all([
    queryCollectionSearchSections(`blog_${locale.value}`)
  ]), {
    server: false,
    transform: data => data.flat()
  })
])
</script>

<template>
  <div>
    <AppHeader />

    <UMain>
      <UContainer>
        <UPage>
          <UError
            :error="error"
            :clear="{
              label: $t('error.back'),
              color: 'primary',
              size: 'lg',
              variant: 'solid'
            }"
          />
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        shortcut="meta_k"
        :navigation="navigation"
        :links="navLinks"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>

    <UToaster />
  </div>
</template>
