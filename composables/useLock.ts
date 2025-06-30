export default function useLock() {
	let scrollOffset: number = 0
	function scrollLock(): void {
		const documentElement: HTMLElement = document.documentElement as HTMLElement

		scrollOffset = window.scrollY
		const lockPaddingOffset: number = window.innerWidth - documentElement.offsetWidth
		documentElement.style.cssText = `
		overflow: hidden;
		touch-action: none;
		padding-right: ${lockPaddingOffset}px;

    `
		const matches: NodeListOf<HTMLInputElement> = document.querySelectorAll('.lock-padding')

		if (matches.length > 0) {
			matches.forEach(elem => {
				elem.style.paddingRight = `${lockPaddingOffset}px`
			})
		}

		documentElement.style.scrollBehavior = 'unset'
	}

	function scrollUnLock(): void {
		const documentElement: HTMLElement = document.documentElement as HTMLElement

		documentElement.style.cssText = ''
		window.scroll({ top: scrollOffset })
		document.documentElement.style.scrollBehavior = ''

		const matches: NodeListOf<HTMLInputElement> = document.querySelectorAll('.lock-padding')
		if (matches.length > 0) {
			matches.forEach(elem => {
				elem.style.paddingRight = ''
			})
		}
	}

	return {
		scrollLock,
		scrollUnLock
	}
}
