import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { view } from '@/constants'

const waitForDOMReady = (callback: () => void, interval = 1300): void => {
  const checkDOMReady = (): void => {
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      callback()
      setTimeout((): void => {
        ScrollTrigger.refresh()
      }, 100)
    } else {
      setTimeout(checkDOMReady, interval)
    }
  }

  setTimeout(checkDOMReady, interval)
}

const animateHomeScreen = (): void => {
  const introTl = gsap.timeline()

  let optionCardGlass
  if (document.body.clientWidth >= view.tabletLg) {
    optionCardGlass = {
      autoAlpha: 0,
      x: 30,
      duration: 1,
      ease: 'power3'
    }
  } else {
    optionCardGlass = {
      autoAlpha: 0,
      y: 30,
      duration: 1,
      ease: 'power3'
    }
  }

  let headerDelay
  const scrollY = window.scrollY || document.documentElement.scrollTop
  if (scrollY > 0) {
    headerDelay = 0.5
  } else {
    headerDelay = 2.9
  }

  introTl
    .fromTo(
      '.gsap-home',
      {
        transformOrigin: 'center bottom',
        autoAlpha: 0,
        scale: 0.8
      },
      {
        autoAlpha: 1,
        scale: 1,
        duration: 1,
        delay: 1,
        ease: 'expo'
      }
    )
    .from(
      '.gsap-home-title h1',
      {
        yPercent: 100,
        duration: 1,
        ease: 'power3'
      },
      1.3
    )
    .from(
      '.gsap-home-description p',
      {
        yPercent: 100,
        duration: 1,
        ease: 'power3'
      },
      1.6
    )
    .from(
      '.gsap-home-btn',
      {
        autoAlpha: 0,
        duration: 1
      },
      2
    )
    .from('.gsap-home-card-glass-0', optionCardGlass, 2.5)
    .from('.gsap-home-card-glass-1', optionCardGlass, 2.7)
    .from(
      '.gsap-header',
      {
        autoAlpha: 0,
        yPercent: -100,
        duration: 1,
        ease: 'power3',
        onComplete: (): void => {
          const el = document.querySelector('.gsap-header')
          if (el) {
            el.removeAttribute('style') // удаляет все inline-стили
          }
        }
      },
      headerDelay
    )
}

const animateHomeScreenOnScroll = (): void => {
  const element = gsap.utils.toArray<HTMLElement>('.gsap-scale-block')
  if (!element) return

  let borderRadius
  let scale
  if (document.body.clientWidth >= view.tabletLg) {
    borderRadius = '60px'
    scale = 0.9
  } else {
    borderRadius = '0'
    scale = 1
  }

  element.forEach(item => {
    gsap.to(item, {
      scale: scale,
      borderRadius: borderRadius,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: item,
        start: 'top top',
        end: 'center top',
        scrub: true
      }
    })
  })
}

const animateSplitText = async () => {
  await document.fonts.ready

  const containers = gsap.utils.toArray<HTMLElement>('.gsap-container-split-text')

  containers.forEach(container => {
    const text = container.querySelector('.gsap-split-text')
    if (!text) return

    SplitText.create(text, {
      type: 'words,lines',
      mask: 'lines',
      linesClass: 'line',
      wordsClass: 'word',
      autoSplit: true,
      onSplit: instance => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top 50%',
            end: 'top 50%'
          }
        })

        tl.from(
          instance.lines, // Анимируем строки (lines)
          {
            yPercent: 120,
            stagger: 0.2,
            ease: 'power3.out'
          },
          0
        )

        tl.from(
          instance.words, // Анимируем слова (words) с небольшой задержкой
          {
            opacity: 0,
            y: 20,
            stagger: 0.05,
            ease: 'power1.out'
          },
          0.2
        )

        return tl
      }
    })
  })
}

