import data from '@/mock-data/home/index.json'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  // Если baseUrl не задан — возвращаем mock-данные
  return data
})
