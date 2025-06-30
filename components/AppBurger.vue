<script lang="ts" setup>
defineProps<{
  openMenu: boolean
  isScroll: boolean
  customHeaderClass: boolean
}>()
</script>

<template>
  <button
    class="burger"
    :class="{ active: openMenu, 'burger--black': customHeaderClass && !isScroll && !openMenu }"
    type="button"
  >
    <div class="burger__inner">
      <span />
      <span />
      <span />
    </div>
  </button>
</template>

<style lang="scss" scoped>
$cubic: cubic-bezier(0.4, 0.01, 0.165, 0.99);

.burger {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  z-index: 1001;

  @media (hover: hover) {
    &:not(.active):hover {
      span:first-child {
        top: 3px;
      }

      span:last-child {
        bottom: 3px;
      }
    }
  }

  &__inner {
    flex-shrink: 0;
    width: 24px;
    height: 20px;
    position: relative;
    transition: all 0.3s $cubic 0s;

    span {
      top: calc(50% - 1px);
      left: 0;
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: #ffffff;
      border-radius: 5px;
      transition: all 0.3s $cubic 0s;

      &:first-child {
        top: 0;
      }

      &:last-child {
        top: auto;
        bottom: 0;
      }

      .burger--black & {
        background-color: $color-neutral-800;
      }
    }
  }

  &.active {
    span {
      transform: scale(0);

      &:first-child {
        transform: rotate(-45deg);
        top: calc(50% - 1px);
      }

      &:last-child {
        transform: rotate(45deg);
        bottom: calc(50% - 1px);
      }
    }

    @media (hover: hover) {
      &:hover {
        .burger__inner {
          transform: rotate(90deg);
        }
      }
    }
  }
}
</style>
