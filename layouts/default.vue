<template>
  <div class="layout-default">
    <AppHeader :custom-class="'header--transparent'" />
    <slot />
    <AppFooter />
  </div>
</template>

<style lang="scss">
.layout-default {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
