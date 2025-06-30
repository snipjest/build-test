<script lang="ts" setup>
definePageMeta({
  layout: 'no-footer'
})

const { data, error } = await useFetch<any>('/api/politika/')

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode || 500,
    message: error.value.message || 'Произошла неизвестная ошибка',
    fatal: true
  })
}

if (data.value) {
  if (data.value.seo && data.value.seo.meta) {
    useSeoMeta(data.value.seo.meta)
  }
  if (data.value.schemaOrg) {
    useSchemaOrg(data.value.schemaOrg)
  }
}
</script>

<template>
  <main>
    <div class="info-page">
      <div class="container">
        <h1 class="info-page__title typo-h3">{{ data.seo.H1 }}</h1>
        <div class="info-page__content user-content" v-html="data.content" />
        <!--      TODO: Поменять ссылку на свой сайт-->
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.info-page {
  padding: 40px 0;

  @media (min-width: $tablet) {
    padding: 80px 0;
  }
}
</style>
