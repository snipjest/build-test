<script lang="ts" setup>
defineProps<{
  card: {
    label: string
    description: string
  }
}>()
</script>

<template>
  <div class="card-glass">
    <div class="gsap-perspective-item-inner">
      <h3 class="card-glass__label">{{ card.label }}</h3>
      <p class="card-glass__description typo-p2">{{ card.description }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-glass {
  position: relative;
  background: linear-gradient(180deg, rgb(122 122 122 / 60%) 0%, rgb(50 50 50 / 60%) 100%);
  box-shadow: inset 0 2px 4px rgb(255 255 255 / 16%);
  backdrop-filter: blur(16px);
  border-radius: 20px;
  color: #ffffff;
  padding: 24px;

  &__label {
    font-weight: 600;
    font-size: val(32, 40);
    line-height: 130%;
    text-shadow: 0 2px 10px rgb(0 0 0 / 25%);
  }

  &__description {
    margin-top: 40px;
    text-shadow: 0 2px 10px rgb(0 0 0 / 25%);

    @media (min-width: $tablet) {
      margin-top: 80px;
    }
  }
}
</style>
