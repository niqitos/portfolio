// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'motion-v/nuxt'
  ],

  devtools: {
    enabled: true
  },

  css: [
    '@/assets/css/main.css'
  ],

  compatibilityDate: '2025-07-30',

  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  i18n: {
    compilation: {
      strictMessage: false
    },
    locales: [
      {
        name: 'Українська',
        code: 'uk',
        language: 'uk', // 'uk-UA',
        file: 'uk.js',
        dir: 'ltr'
      },
      {
        name: 'English',
        code: 'en',
        language: 'en', // 'en-GB',
        file: 'en.js',
        dir: 'ltr'
      }
    ],
    skipSettingLocaleOnNavigate: true,
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL,
    defaultLocale: process.env.DEFAULT_LOCALE as 'uk' | 'en' | undefined,
    detectBrowserLanguage: false
  }
})
