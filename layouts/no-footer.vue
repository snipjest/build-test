<template>
  <div class="layout-no-footer">
    <AppHeader />
    <slot />
  </div>
</template>

<style lang="scss">
.layout-no-footer {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
