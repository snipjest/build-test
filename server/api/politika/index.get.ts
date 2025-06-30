import data from '/mock-data/politika/index.json'

export default defineEventHandler(async () => {

  // Если baseUrl не задан — возвращаем mock-данные
  return data
})
