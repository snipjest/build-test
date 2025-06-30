<script lang="ts" setup>
defineProps<{
  text: string | null
}>()
</script>

<template>
  <transition name="fade-scale" mode="out-in" appear>
    <p class="error-message typo-p1">
      {{ text }}
    </p>
  </transition>
</template>

<style lang="scss" scoped>
.error-message {
  background: #ffffff;
  color: $color-red;
  border-radius: 8px;
  padding: 8px 16px;
}
</style>
