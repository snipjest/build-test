import { setLocale } from 'yup'

export default defineNuxtPlugin((_nuxtApp) => {
  setLocale({
    mixed: {
      default: 'Поле неверно заполнено',
      required: 'Пожалуйста, заполните это поле',
    },
    string: {
      email: 'Некорректный email',
    },
    array: {
      min: 'Файлы должны быть добавлены',
      max: 'Максимальное количество файлов достигнуто',
    },
  })
})
