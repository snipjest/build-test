import type { Pinia } from 'pinia'
import { useStoreLayout } from '@/stores/useStoreLayout'

export default defineNuxtPlugin(async nuxtApp => {
  const pinia = nuxtApp.$pinia as Pinia
  const layout = useStoreLayout(pinia)
  await layout.fetch()
})
