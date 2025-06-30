<script setup lang="ts">
const error = useError()

const handleError = () => {
  clearError({
    redirect: '/'
  })
}
</script>

<template>
  <NuxtLayout name="no-footer">
    <main>
      <div v-if="error" class="error-page">
        <div class="container">
          <div class="error-page__body">
            <div class="error-page__img">
              <img src="/images/page-error/home.jpg" alt="" />
            </div>
            <div class="error-page__info">
              <h1 class="error-page__title">{{ error.statusCode }}</h1>
              <p v-if="error.statusCode === 404" class="error-page__msg">
                Возможно, эта страница переехала, <br />
                или вы ввели неверный адрес
              </p>
              <p v-else class="error-page__msg typo-p2">
                {{ error.message }}
              </p>
              <button class="btn btn--primary" @click="handleError">Перейти на главную</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/abstracts/mixins.scss' as *;

.error-page {
  padding: 80px 0;
  flex: 1;
  display: flex;
  flex-direction: column;

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  &__body {
    width: 100%;
    max-width: 400px;
    text-align: center;

    @media (min-width: $tablet) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: stretch;
      gap: 24px;
      max-width: 952px;
    }
  }

  &__img {
    display: none;
    aspect-ratio: 1/1;
    overflow: hidden;
    border-radius: 20px;

    @media (min-width: $tablet) {
      display: block;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__info {
    aspect-ratio: 1/1;
    background-color: $color-neutral-600;
    padding: val(32, 40);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: val(12, 16);
  }

  &__title {
    color: #ffffff;
    font-size: val(64, 100);
    font-weight: 600;
    line-height: 130%;
    text-align: center;
  }

  &__msg {
    color: $color-neutral-200;
  }

  button {
    margin-top: auto;
  }
}
</style>
