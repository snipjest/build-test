import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

export default defineNuxtPlugin((): void => {
  gsap.registerPlugin(ScrollTrigger, SplitText)
})
