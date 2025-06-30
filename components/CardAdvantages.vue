<script lang="ts" setup>
defineProps<{
  card: {
    label: string
    description: string
  }
}>()
</script>

<template>
  <div class="card-advantages">
    <div class="card-advantages__dot" />
    <div class="card-advantages__info">
      <p class="card-advantages__label typo-p2-semibold" v-html="card.label" />
      <p class="card-advantages__description typo-p3" v-html="card.description" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-advantages {
  position: relative;
  background-color: $color-neutral-700;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 80px;

  @media (min-width: $tablet) {
    padding: 24px;
  }

  &__dot {
    width: 12px;
    height: 12px;
    border-radius: 100px;
    background-color: $color-brand-100;
  }

  &__description {
    color: $color-neutral-200;
    margin-top: 10px;
  }
}
</style>
