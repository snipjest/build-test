<script lang="ts" setup></script>

<template>
  <p class="input-msg error">
    <slot />
  </p>
</template>

<style lang="scss" scoped>
.input-msg {
  display: flex;
  align-items: center;
  gap: 4px;
  text-align: left;
  margin-top: 6px;
  font-weight: 400;
  font-size: 14px;
  line-height: 120%;
  letter-spacing: normal;
  color: #cccccc;
  text-transform: none;

  &.error {
    color: $color-red;
  }
}
</style>
