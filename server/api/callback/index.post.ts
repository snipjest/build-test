export default defineEventHandler(async event => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl
  const body = await readBody(event)

  // Если baseUrl не задан
  if (!baseUrl) {
    // return console.log(body)
  }

  // Иначе — запрос к удалённому серверу
  const response: any = await $fetch(`${baseUrl}/api/callback/`, {
    method: 'POST',
    body
  })
  return response
})
