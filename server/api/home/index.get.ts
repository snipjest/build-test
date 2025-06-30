import data from '@/mock-data/home/index.json'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  // Если baseUrl не задан — возвращаем mock-данные
  if (!baseUrl) {
    return data
  }

  // Иначе — запрос к удалённому серверу
  const response: any = await $fetch(`${baseUrl}/api/home/`)
  return response
})
