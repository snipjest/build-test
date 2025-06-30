import plugin from "vue-yandex-maps";
import { defineNuxtPlugin } from "nuxt/app";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const settings = {
    apiKey: config.public.ymapsApiKey,
    lang: "ru_RU"
  };

  nuxtApp.vueApp.use(plugin, settings);
});
