<script lang="ts" setup>
import { view } from '@/constants'
import Swiper from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

const {
  animateSplitText,
  animateDrawRandomUnderline,
  animate3DPerspective,
  animateStackingCards,
  animateHomeScreen,
  animateHomeScreenOnScroll,
  animateParallax,
  animateFadeInBottom,
  waitForDOMReady
} = useAnimate()

const isDomReady = ref<boolean>(false)

// const { data, error } = await useFetch<any>('/api/home/')

// if (error.value) {
//   throw createError({
//     statusCode: error.value.statusCode || 500,
//     message: error.value.message || 'Произошла неизвестная ошибка',
//     fatal: true
//   })
// }

const swiperRef = ref<HTMLElement | null>(null)
let swiperInstance: Swiper | null = null

function initCarousel(): void {
  if (swiperRef.value && window.innerWidth < view.tabletLg) {
    swiperInstance = new Swiper(swiperRef.value, {
      speed: 600,
      spaceBetween: 16,
      slidesPerView: 1.2,
      breakpoints: {
        768: {
          slidesPerView: 2.2
        }
      }
    })
  }
}

function destroyCarousel(): void {
  if (swiperInstance) {
    swiperInstance.destroy(true, true)
    swiperInstance = null
  }
}

function handleResize(): void {
  if (window.innerWidth < view.tabletLg) {
    if (!swiperInstance) {
      initCarousel()
    }
  } else {
    destroyCarousel()
  }
}

onMounted(() => {
  waitForDOMReady(() => {
    isDomReady.value = true
    animateHomeScreen()
    animateParallax()
    setTimeout(() => {
      animateHomeScreenOnScroll()
      animateFadeInBottom()
    }, 1700)
  })

  initCarousel()
  animateSplitText()
  animateDrawRandomUnderline()
  animate3DPerspective()
  animateStackingCards()
  window.addEventListener('resize', () => {
    handleResize()
  })
})

onUnmounted(() => {
  destroyCarousel()
  window.removeEventListener('resize', () => {
    handleResize()
  })
})
</script>

<template>
  <h1>sdfsdf</h1>
</template>

<style lang="scss" scoped>
.home-screen {
  position: relative;
  height: 100vh;
  min-height: 1080px;
  margin-top: -72px;
  color: $color-neutral-800;

  @media (min-width: $tablet) {
    margin-top: -80px;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 200px;
    background: linear-gradient(180deg, rgb(45 46 47 / 0%) 0%, #2d2e2f 100%);
  }

  &__inner {
    padding-top: 132px;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    transform-origin: center center;
    will-change: transform, border-radius;
    transition: border-radius 0.3s ease;

    @media (min-width: $tablet) {
      padding-top: 180px;
    }

    @media (min-width: $desktop-lg) {
      padding-top: 300px;
    }
  }

  &__bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1;
  }

  &__content {
    position: relative;
    z-index: 1;
  }

  &__description {
    margin-top: 16px;
    max-width: 708px;

    @media (min-width: $tablet) {
      margin-top: 20px;
    }
  }

  &__btn {
    margin-top: 24px;

    @media (min-width: $tablet) {
      margin-top: 32px;
    }
  }

  &__advantages {
    position: absolute;
    top: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translateX(-50%);
  }

  &__advantages-inner {
    position: absolute;
    bottom: -180px;
    right: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    padding: 0 16px;

    @media (min-width: $tablet) {
      gap: 32px;
      padding: 0 48px;
    }

    @media (min-width: $tablet-lg) {
      bottom: 50%;
      right: 48px;
      transform: translateY(50%);
      max-width: 342px;
      padding: 0;
    }
  }
}

