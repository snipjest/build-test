<script lang="ts" setup>
import Swiper from 'swiper'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import type { ID } from '@/types/ID'
import type { Media } from '@/types/Media'

const swiperMain = ref<Swiper | undefined>(undefined)
const swiperRef = ref<HTMLElement | null>(null)
const swiperPaginationRef = ref<HTMLElement | null>(null)
const swiperButtonPrevRef = ref<HTMLElement | null>(null)
const swiperButtonNextRef = ref<HTMLElement | null>(null)
const isManySlides = ref<boolean>(false)

const props = defineProps<{
  projectId: ID
  gallery: {
    id: ID
    image: Media
  }[]
}>()

if (props.gallery.length > 15) {
  isManySlides.value = true
}

const fancyboxMedia = computed((): any[] => {
  const content: any[] = []

  props.gallery.forEach((element: any): void => {
    content.push(element)
  })

  return content
})

function initCarousel(): void {
  if (swiperRef.value && swiperPaginationRef.value && swiperButtonPrevRef.value && swiperButtonNextRef.value) {
    swiperMain.value = new Swiper(swiperRef.value, {
      modules: [Pagination, Navigation],
      speed: 600,
      spaceBetween: 16,
      slidesPerView: 1,
      pagination: {
        el: swiperPaginationRef.value,
        dynamicBullets: isManySlides.value,
        dynamicMainBullets: 1,
        bulletClass: 'project-carousel__pagination-bullet swiper-pagination-bullet'
      },
      navigation: {
        prevEl: swiperButtonPrevRef.value,
        nextEl: swiperButtonNextRef.value
      }
    })
  }
}

onMounted((): void => {
  initCarousel()
})
</script>

<template>
  <div class="project-carousel">
    <div ref="swiperRef" class="swiper">
      <div class="swiper-wrapper">
        <div v-for="(item, index) in gallery" :key="item.id" class="project-carousel__slide swiper-slide">
          <div class="project-carousel__image-container">
            <a
              :href="fancyboxMedia[index].image.url"
              :data-fancybox="`gallery-${projectId}`"
              :data-caption="fancyboxMedia[index].image.alt"
            >
              <img class="project-carousel__image" :src="item.image.url" :alt="item.image.alt" />
            </a>
          </div>
        </div>
      </div>
      <div
        ref="swiperPaginationRef"
        class="project-carousel__pagination swiper-pagination"
        :class="{ 'project-carousel__pagination--padding': !isManySlides }"
      />
      <div
        ref="swiperButtonPrevRef"
        class="project-carousel__swiper-button project-carousel__swiper-button--prev swiper-button-prev"
      >
        <img src="/images/arrow-slider.svg" alt="" />
      </div>
      <div
        ref="swiperButtonNextRef"
        class="project-carousel__swiper-button project-carousel__swiper-button--next swiper-button-next"
      >
        <img src="/images/arrow-slider.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.project-carousel {
  @media (hover: hover) {
    &:hover {
      .project-carousel__swiper-button:not(.swiper-button-disabled) {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  &__slide {
    border-radius: 20px;
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
  }

  &__pagination.swiper-pagination {
    display: inline-flex;
    left: 50%;
    bottom: 12px;
    transform: translateX(-50%);
    width: auto;
    max-width: 100%;
    padding: 8px 0;
    background-color: $color-neutral-700;
    border-radius: 8px;
  }

  &__pagination-bullet.swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    margin: 0 6px;
    opacity: 1;
    background-color: $color-neutral-500;
    flex-shrink: 0;

    &.swiper-pagination-bullet-active {
      background-color: #ffffff;
    }
  }

  &__pagination--padding.swiper-pagination {
    padding: 8px 4px;
  }

  &__swiper-button {
    display: none;

    @media (min-width: $tablet-lg) {
      opacity: 0;
      visibility: hidden;
      cursor: pointer;
      position: absolute;
      top: 50%;
      width: 48px;
      height: 48px;
      border-radius: 100px;
      background-color: #ffffff;
      z-index: 20;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease 0s;

      &.swiper-button-disabled {
        opacity: 0;

        button {
          cursor: default;
        }
      }

      & > img {
        width: 32px;
        height: 32px;
      }
    }
  }

  @media (min-width: $tablet-lg) {
    &__swiper-button--prev {
      left: 20px;

      img {
        transform: rotate(180deg);
      }
    }

    &__swiper-button--next {
      right: 20px;
    }
  }
}
</style>
