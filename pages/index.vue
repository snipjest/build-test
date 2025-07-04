<script lang="ts" setup>
import { view } from '@/constants'
import Swiper from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import type { ID } from '@/types/ID'

const { handleCallback } = useHandleCallback()
const { openSuccessModal, openFailureModal } = useFeedback()
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
const isOverlayMap = ref<boolean>(true)

const { data, error } = await useFetch<any>('/api/home/')

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

const onSubmitSuccess = (): void => {
  openSuccessModal()
}

const onSubmitFailure = (): void => {
  openFailureModal()
}

const marqueeSettings = {
  duration: 40,
  pauseOnHover: false,
  direction: 'right',
  loop: 0
}

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

interface Place {
  id: ID
  latLng: number[]
}

let mapInstance: any

const yandexMarkerOptions = (place: Place) => {
  return {
    iconLayout: 'default#imageWithContent',
    iconImageHref: '/images/icon-map.svg',
    iconImageSize: [80, 80],
    iconImageOffset: [-40, -80]
  }
}

const handleMarkerClick = (place: Place): void => {
  mapInstance.panTo(place.latLng, {
    duration: 500,
    delay: 0
  })
  mapInstance.setCenter(place.latLng, 17)
}

const handleCreated = (map: any): void => {
  mapInstance = map
}

const hideOverlayMap = (): void => {
  isOverlayMap.value = false
}

onMounted((): void => {
  waitForDOMReady((): void => {
    isDomReady.value = true
    animateHomeScreen()
    animateParallax()
    setTimeout((): void => {
      animateHomeScreenOnScroll()
      animateFadeInBottom()
    }, 1700)
  })

  initCarousel()
  animateSplitText()
  animateDrawRandomUnderline()
  animate3DPerspective()
  animateStackingCards()
  window.addEventListener('resize', (): void => {
    handleResize()
  })
})

onUnmounted((): void => {
  destroyCarousel()
  window.removeEventListener('resize', (): void => {
    handleResize()
  })
})
</script>

