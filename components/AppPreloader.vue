<script lang="ts" setup>
import { gsap } from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

gsap.registerPlugin(ScrambleTextPlugin)

onMounted(() => {
  gsap.to('.preloader__text', {
    duration: 1,
    scrambleText: {
      text: 'АРХИТЕКТОР',
      chars: '█▓▒░<>/\\|-_=+*',
      speed: 0.1,
      newClass: 'myClass'
    }
  })
  gsap.to('.preloader__svg', {
    opacity: 0.3,
    duration: 0.7,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  })
})
</script>

<template>
  <div class="preloader">
    <div class="preloader__wrap">
      <svg
        class="preloader__svg"
        width="80"
        height="24"
        viewBox="0 0 80 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.54791 16.1432V9.54991L1.61188 10.0131C0.848121 10.1332 0.133929 9.59664 0.0164267 8.8146C-0.100932 8.03257 0.423111 7.30129 1.18688 7.18097L5.63227 6.47994L20.4799 1.84282L21.2151 1.62104C24.8995 0.546121 28.713 2.22938e-05 32.5465 0C36.1439 0 39.7263 0.480955 43.2022 1.43004L56.7441 5.12757V3.58209C56.7441 2.79077 57.3706 2.14927 58.1434 2.14925C58.9162 2.14925 59.5428 2.79076 59.5428 3.58209V5.89156L64.381 7.21245L64.517 7.25723C65.1805 7.51421 65.5592 8.2495 65.3725 8.96642C65.3725 8.96642 64.4998 10.1277 63.7996 10.0124L63.6595 9.98158L42.4807 4.19846C39.2401 3.31364 35.9003 2.86567 32.5465 2.86567C28.9724 2.86569 25.4168 3.37466 21.9817 4.37687L21.2964 4.58396L7.34661 8.94123V16.1432C7.34661 17.3847 7.79846 18.582 8.61409 19.5007L8.79174 19.6903C9.70184 20.6129 10.9336 21.1343 12.2211 21.1343H57.3734C58.1462 21.1343 58.7727 21.7758 58.7727 22.5672C58.7727 23.3585 58.1462 24 57.3734 24H12.2211C10.127 24 8.12682 23.1237 6.68179 21.58L6.54308 21.4282C5.25922 19.982 4.54791 18.0975 4.54791 16.1432ZM69.2678 22.209V15.403H50.7264H32.1851C31.4122 15.403 30.7857 14.7615 30.7857 13.9701C30.7857 13.1788 31.4122 12.5373 32.1851 12.5373H78.3636C79.1364 12.5373 79.7629 13.1788 79.7629 13.9701C79.7629 14.7615 79.1364 15.403 78.3636 15.403H72.0665V22.209C72.0665 23.0003 71.44 23.6418 70.6672 23.6418C69.8943 23.6418 69.2678 23.0003 69.2678 22.209Z"
          fill="url(#paint0_linear_2750_2817)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_2750_2817"
            x1="0.046875"
            y1="-1.1893e-08"
            x2="80.0469"
            y2="24"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#EAA63F" />
            <stop offset="1" stop-color="#EA833F" />
          </linearGradient>
        </defs>
      </svg>
      <div class="preloader__text" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.preloader {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  background-color: $color-neutral-800;
  display: flex;
  align-items: center;
  justify-content: center;

  &__wrap {
    display: flex;
    align-items: center;
    gap: val(14, 18);

    svg {
      width: val(105, 120);
      height: auto;
    }
  }

  &__text {
    font-size: val(24, 32);
    text-transform: uppercase;
    font-weight: 500;
    letter-spacing: 1.2px;
  }
}
</style>
