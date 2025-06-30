<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { view } from '@/constants'

const { animateDrawRandomUnderline } = useAnimate()

interface Props {
  title?: string
  description?: string
  modalProps?: Record<string, unknown>
  componentProps?: Record<string, unknown>
}

defineProps<Props>()

const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'onClosed'): void
}>()

function handleBeforeOpen(): void {
  const bodyElement: HTMLElement = document.querySelector('body') as HTMLBodyElement
  const lockPaddingOffset: number = window.innerWidth - bodyElement.offsetWidth

  const matches: NodeListOf<HTMLInputElement> = document.querySelectorAll('.lock-padding')

  if (matches.length > 0) {
    matches.forEach(elem => {
      elem.style.paddingRight = `${lockPaddingOffset}px`
    })
  }
}

function handleClosed(): void {
  const matches: NodeListOf<HTMLInputElement> = document.querySelectorAll('.lock-padding')
  if (matches.length > 0) {
    matches.forEach(elem => {
      elem.style.paddingRight = ''
    })
  }
}

const contentTransition = ref<string>('vfm-slide-down')

function handleModal(event: Event): void {
  event.stopPropagation()
}

function setupModalTransition() {
  if (window.innerWidth < view.tablet) {
    contentTransition.value = 'vfm-slide-down'
  } else {
    contentTransition.value = 'vfm-fade'
  }
}

onMounted(() => {
  setTimeout(() => {
    animateDrawRandomUnderline()
  }, 100)
})

onBeforeMount(() => {
  setupModalTransition()
})
</script>

<template>
  <VueFinalModal
    class="ui-modal final-modal"
    content-class="ui-modal__content custom-scrollbar"
    :overlay-transition="'vfm-fade'"
    :content-transition="contentTransition"
    @before-open="handleBeforeOpen"
    @closed="handleClosed"
    @update:model-value="val => emits('update:modelValue', val)"
    @click="handleModal"
  >
    <button
      class="ui-modal__close"
      type="button"
      aria-label="Закрыть модальное окно"
      @click="emits('update:modelValue', false)"
    >
      <CustomCloseIcon />
    </button>

    <div class="ui-modal__header">
      <h3 v-if="title" class="ui-modal__title typo-h4" v-html="title" />
      <p v-if="description" class="ui-modal__description typo-p4">
        {{ description }}
      </p>
    </div>

    <template v-if="$slots.error">
      <div class="ui-modal__error typo-h5">
        Ошибка:
        <slot name="error" />
      </div>
    </template>

    <template v-if="$slots.default">
      <slot :data="componentProps" />
    </template>

    <template v-if="$slots.footer">
      <div class="ui-modal__footer">
        <slot name="footer" />
      </div>
    </template>
  </VueFinalModal>
</template>

<style lang="scss">
.ui-modal {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  color: #ffffff;

  @media screen and (min-width: $tablet) {
    align-items: center;
    padding: 16px;
  }

  &.always-center {
    align-items: center;
    padding: 16px;
  }

  &__content {
    position: relative;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 100%;
    max-width: 100%;
    padding: 32px 16px;
    overflow: hidden auto;
    background-color: $color-neutral-700;

    @media screen and (min-width: $tablet) {
      border-radius: 20px;
      max-width: 600px;
      padding: 32px;
    }
  }

  &.large &__content {
    @media screen and (min-width: $tablet) {
      max-width: 800px;
      max-height: 100%;
      height: 768px;
    }
  }

  &.medium &__content {
    @media screen and (min-width: $tablet) {
      max-width: 800px;
    }
  }

  &.always-center &__content {
    border-radius: 6px;
  }

  &__close {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 20;
    width: 20px;
    height: 20px;
    background: transparent;

    @media (min-width: $tablet) {
      top: 20px;
      right: 20px;
    }
  }

  &__close-btn {
    width: 100%;

    @media (min-width: $tablet) {
      width: auto;
    }
  }

  &__header:not(:last-child) {
    margin: 0 0 32px;
  }

  &__title:not(:last-child) {
    margin: 0 0 12px;
  }

  &__description {
    color: $color-neutral-200;
  }

  &__error {
    display: flex;
  }

  .vfm--overlay {
    background: rgb(0 0 0 / 60%);
    backdrop-filter: blur(8px);
  }
}
</style>