const animateDrawRandomUnderline = (): void => {
  const svgVariants = [
    `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 20.9999C26.7762 16.2245 49.5532 11.5572 71.7979 14.6666C84.9553 16.5057 97.0392 21.8432 109.987 24.3888C116.413 25.6523 123.012 25.5143 129.042 22.6388C135.981 19.3303 142.586 15.1422 150.092 13.3333C156.799 11.7168 161.702 14.6225 167.887 16.8333C181.562 21.7212 194.975 22.6234 209.252 21.3888C224.678 20.0548 239.912 17.991 255.42 18.3055C272.027 18.6422 288.409 18.867 305 17.9999" stroke="currentColor" stroke-width="10" stroke-linecap="round"/></svg>`,
    `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 24.2592C26.233 20.2879 47.7083 16.9968 69.135 13.8421C98.0469 9.5853 128.407 4.02322 158.059 5.14674C172.583 5.69708 187.686 8.66104 201.598 11.9696C207.232 13.3093 215.437 14.9471 220.137 18.3619C224.401 21.4596 220.737 25.6575 217.184 27.6168C208.309 32.5097 197.199 34.281 186.698 34.8486C183.159 35.0399 147.197 36.2657 155.105 26.5837C158.11 22.9053 162.993 20.6229 167.764 18.7924C178.386 14.7164 190.115 12.1115 201.624 10.3984C218.367 7.90626 235.528 7.06127 252.521 7.49276C258.455 7.64343 264.389 7.92791 270.295 8.41825C280.321 9.25056 296 10.8932 305 13.0242" stroke="#E55050" stroke-width="10" stroke-linecap="round"/></svg>`,
    `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 29.5014C9.61174 24.4515 12.9521 17.9873 20.9532 17.5292C23.7742 17.3676 27.0987 17.7897 29.6575 19.0014C33.2644 20.7093 35.6481 24.0004 39.4178 25.5014C48.3911 29.0744 55.7503 25.7731 63.3048 21.0292C67.9902 18.0869 73.7668 16.1366 79.3721 17.8903C85.1682 19.7036 88.2173 26.2464 94.4121 27.2514C102.584 28.5771 107.023 25.5064 113.276 20.6125C119.927 15.4067 128.83 12.3333 137.249 15.0014C141.418 16.3225 143.116 18.7528 146.581 21.0014C149.621 22.9736 152.78 23.6197 156.284 24.2514C165.142 25.8479 172.315 17.5185 179.144 13.5014C184.459 10.3746 191.785 8.74853 195.868 14.5292C199.252 19.3205 205.597 22.9057 211.621 22.5014C215.553 22.2374 220.183 17.8356 222.979 15.5569C225.4 13.5845 227.457 11.1105 230.742 10.5292C232.718 10.1794 234.784 12.9691 236.164 14.0014C238.543 15.7801 240.717 18.4775 243.356 19.8903C249.488 23.1729 255.706 21.2551 261.079 18.0014C266.571 14.6754 270.439 11.5202 277.146 13.6125C280.725 14.7289 283.221 17.209 286.393 19.0014C292.321 22.3517 298.255 22.5014 305 22.5014" stroke="#E55050" stroke-width="10" stroke-linecap="round"/></svg>`,
    `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.0039 32.6826C32.2307 32.8412 47.4552 32.8277 62.676 32.8118C67.3044 32.807 96.546 33.0555 104.728 32.0775C113.615 31.0152 104.516 28.3028 102.022 27.2826C89.9573 22.3465 77.3751 19.0254 65.0451 15.0552C57.8987 12.7542 37.2813 8.49399 44.2314 6.10216C50.9667 3.78422 64.2873 5.81914 70.4249 5.96641C105.866 6.81677 141.306 7.58809 176.75 8.59886C217.874 9.77162 258.906 11.0553 300 14.4892" stroke="#E55050" stroke-width="10" stroke-linecap="round"/></svg>`,
    `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.99805 20.9998C65.6267 17.4649 126.268 13.845 187.208 12.8887C226.483 12.2723 265.751 13.2796 304.998 13.9998" stroke="currentColor" stroke-width="10" stroke-linecap="round"/></svg>`,
    `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 29.8857C52.3147 26.9322 99.4329 21.6611 146.503 17.1765C151.753 16.6763 157.115 15.9505 162.415 15.6551C163.28 15.6069 165.074 15.4123 164.383 16.4275C161.704 20.3627 157.134 23.7551 153.95 27.4983C153.209 28.3702 148.194 33.4751 150.669 34.6605C153.638 36.0819 163.621 32.6063 165.039 32.2029C178.55 28.3608 191.49 23.5968 204.869 19.5404C231.903 11.3436 259.347 5.83254 288.793 5.12258C294.094 4.99476 299.722 4.82265 305 5.45025" stroke="#E55050" stroke-width="10" stroke-linecap="round"/></svg>`
  ]

  // Add attributes to <svg> elements
  function decorateSVG(svgEl: any): void {
    svgEl.setAttribute('class', 'gsap-draw-line-box-svg')
    svgEl.setAttribute('preserveAspectRatio', 'none')
    svgEl.querySelectorAll('path').forEach((path: any): void => {
      path.setAttribute('stroke', 'currentColor')
    })
  }

  const containers = gsap.utils.toArray<HTMLElement>('.gsap-draw-line')
  let nextIndex: any = null
  containers.forEach(container => {
    const box = container.querySelector('.gsap-draw-line-box')
    if (!box) return
    let enterTween: any = null
    let leaveTween: any = null
    container.addEventListener('mouseenter', (): void => {
      // Don't restart if still playing
      if (enterTween && enterTween.isActive()) return
      if (leaveTween && leaveTween.isActive()) leaveTween.kill()
      // Random Start
      if (nextIndex === null) {
        nextIndex = Math.floor(Math.random() * svgVariants.length)
      }
      // Animate Draw
      box.innerHTML = svgVariants[nextIndex]
      const svg = box.querySelector('svg')
      if (svg) {
        decorateSVG(svg)
        const path = svg.querySelector('path')
        if (path) {
          gsap.set(path, { drawSVG: '0%' })
          enterTween = gsap.to(path, {
            duration: 0.5,
            drawSVG: '100%',
            ease: 'power2.inOut',
            onComplete: (): void => {
              enterTween = null
            }
          })
        }
      }
      // Advance for next hover across all items
      nextIndex = (nextIndex + 1) % svgVariants.length
    })
    container.addEventListener('mouseleave', (): void => {
      const path = box.querySelector('path')
      if (!path) return
      const playOut = (): void => {
        // Don't restart if still drawing out
        if (leaveTween && leaveTween.isActive()) return
        leaveTween = gsap.to(path, {
          duration: 0.5,
          drawSVG: '100% 100%',
          ease: 'power2.inOut',
          onComplete: (): void => {
            leaveTween = null
            box.innerHTML = '' // remove SVG when done
          }
        })
      }
      if (enterTween && enterTween.isActive()) {
        // Wait until draw-in finishes
        enterTween.eventCallback('onComplete', playOut)
      } else {
        playOut()
      }
    })
  })
}

