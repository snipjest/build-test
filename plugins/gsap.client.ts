import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

export default defineNuxtPlugin((): void => {
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin)
})
