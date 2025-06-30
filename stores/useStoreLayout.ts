import { defineStore } from 'pinia'

interface State {
  _logo: any | undefined
  _header: any | undefined
  _footer: any | undefined
}

export const useStoreLayout = defineStore('layout', {
  state: (): State => ({
    _logo: undefined,
    _header: undefined,
    _footer: undefined
  }),

  getters: {
    logo: state => state._logo,
    header: state => state._header,
    footer: state => state._footer
  },

  actions: {
    async fetch() {
      try {
        const response = await $fetch<any>(`/api/layout/`, {
          headers: useRequestHeaders(['cookie'])
        })

        this._logo = response.logo
        this._header = response.header
        this._footer = response.footer
      } catch (error: any) {
        throw createError({
          statusCode: error.statusCode,
          message: 'Ошибка сервера'
        })
      }
    }
  }
})