const animate3DPerspective = (): void => {
  if (document.body.clientWidth >= view.tabletLg) {
    const perspective = gsap.utils.toArray<HTMLElement>('.gsap-perspective')
    const perspectiveItem = gsap.utils.toArray<HTMLElement>('.gsap-perspective-item')

    perspective.forEach(item => {
      gsap.set(item, { perspective: 650 })

      perspectiveItem.forEach(persItem => {
        const persItemInner = persItem.querySelector('.gsap-perspective-item-inner')
        const outerRX = gsap.quickTo(persItem, 'rotationX', { ease: 'power3' })
        const outerRY = gsap.quickTo(persItem, 'rotationY', { ease: 'power3' })
        const innerX = gsap.quickTo(persItemInner, 'x', { ease: 'power3' })
        const innerY = gsap.quickTo(persItemInner, 'y', { ease: 'power3' })

        item.addEventListener('pointermove', e => {
          outerRX(gsap.utils.interpolate(25, -25, e.y / window.innerHeight))
          outerRY(gsap.utils.interpolate(-25, 25, e.x / window.innerWidth))
          innerX(gsap.utils.interpolate(-25, 25, e.x / window.innerWidth))
          innerY(gsap.utils.interpolate(-25, 25, e.y / window.innerHeight))
        })

        item.addEventListener('pointerleave', e => {
          outerRX(0)
          outerRY(0)
          innerX(0)
          innerY(0)
        })
      })
    })
  }
}

