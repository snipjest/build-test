<script lang="ts" setup>
import type { ID } from '@/types/ID'
import type { Media } from '@/types/Media'

defineProps<{
  card: {
    id: ID
    image: Media
    description: string
  }
}>()
</script>

<template>
  <div class="service">
    <img :src="card.image.url" :alt="card.image.alt" class="service__icon" />
    <p class="service__description typo-p1">{{ card.description }}</p>
  </div>
</template>

<style lang="scss" scoped>
.service {
  display: flex;
  flex-direction: column;
  aspect-ratio: 1/1;
  gap: 8px;
  background-color: $color-neutral-700;
  border-radius: 20px;
  padding: 20px;

  @media (min-width: $tablet) {
    padding: 24px;
  }

  &__icon {
    width: 120px;
    height: 120px;
  }

  &__description {
    margin-top: auto;
  }
}
</style>
