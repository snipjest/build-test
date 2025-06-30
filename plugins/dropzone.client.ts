import Dropzone from 'dropzone'

export default defineNuxtPlugin(() => {
	return {
		provide: {
			Dropzone
		}
	}
})
