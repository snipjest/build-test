import checker from 'vite-plugin-checker'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  devServer: {
    port: 3000,
    host: '0.0.0.0'
  },

  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, minimum-scale=1, maximum-scale=1',
      htmlAttrs: {
        lang: 'ru'
      },
      meta: [{ name: 'apple-mobile-web-app-title', content: 'Arhitektor' }],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg'
        },
        {
          rel: 'shortcut icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '96x96',
          href: '/favicon-96x96.png'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png'
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest'
        }
      ]
    }
  },

  modules: [
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-schema-org',
    'yandex-metrika-module-nuxt3'
  ],
  css: ['@/assets/scss/main.scss', '@/assets/css/main.css', 'vue-final-modal/style.css'],
  vite: {
    plugins: [
      checker({
        eslint: {
          useFlatConfig: true,
          lintCommand: 'eslint "**/*.{js,ts,vue}"'
        },
        stylelint: {
          lintCommand: 'stylelint "**/*.{css,scss,vue}"'
        }
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api'],
          additionalData: `@use "@/assets/scss/general/variables.scss" as *; @use "@/assets/scss/abstracts/mixins.scss" as *;`
        }
      }
    }
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL
    }
  },

  yandexMetrika: {
    id: '',
    clickmap: true,
    trackLinks: true,
    webvisor: true,
    accurateTrackBounce: true
  }
})
