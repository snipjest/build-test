<script lang="ts" setup>
import type { ID } from '@/types/ID'
import type { Media } from '@/types/Media'
import useHandleCallback from '@/composables/useHandleCallback'

const { handleCallback } = useHandleCallback()

defineProps<{
  card: {
    id: ID
    gallery: {
      id: ID
      image: Media
    }[]
    label: string
    parameters: {
      id: ID
      label: string
      value: string
    }[]
  }
}>()
</script>

<template>
  <div class="card-project">
    <ProjectCarousel :project-id="card.id" :gallery="card.gallery" />
    <h3 class="card-project__title typo-p1" v-html="card.label" />
    <div class="card-project__parameters">
      <div v-for="item in card.parameters" :key="item.id" class="card-project__parameters-item typo-p3">
        <span>{{ item.label }}</span>
        <span>{{ item.value }}</span>
      </div>
    </div>
    <button class="btn btn--secondary card-project" @click="handleCallback">Подробнее о проекте</button>
  </div>
</template>

<style lang="scss" scoped>
.card-project {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__title {
    margin-bottom: -8px;

    @media (min-width: $tablet) {
      margin-bottom: auto;
    }
  }

  &__parameters {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__parameters-item {
    display: flex;
    align-items: center;
    gap: 8px;

    span {
      &:first-child {
        color: $color-neutral-300;
      }
    }
  }
}
</style>
