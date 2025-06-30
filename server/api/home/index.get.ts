import data from '/mock-data/home/index.json'

export default defineEventHandler(async () => {

  // Если baseUrl не задан — возвращаем mock-данные
  return data
})