.advantages {
  padding: 300px 0 60px;

  @media (min-width: $tablet-lg) {
    padding: 100px 0;
  }

  &__title {
    text-align: center;
    margin-bottom: 32px;

    @media (min-width: $tablet) {
      margin-bottom: 56px;
    }
  }

  &__list {
    display: grid;
    gap: 16px;
    grid-template-columns: 100%;

    @media (min-width: $tablet) {
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }

    @media (min-width: $tablet-lg) {
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
    }
  }
}

.quiz {
  padding: 60px 0;

  @media (min-width: $tablet) {
    padding: 100px 0;
  }
}

.work {
  padding: 60px 0;

  @media (min-width: $tablet) {
    padding: 100px 0;
  }

  &__frame {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    background-color: $color-neutral-700;
    padding: 32px 20px;

    @media (min-width: $tablet-lg) {
      padding: 60px 32px 87px;
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 24px;
    }
  }

  &__content {
    z-index: 2;

    @media (min-width: $tablet) {
      grid-column: 6 span / 12;
    }
  }

  &__list {
    padding-left: 18px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 20px;

    @media (min-width: $tablet) {
      margin-top: 24px;
    }
  }

  &__list-item {
    list-style-type: disc;
    color: $color-neutral-200;
  }

  &__btn {
    margin-top: 32px;
    width: 100%;

    @media (min-width: $tablet-lg) {
      width: auto;
    }
  }

  &__bg-img {
    &:first-child {
      position: relative;
      left: -20px;
      top: -32px;
      max-width: 490px;

      @media (min-width: $tablet-lg) {
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    &:last-child {
      display: none;

      @media (min-width: $tablet-lg) {
        display: block;
        position: absolute;
        right: 0;
        bottom: 0;
        max-width: 200px;
      }
    }
  }
}

.projects {
  padding: 60px 0;

  @media (min-width: $tablet) {
    padding: 100px 0;
  }

  &__title {
    margin-bottom: 32px;

    @media (min-width: $tablet) {
      margin-bottom: 48px;
    }
  }

  &__list {
    display: grid;
    grid-template-columns: 100%;
    gap: 32px;

    @media (min-width: $tablet) {
      grid-template-columns: repeat(12, 1fr);
      gap: 48px 24px;
    }

    .card-project {
      @media (min-width: $tablet) {
        grid-column: 6 span;
      }

      @media (min-width: $desktop) {
        grid-column: 4 span;
      }
    }
  }
}

.offer {
  padding: 60px 0;

  @media (min-width: $tablet) {
    padding: 100px 0;
  }

  &__wrap {
    display: grid;
    gap: 20px;

    @media (min-width: $tablet-lg) {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__info {
    position: relative;
    overflow: hidden;
    height: 480px;
    border-radius: 20px;
    padding: 12px;

    @media (min-width: $tablet-lg) {
      height: 100%;
      padding: 24px;

      .card-glass {
        width: 342px;
      }
    }
  }

  &__info-bg {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  &__form {
    background-color: $color-neutral-700;
    border-radius: 20px;
    padding: 24px 20px;

    @media (min-width: $tablet) {
      padding: 32px;
    }
  }

  &__form-title {
    text-align: center;
  }

  &__form-description {
    text-align: center;
    color: $color-neutral-200;
    margin: 12px 0 32px;
  }
}

.types-work {
  padding: 60px 0 100px;

  @media (min-width: $tablet) {
    padding: 100px 0;
  }

  &__wrap {
    display: grid;
    gap: 32px;

    @media (min-width: $tablet-lg) {
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }
  }

  &__title {
    text-align: center;

    @media (min-width: $tablet-lg) {
      text-align: left;
      position: sticky;
      top: 44%;
    }
  }

  &__list {
    & > div:not(:last-of-type) {
      margin-bottom: 24px;
    }
  }
}

.partners {
  padding: 60px 0;

  @media (min-width: $tablet) {
    padding: 100px 0;
  }

  &__title {
    text-align: center;
    margin-bottom: 32px;

    @media (min-width: $tablet-lg) {
      margin-bottom: 56px;
    }
  }

  &__item {
    padding: 0 val(16, 40);
    margin: 0 val(8, 24);
    background-color: #ffffff;
    border-radius: val(20, 32);
  }

  &__img {
    aspect-ratio: 1/1;
    height: val(132, 262);
  }
}

.director {
  padding: 60px 0;

  @media (min-width: $tablet) {
    padding: 100px 0;
  }

  &__frame {
    display: grid;
    justify-items: center;
    gap: 40px;
    background-color: $color-neutral-700;
    padding: 40px 16px;
    border-radius: 20px;

    @media (min-width: $tablet-lg) {
      grid-template-columns: 302px 1fr;
      padding: 80px;
      border-radius: 40px;
      gap: 80px;
    }
  }

  &__profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    @media (min-width: $tablet-lg) {
      order: 1;
    }
  }

  &__profile-photo {
    width: 240px;
    border-radius: 1000px;
    margin-bottom: 32px;

    @media (min-width: $tablet-lg) {
      width: 100%;
    }
  }

  &__profile-name {
    margin-bottom: 8px;
  }

  &__profile-post {
    color: $color-neutral-200;
  }

  &__content {
    @media (min-width: $tablet-lg) {
      order: 2;
    }
  }

  &__title {
    margin-bottom: 24px;

    @media (min-width: $tablet) {
      margin-bottom: 32px;
    }
  }

  &__text {
    color: $color-neutral-200;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}

.services {
  padding: 60px 0;

  @media (min-width: $tablet) {
    padding: 100px 0;
  }

  &__title {
    margin-bottom: 32px;

    @media (min-width: $tablet-lg) {
      margin-bottom: 56px;
    }
  }

  .swiper-wrapper {
    @media (min-width: $tablet-lg) {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }

    @media (min-width: $desktop) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

.locations {
  padding: 60px 0 0;

  @media (min-width: $tablet) {
    padding: 100px 0 0;
  }

  &__title {
    text-align: center;
    margin-bottom: 32px;

    @media (min-width: $tablet) {
      margin-bottom: 56px;
    }
  }

  &__map {
    position: relative;
    width: 100%;
    height: 700px;
    border-radius: 20px 20px 0 0;
    overflow: hidden;

    @media (min-width: $tablet-lg) {
      border-radius: 0;
      height: 800px;
    }

    .yandex-container,
    .ymaps-2-1-79-map {
      position: absolute;
      top: 0;
      left: 0;
      height: 100% !important;
      width: 100% !important;
    }

    .container {
      position: relative;
      left: 0;
      top: 16px;
      z-index: 3;

      @media (min-width: $tablet-lg) {
        top: 40px;
      }
    }
  }

  &__map-overlay {
    display: none;

    @media (min-width: $tablet-lg) {
      opacity: 0;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-color: rgb(0 0 0 / 40%);
      transition: all 0.2s ease 0s;
      z-index: 2;

      @media (hover: hover) {
        &:hover {
          opacity: 1;
        }
      }
    }
  }

  &__map-overlay-text {
    display: flex;
    align-items: center;
    gap: 12px;

    svg {
      width: 36px;
      height: 36px;
    }
  }

  &__card {
    position: relative;
    background-color: $color-neutral-700;
    padding: 20px;
    border-radius: 20px;
    width: 100%;

    @media (min-width: $tablet-lg) {
      position: absolute;
      width: auto;
      padding: 24px;
    }
  }

  &__card-label {
    color: $color-neutral-200;
    margin-bottom: 8px;
  }

  &__card-office-hours {
    position: relative;
    margin-top: 40px;
    padding-left: 20px;

    &::before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 8px;
      background-color: $color-brand-100;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

.fade-preloader-enter-active,
.fade-preloader-leave-active {
  transition: opacity 0.4s;
}

.fade-preloader-enter-from,
.fade-preloader-leave-to {
  opacity: 0;
}
</style>