const animateStackingCards = () => {
  const cards = gsap.utils.toArray('.gsap-stacking-card')

  // 20% от высоты экрана
  const stackHeight = window.innerHeight * 0.2

  let position
  if (document.body.clientWidth >= view.tabletLg) {
    position = 'top 30%'
  } else {
    position = 'top 20%'
  }

  cards.forEach((card: any, i) => {
    gsap.fromTo(
      card.querySelector('.gsap-stacking-card-inner'),
      //начальное состояние
      {
        scale: 1,
        transformOrigin: 'center top',
        filter: 'blur(0px)'
      },
      // конечное состояние при скролле
      {
        y: gsap.utils.mapRange(1, cards.length, -20, -stackHeight + 20, cards.length - i), // сдвиг вверх
        scale: gsap.utils.mapRange(1, cards.length, 0.4, 0.9, i), // уменьшение
        filter: 'blur(' + gsap.utils.mapRange(1, cards.length, 4, 25, cards.length - i) + 'px)', // размытие
        scrollTrigger: {
          trigger: card,
          // markers: true,
          scrub: true,
          start: 'top ' + stackHeight,
          end: '+=' + window.innerHeight * 3,
          invalidateOnRefresh: true,
          id: `card-${i}`
        }
      }
    )

    ScrollTrigger.create({
      trigger: card,
      pin: true,
      start: position,
      endTrigger: '.gsap-stacking-card-end',
      end: 'bottom 80%',
      pinSpacing: false
    })
  })
}

const animateParallax = (): void => {
  const blocks = gsap.utils.toArray('.gsap-parallax-bg') as any

  const parallaxShift = 100

  blocks.forEach((bg: any, i: number): void => {
    const section = bg.parentElement

    ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      onRefresh: self => {
        // Создаем timeline для движения bg по Y
        bg._tl = gsap
          .timeline({ paused: true, defaults: { ease: 'none' } })
          .fromTo(bg, { y: 0 }, { y: -parallaxShift }, 0)
          .progress(self.progress)
      },
      onUpdate: self => {
        gsap.to(bg._tl, { duration: 0.75, progress: self.progress })
      }
    })
  })
}

const animateFadeInBottom = (): void => {
  const containers = gsap.utils.toArray<HTMLElement>('.gsap-fade-container')
  if (!containers) return

  containers.forEach(container => {
    const items: any = container.querySelectorAll('.gsap-fade-item')

    gsap.set(items, { opacity: 0, y: 40 })

    ScrollTrigger.create({
      trigger: container,
      start: 'top 60%',
      once: true,
      onEnter: (): void => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          stagger: 0.2, // задержка между элементами
          duration: 0.6,
          ease: 'power2.out',
          onComplete: (): void => {
            items.forEach((el: HTMLElement): void => el.removeAttribute('style'))
          }
        })
      }
    })
  })
}

export default function useAnimate() {
  return {
    animateSplitText,
    animateDrawRandomUnderline,
    animate3DPerspective,
    animateStackingCards,
    animateHomeScreen,
    animateHomeScreenOnScroll,
    animateParallax,
    animateFadeInBottom,
    waitForDOMReady
  }
}
