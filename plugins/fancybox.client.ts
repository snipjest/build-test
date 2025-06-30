import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'

import useLock from '@/composables/useLock'

export default defineNuxtPlugin(nuxtApp => {
  const { scrollLock, scrollUnLock } = useLock()

  nuxtApp.provide(
    'fancybox',
    Fancybox.bind('[data-fancybox]', {
      zoomEffect: false,
      Hash: false,
      Carousel: {
        Toolbar: {
          display: {
            left: ['infobar'],
            middle: [],
            right: ['close']
          }
        }
      },
      on: {
        init: () => {
          scrollLock()
          document.documentElement.style.overflow = ''
        },
        destroy: scrollUnLock
      }
    })
  )
})
