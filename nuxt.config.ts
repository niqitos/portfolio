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
  },

  icon: {
    clientBundle: {
      icons: [
        // Lucide Icons
        'lucide:arrow-right',
        'lucide:check-circle',
        'lucide:chevron-left',
        'lucide:copy',
        'lucide:copy-check',
        'lucide:cookie',
        'lucide:download',
        'lucide:file',
        'lucide:file-text',
        'lucide:folder',
        'lucide:hash',
        'lucide:house',
        'lucide:languages',
        'lucide:mail',
        'lucide:mic',
        'lucide:moon',
        'lucide:plus',
        'lucide:presentation',
        'lucide:search',
        'lucide:sun',
        'lucide:user',
        // logos Icons
        'logos:php',
        'logos:laravel',
        'logos:wordpress-icon',
        'logos:yii',
        'logos:opencart',
        'logos:drupal-icon',
        'logos:sqlite',
        'logos:mysql-icon',
        'logos:postgresql',
        'logos:mongodb-icon',
        'logos:elasticsearch',
        'logos:javascript',
        'logos:typescript-icon',
        'logos:jquery',
        'logos:vue',
        'logos:nuxt-icon',
        'logos:vuetifyjs',
        'logos:vueuse',
        'logos:pinia',
        'logos:ionic-icon',
        'logos:capacitorjs-icon',
        'logos:react',
        'logos:nextjs-icon',
        'logos:material-ui',
        'logos:redux',
        'logos:expo-icon',
        'logos:html-5',
        'logos:css-3',
        'logos:tailwindcss-icon',
        'logos:bootstrap',
        'logos:bulma',
        'logos:linux-tux',
        'logos:bash-icon',
        'logos:docker-icon',
        'logos:aws',
        'logos:google-cloud',
        'logos:digital-ocean-icon',
        'logos:git-icon',
        'logos:github-icon',
        'logos:gitlab-icon'
      ]
    }
  }
})
