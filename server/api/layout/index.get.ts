import data from '/mock-data/layout/index.json'

export default defineEventHandler(async () => {

  // Если baseUrl не задан — возвращаем mock-данные
  return data
})
