import { createVfm } from 'vue-final-modal'

export default defineNuxtPlugin((nuxtApp): void => {
  const vfm = createVfm() as any

  nuxtApp.vueApp.use(vfm)
})