<template>
  <main>
    <transition name="fade-preloader">
      <AppPreloader v-if="!isDomReady" />
    </transition>

    <section class="home-screen gsap-home">
      <div class="home-screen__inner gsap-perspective gsap-scale-block">
        <div class="container">
          <div class="home-screen__content">
            <div class="gsap-home-title">
              <h1 class="home-screen__title typo-h1" v-html="data.homeScreen.title" />
            </div>
            <div class="gsap-home-description">
              <p class="home-screen__description typo-p2" v-html="data.homeScreen.description" />
            </div>
            <div class="gsap-home-btn">
              <button class="home-screen__btn btn btn--primary" @click="handleCallback">Рассчитать проект</button>
            </div>
          </div>
        </div>
        <div class="container home-screen__advantages">
          <div class="home-screen__advantages-inner">
            <CardGlass
              v-for="(item, index) in data.homeScreen.advantages"
              :key="item.id"
              :card="item"
              :class="`gsap-perspective-item gsap-home-card-glass-${index}`"
            />
          </div>
        </div>
      </div>
      <div class="home-screen__bg gsap-scale-block">
        <div class="gsap-parallax-bg" :style="{ backgroundImage: `url(${data.homeScreen.image.url})` }" />
      </div>
    </section>

    <section class="advantages">
      <div class="container">
        <div class="gsap-container-split-text">
          <h2 class="advantages__title typo-h2 gsap-split-text" v-html="data.advantages.title" />
        </div>
        <div class="advantages__list gsap-fade-container">
          <CardAdvantages v-for="item in data.advantages.items" :key="item.id" :card="item" class="gsap-fade-item" />
        </div>
      </div>
    </section>

    <section class="quiz">
      <div class="container gsap-fade-container">
        <div class="gsap-fade-item" v-html="data.marquiz" />
      </div>
    </section>

    <section class="work">
      <div class="container gsap-fade-container">
        <div class="work__frame gsap-fade-item">
          <div class="work__bg">
            <img class="work__bg-img" src="/images/work-bg-1.png" alt="" />
            <img class="work__bg-img" src="/images/work-bg-2.png" alt="" />
          </div>
          <div class="work__content">
            <h2 class="work__title typo-h3" v-html="data.work.title" />
            <ul class="work__list">
              <li v-for="item in data.work.list" :key="item.id" class="work__list-item typo-p3">{{ item.text }}</li>
            </ul>
            <button class="work__btn btn btn--primary" @click="handleCallback">Начать сотрудничество</button>
          </div>
        </div>
      </div>
    </section>

    <section class="projects">
      <div class="container">
        <div class="gsap-container-split-text">
          <h2 class="projects__title typo-h2 gsap-split-text" v-html="data.projects.title" />
        </div>
        <div class="projects__list gsap-fade-container">
          <CardProject v-for="item in data.projects.items" :key="item.id" :card="item" class="gsap-fade-item" />
        </div>
      </div>
    </section>

    <section class="offer gsap-perspective">
      <div class="container">
        <div class="offer__wrap gsap-fade-container">
          <div class="offer__info gsap-fade-item">
            <div class="offer__info-bg gsap-parallax-bg" :style="{ backgroundImage: `url(${data.offer.image.url})` }" />
            <CardGlass :card="data.offer.advantage" class="gsap-perspective-item" />
          </div>
          <div class="offer__form gsap-fade-item">
            <h2 class="offer__form-title typo-h3">Получите бесплатный проект дома</h2>
            <p class="offer__form-description typo-p3">
              Оставьте заявку, и наш менеджер свяжется с вами в течение часа
            </p>
            <CallbackForm @submit-success="onSubmitSuccess" @submit-failure="onSubmitFailure" />
          </div>
        </div>
      </div>
    </section>

    <section class="types-work">
      <div class="container">
        <div class="types-work__wrap gsap-fade-container">
          <div class="types-work__heading">
            <div class="types-work__title gsap-container-split-text">
              <h2 class="typo-h2 gsap-split-text" v-html="data.typesWork.title" />
            </div>
          </div>
          <div class="types-work__list gsap-fade-item">
            <TypeWork v-for="item in data.typesWork.list" :key="item.id" :type="item" />
          </div>
        </div>
      </div>
    </section>

    <div class="gsap-stacking-card-end" />

    <section class="partners">
      <div class="gsap-container-split-text">
        <h2 class="partners__title typo-h2 gsap-split-text" v-html="data.partners.title" />
      </div>
      <div class="gsap-fade-container">
        <div class="gsap-fade-item">
          <Vue3Marquee
            :duration="marqueeSettings.duration"
            :pause-on-hover="marqueeSettings.pauseOnHover"
            :direction="marqueeSettings.direction"
            :loop="marqueeSettings.loop"
            :clone="true"
          >
            <div v-for="item in data.partners.list" :key="item.id" class="partners__item">
              <img class="partners__img" :src="item.image.url" :alt="item.image.alt" />
            </div>
          </Vue3Marquee>
        </div>
      </div>
    </section>

    <section class="director">
      <div class="container gsap-fade-container">
        <div class="director__frame gsap-fade-item">
          <div class="director__content">
            <h3 class="director__title typo-h3" v-html="data.director.title" />
            <div class="director__text" v-html="data.director.text" />
          </div>
          <div class="director__profile">
            <img :src="data.director.image.url" :alt="data.director.image.alt" class="director__profile-photo" />
            <p class="director__profile-name typo-p1">{{ data.director.name }}</p>
            <p class="director__profile-post typo-p3">{{ data.director.post }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="services">
      <div class="container">
        <div class="gsap-container-split-text">
          <h2 class="services__title typo-h2 gsap-split-text" v-html="data.services.title" />
        </div>
        <div ref="swiperRef" class="services__list swiper">
          <div class="swiper-wrapper gsap-fade-container">
            <div v-for="item in data.services.list" :key="item.id" class="swiper-slide gsap-fade-item">
              <CardService :card="item" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="locations">
      <div class="container">
        <div class="gsap-container-split-text">
          <h2 class="locations__title typo-h2 gsap-split-text" v-html="data.locations.title" />
        </div>
      </div>
      <div class="gsap-fade-container">
        <div class="locations__map gsap-fade-item">
          <div class="container">
            <div class="locations__card">
              <p class="locations__card-label typo-p3">Офис</p>
              <p class="locations__card-address typo-p1">{{ data.locations.address }}</p>
              <p class="locations__card-office-hours typo-p2">{{ data.locations.officeHours }}</p>
            </div>
          </div>
          <div v-if="isOverlayMap" class="locations__map-overlay" @click="hideOverlayMap">
            <div class="locations__map-overlay-text">
              <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M213.304 128h42.654V42.667h-42.654zM42.688 256h85.308v-42.666H42.688zm101.466-81.674L83.84 113.974l30.156-30.166l60.313 60.352zm-30.159 211.187l-30.156-30.165l60.312-60.352l30.157 30.165zM325.12 174.326l-30.157-30.166l60.313-60.352l30.157 30.166zm3.156 178.041l59.588 59.606l24.142-24.15l-59.609-59.605l42.932-42.923l-150.612-40.682l40.67 150.656zm-62.659 116.97l-75.39-279.21l279.128 75.392l-62.66 62.699l59.61 59.605l-78.441 78.443l-59.588-59.605z"
                />
              </svg>
              <p class="typo-p1-semibold">Кликните для взаимодействия</p>
            </div>
          </div>
          <ClientOnly>
            <YandexMap :controls="[]" :coordinates="data.locations.map.center" :zoom="13" @created="handleCreated">
              <YandexClusterer>
                <YandexMarker
                  :marker-id="data.locations.map.place.id"
                  :coordinates="data.locations.map.place.latLng"
                  :options="yandexMarkerOptions(data.locations.map.place)"
                  @click="handleMarkerClick(data.locations.map.place)"
                />
              </YandexClusterer>
            </YandexMap>
          </ClientOnly>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.home-screen {
  position: relative;
  height: 100vh;
  min-height: 1080px;
  max-height: 1080px;
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
      top: 100px;
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
    padding: 0 val(16, 20);
    margin: 0 val(8, 10);
    background-color: #ffffff;
    border-radius: val(20, 24);
  }

  &__img {
    aspect-ratio: 1/1;
    height: val(132, 200);
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
    text-align: center;
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
