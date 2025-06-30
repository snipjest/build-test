import VueMarquee from "vue3-marquee";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueMarquee, { name: "Vue3Marquee" });
});
