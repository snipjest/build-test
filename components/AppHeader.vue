<script lang="ts" setup>
import useLock from '@/composables/useLock'
import { useStoreLayout } from '@/stores/useStoreLayout'
import { view } from '@/constants'

const { handleCallback } = useHandleCallback()

const props = defineProps<{
  customClass?: string
}>()

const { logo, header } = {
  "logo": {
    "black": {
      "url": "/images/logo-black.svg",
      "alt": "текст описания"
    },
    "white": {
      "url": "/images/logo-white.svg",
      "alt": "текст описания"
    }
  },
  "header": {
    "socials": [
      {
        "id": 1,
        "image": {
          "url": "/images/telegram.svg",
          "alt": "текст описания"
        },
        "to": "https://telegram.org/"
      },
      {
        "id": 2,
        "image": {
          "url": "/images/whatsapp.svg",
          "alt": "текст описания"
        },
        "to": "https://www.whatsapp.com"
      }
    ],
    "phone": {
      "label": "+7 (912) 301 71 31",
      "to": "+79123017131"
    }
  }
}


const { scrollLock, scrollUnLock } = useLock()
const isOpenMenu = ref<boolean>(false)
const isScroll = ref<boolean>(false)
const customHeaderClass = props.customClass !== undefined

const toggleMenu = () => {
  if (isOpenMenu.value) {
    isOpenMenu.value = false
  } else {
    isOpenMenu.value = true
  }
}

const handleMenuBody = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.header__body') && isOpenMenu.value) {
    toggleMenu()
  }
}

const goToHome = () => {
  isOpenMenu.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
  navigateTo('/')
}

watch(isOpenMenu, newValue => {
  if (newValue) {
    scrollLock()
  } else {
    scrollUnLock()
  }
})

const handleScroll = () => {
  const scrollY = window.scrollY || document.documentElement.scrollTop
  isScroll.value = scrollY > 0
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', () => {
    if (document.body.clientWidth >= view.tabletLg) {
      isOpenMenu.value = false
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', () => {
    if (document.body.clientWidth >= view.tabletLg) {
      isOpenMenu.value = false
    }
  })
})
</script>

<template>
  <header class="header gsap-header" :class="[customClass, { scroll: isScroll || isOpenMenu }]">
    <div class="container">
      <div class="header__logo" @click="goToHome">
        <img v-if="!customClass || isScroll || isOpenMenu" :src="logo.white.url" alt="Логотип архитектор" />
        <img v-else :src="logo.black.url" alt="Логотип архитектор" />
      </div>
      <div class="header__container" :class="{ active: isOpenMenu }" @click="handleMenuBody">
        <div class="header__body">
          <div class="header__soc">
            <p class="header__soc-text typo-p3">Пишите, мы онлайн</p>
            <div class="header__soc-group">
              <a
                v-for="(item, index) in header.socials"
                :key="index"
                :href="item.to"
                class="header__soc-link"
                target="_blank"
              >
                <img :src="item.image.url" :alt="item.image.alt" />
              </a>
            </div>
          </div>
          <div class="header__contact">
            <a :href="`tel:${header.phone.to}`" class="header__contact-phone typo-p3 gsap-draw-line">
              <span>{{ header.phone.label }}</span>
              <div class="gsap-draw-line-box" />
            </a>
            <button class="btn btn--thertiary" @click="handleCallback">Перезвоните мне</button>
          </div>
        </div>
      </div>
      <div class="header__burger">
        <AppBurger
          :open-menu="isOpenMenu"
          :is-scroll="isScroll"
          :custom-header-class="customHeaderClass"
          @click="toggleMenu"
        />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 72px;
  background-color: transparent;
  color: #ffffff;
  z-index: 6;

  @media (min-width: $tablet-lg) {
    height: 80px;
  }

  &.header--transparent:not(.scroll) {
    color: $color-neutral-800;
  }

  .container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;

    @media (min-width: $tablet-lg) {
      display: block;
    }

    &::before {
      opacity: 0;
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      background-color: $color-neutral-800;
      z-index: 5;
      transition: all 0.2s ease 0.35s;
    }
  }

  &.scroll {
    .container::before {
      opacity: 1;
      transition: all 0.3s ease 0s;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 48px;

    @media (max-width: #{$tablet-lg - 0.1px}) {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      max-height: 100%;
      transform: translateY(-100%);
      visibility: hidden;
      padding: 112px 16px 24px;
      background-color: $color-neutral-800;
      color: #ffffff;
      z-index: 2;
      overflow: hidden auto;
      transition: all 0.6s ease 0s;
    }

    @media (min-width: $tablet) {
      padding: 112px 48px 24px;
    }

    @media (min-width: $tablet-lg) {
      padding: 0;
      position: relative;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      z-index: 5;
      height: 100%;
    }
  }

  &__container {
    height: 100%;

    @media (max-width: #{$tablet-lg - 0.1px}) {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      visibility: hidden;
      transition: all 0.2s ease 0s;
    }

    &.active {
      background: rgb(0 0 0 / 60%);
      backdrop-filter: blur(8px);
      visibility: visible;

      .header__body {
        transform: translateY(0);
        visibility: visible;
        transition: all 0.6s ease 0.15s;
      }
    }
  }

  &__logo {
    cursor: pointer;
    flex-shrink: 0;
    width: val(220, 240);
    z-index: 6;
    transition: all 0.2s ease 0s;

    @media (min-width: $tablet-lg) {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    @media (hover: hover) {
      &:hover {
        opacity: 0.7;
      }
    }
  }

  &__burger {
    z-index: 6;
    display: flex;
    align-items: center;

    @media (min-width: $tablet-lg) {
      display: none;
    }
  }

  &__soc {
    display: flex;
    flex-direction: column;
    gap: 16px;

    @media (min-width: $tablet-lg) {
      flex-direction: row-reverse;
      align-items: center;
    }
  }

  &__soc-text {
    transition: all 0.2s ease 0s;
    position: relative;
    padding-left: 16px;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 8px;
      height: 8px;
      border-radius: 10px;
      background-color: $color-green;
      animation: blink 1.5s infinite;
    }
  }

  &__soc-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__soc-link {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    transition: all 0.2s ease 0s;

    @media (hover: hover) {
      &:hover {
        background-color: $color-neutral-100;
      }
    }

    @media (min-width: $tablet-lg) {
      width: 40px;
      height: 40px;
    }
  }

  &__contact {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;

    @media (min-width: $tablet-lg) {
      flex-direction: row;
      align-items: center;
    }
  }
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}
</style>
