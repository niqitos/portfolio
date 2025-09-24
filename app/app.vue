<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'

const colorMode = useColorMode()
const { navLinks } = useLinks()
const { locale } = useI18n()

const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: locale.value
  }
})

useSeoMeta({
  titleTemplate: '%s - Nuxt Portfolio Template',
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/portfolio-light.png',
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/portfolio-light.png',
  twitterCard: 'summary_large_image'
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
  <UApp :locale="locales[locale]">
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <UMain class="relative">
        <NuxtPage />
      </UMain>
    </NuxtLayout>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
        shortcut="meta_k"
        :links="navLinks"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </UApp>
</template>
