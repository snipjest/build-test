<script lang="ts" setup>
import type { ID } from '@/types/ID'
import type { Media } from '@/types/Media'

defineProps<{
  type: {
    id: ID
    image: Media
    text: string
  }
}>()
</script>

<template>
  <div class="type-work gsap-stacking-card">
    <div class="type-work__inner gsap-stacking-card-inner" :style="{ backgroundImage: `url(${type.image.url})` }">
      <div class="type-work__text typo-p1-semibold" v-html="type.text" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.type-work {
  &__inner {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    will-change: transform, filter;
    padding: 12px;
    height: 480px;
    display: flex;
    border-radius: 20px;

    @media (min-width: $tablet-lg) {
      height: 428px;
    }
  }

  &__text {
    margin-top: auto;
    background: rgb(78 78 78 / 60%);
    backdrop-filter: blur(16px);
    border-radius: 20px;
    color: #ffffff;
    padding: 16px 20px;
    width: 100%;

    @media (min-width: $tablet-lg) {
      padding: 20px 24px;
    }
  }
}
</style>
