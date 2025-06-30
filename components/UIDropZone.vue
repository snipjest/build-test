<script setup lang="ts">
import { useId } from 'vue'

const { $Dropzone } = useNuxtApp() as unknown as { $Dropzone: any }

const defaultOptions = {
  uploadUrl: ' ',
  uploadKey: ' ',
  label: 'Прикрепить файл',
  explanation: null,
  showFileName: true,
  createImageThumbnails: false,
  maxFilesAmount: 1,
  maxFileSize: 5, // 5 МБ
  uploadMultiple: false,
  acceptedFiles: ['.jpg', '.jpeg', '.png', '.gif']
}

interface Props {
  modelValue?: any[]
  options?: {
    uploadKey?: any
    uploadUrl?: string
    label?: string
    explanation?: string | null
    showFileName?: boolean
    createImageThumbnails?: boolean
    maxFilesAmount?: number
    maxFileSize?: number
    uploadMultiple?: boolean
    acceptedFiles?: string[]
  }
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  options: () => ({})
})

const mergedOptions = reactive({
  ...defaultOptions,
  ...props.options
})

const emits = defineEmits<{
  (e: 'update:modelValue', value: any[]): void
}>()

const dropzoneRef = ref<HTMLElement | null>(null)
const dropzoneInstance = ref<any>(undefined)

const baseId = useId()
const uniqueId = computed(() => `dropzone-${baseId}`)
const previewsId = computed(() => `dropzone-previews-${baseId}`)

const model = computed({
  get: () => props.modelValue,
  set: (newValue: any[]) => emits('update:modelValue', newValue || [])
})

const isFilePickerDisabled = computed<boolean>(() => model.value.length >= mergedOptions.maxFilesAmount)

function handleFilePicker(): void {
  dropzoneInstance.value.hiddenFileInput.click()
}

function initDropzone(): void {
  if (dropzoneRef.value) {
    const config = useRuntimeConfig()
    const baseUrl = config.public.baseUrl

    dropzoneInstance.value = new $Dropzone(`#${uniqueId.value}`, {
      method: 'POST',
      addRemoveLinks: true,
      url: `${baseUrl}${mergedOptions.uploadUrl}`,
      maxFiles: mergedOptions.maxFilesAmount,
      maxFilesize: mergedOptions.maxFileSize,
      headers: {
        'Upload-Key': mergedOptions.uploadKey
      },
      uploadMultiple: mergedOptions.uploadMultiple,
      acceptedFiles: mergedOptions.acceptedFiles.join(','),
      createImageThumbnails: mergedOptions.createImageThumbnails,
      previewsContainer: `#${previewsId.value}`,
      dictCancelUpload: 'Отмена',
      dictMaxFilesExceeded: `Превышено максимальное количество файлов (${mergedOptions.maxFilesAmount})`,
      dictDefaultMessage: 'Перетащите файлы сюда или кликните, чтобы выбрать файлы',
      dictInvalidFileType: `Файл имеет неверный формат. Допустимы только файлы в форматах (${mergedOptions.acceptedFiles?.join(', ')})`,
      dictRemoveFile: `
			<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M17.3031 6.30241L5.6358 17.9697C5.49515 18.1103 5.41613 18.3011 5.41613 18.5C5.41613 18.6989 5.49515 18.8897 5.6358 19.0303C5.77645 19.171 5.96722 19.25 6.16613 19.25C6.36504 19.25 6.55581 19.171 6.69646 19.0303L18.3637 7.36307C18.5044 7.22242 18.5834 7.03165 18.5834 6.83274C18.5834 6.63383 18.5044 6.44306 18.3637 6.30241C18.2231 6.16175 18.0323 6.08274 17.8334 6.08274C17.6345 6.08274 17.4437 6.16176 17.3031 6.30241Z" fill="currentColor"/>
				<path d="M5.63764 7.34099L17.3049 19.0083C17.4456 19.1489 17.6363 19.2279 17.8352 19.2279C18.0341 19.2279 18.2249 19.1489 18.3656 19.0083C18.5062 18.8676 18.5852 18.6768 18.5852 18.4779C18.5852 18.279 18.5062 18.0882 18.3656 17.9476L6.6983 6.28033C6.55765 6.13968 6.36688 6.06066 6.16797 6.06066C5.96906 6.06066 5.77829 6.13968 5.63764 6.28033C5.49699 6.42098 5.41797 6.61175 5.41797 6.81066C5.41797 7.00957 5.49699 7.20034 5.63764 7.34099Z" fill="currentColor"/>
			</svg>`,
      previewTemplate: `
			<div class="dz-preview dz-file-preview">
				<div class="dz-mark-container">
					<div class="dz-load-mark">
						<span>
							<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M12 1.5983C12 0.991726 12.4928 0.494783 13.0968 0.550219C15.26 0.748748 17.3363 1.53174 19.0987 2.82489C21.1574 4.33534 22.6806 6.46306 23.4469 8.8987C24.2131 11.3343 24.1825 13.9509 23.3595 16.3679C22.5365 18.785 20.964 20.8765 18.8706 22.3384C16.7772 23.8003 14.2721 24.5564 11.7194 24.4967C9.16681 24.437 6.69976 23.5647 4.67699 22.0065C2.65423 20.4483 1.18119 18.2856 0.472071 15.8327C-0.135031 13.7327 -0.155119 11.5138 0.403436 9.41455C0.559404 8.82837 1.19565 8.53687 1.76512 8.74576C2.33459 8.95464 2.6204 9.58489 2.47649 10.1741C2.0718 11.8312 2.10502 13.5719 2.58226 15.2226C3.16158 17.2265 4.36497 18.9934 6.01747 20.2663C7.66997 21.5393 9.68543 22.252 11.7708 22.3007C13.8562 22.3495 15.9027 21.7318 17.6129 20.5375C19.3231 19.3432 20.6078 17.6345 21.2802 15.6599C21.9525 13.6853 21.9775 11.5477 21.3515 9.55791C20.7255 7.56812 19.4811 5.82988 17.7993 4.59592C16.4139 3.57939 14.7911 2.94875 13.096 2.75805C12.4933 2.69024 12 2.20487 12 1.5983Z" fill="currentColor"/>
							</svg>
						</span>
					</div>
					<div class="dz-success-mark">
						<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M21.7959 8.04597L9.7959 20.046C9.69138 20.1509 9.56719 20.2341 9.43044 20.2909C9.2937 20.3476 9.14709 20.3769 8.99902 20.3769C8.85096 20.3769 8.70435 20.3476 8.5676 20.2909C8.43085 20.2341 8.30666 20.1509 8.20215 20.046L2.95215 14.796C2.8475 14.6913 2.76449 14.5671 2.70785 14.4304C2.65122 14.2936 2.62207 14.1471 2.62207 13.9991C2.62207 13.8511 2.65122 13.7046 2.70785 13.5678C2.76449 13.4311 2.8475 13.3069 2.95215 13.2022C3.05679 13.0976 3.18103 13.0146 3.31776 12.9579C3.45448 12.9013 3.60103 12.8721 3.74902 12.8721C3.89702 12.8721 4.04356 12.9013 4.18029 12.9579C4.31702 13.0146 4.44125 13.0976 4.5459 13.2022L8.99996 17.6563L20.204 6.4541C20.4154 6.24276 20.702 6.12402 21.0009 6.12402C21.2998 6.12402 21.5864 6.24276 21.7978 6.4541C22.0091 6.66544 22.1278 6.95209 22.1278 7.25098C22.1278 7.54986 22.0091 7.83651 21.7978 8.04785L21.7959 8.04597Z" fill="currentColor"/>
						</svg>
					</div>
					<div class="dz-error-mark">
						<span>
							<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.5459 18.454C19.7572 18.6653 19.876 18.952 19.876 19.2509C19.876 19.5497 19.7572 19.8364 19.5459 20.0477C19.3346 20.2591 19.0479 20.3778 18.749 20.3778C18.4501 20.3778 18.1635 20.2591 17.9521 20.0477L12 14.0937L6.0459 20.0459C5.83455 20.2572 5.54791 20.3759 5.24902 20.3759C4.95014 20.3759 4.66349 20.2572 4.45215 20.0459C4.2408 19.8345 4.12207 19.5479 4.12207 19.249C4.12207 18.9501 4.2408 18.6635 4.45215 18.4521L10.4062 12.4999L4.45402 6.54586C4.24268 6.33451 4.12395 6.04787 4.12395 5.74898C4.12395 5.4501 4.24268 5.16345 4.45402 4.95211C4.66537 4.74076 4.95201 4.62203 5.2509 4.62203C5.54978 4.62203 5.83643 4.74076 6.04777 4.95211L12 10.9062L17.954 4.95117C18.1654 4.73983 18.452 4.62109 18.7509 4.62109C19.0498 4.62109 19.3364 4.73983 19.5478 4.95117C19.7591 5.16251 19.8778 5.44916 19.8778 5.74804C19.8778 6.04693 19.7591 6.33358 19.5478 6.54492L13.5937 12.4999L19.5459 18.454Z" fill="currentColor"/>
              </svg>
						</span>
					</div>
				</div>

				<div class="dz-details">
					<div class="dz-filename typo-p3"><span data-dz-name></span></div>
					<div class="dz-size typo-p3" data-dz-size></div>
					<img data-dz-thumbnail />
				</div>
				<div class="dz-error-message"><span data-dz-errormessage></span></div>
			</div>
			`
    })
    dropzoneInstance.value.on('addedfile', (file: any) => {
      // Если уже есть другие файлы, удаляем их
      if (dropzoneInstance.value.files.length > 1) {
        // Удаляем все файлы кроме только что добавленного
        dropzoneInstance.value.files
          .filter((f: any) => f !== file)
          .forEach((f: any) => dropzoneInstance.value.removeFile(f))
      }

      const isAcceptedDuplicate = dropzoneInstance.value
        .getAcceptedFiles()
        .some((f: any) => f.name === file.name && f !== file)
      const isRejectedDuplicate = dropzoneInstance.value
        .getRejectedFiles()
        .some((f: any) => f.name === file.name && f !== file)

      if (isAcceptedDuplicate || isRejectedDuplicate) {
        dropzoneInstance.value.removeFile(file)
      }
    })

    dropzoneInstance.value.on('removedfile', (file: any) => {
      const errorFiles = dropzoneInstance.value.getFilesWithStatus('error')
      if (errorFiles.length > 0 && dropzoneInstance.value.getAcceptedFiles().length < mergedOptions.maxFilesAmount) {
        errorFiles.forEach((f: any) => {
          dropzoneInstance.value.removeFile(f)
          dropzoneInstance.value.addFile(f)
        })
        dropzoneInstance.value.processQueue()
      }

      model.value = [...dropzoneInstance.value.getAcceptedFiles(), ...dropzoneInstance.value.getRejectedFiles()]
      // const indexToDelete = filesRef.value.findIndex(element => file.upload.uuid === element.upload.uuid)

      // if (indexToDelete > -1) {
      // 	filesRef.value.splice(indexToDelete, 1)
      // }

      // emits('dropzone-removed', file)
    })

    dropzoneInstance.value.on('error', (file: any, error: any) => {
      const errorMessageElement = file.previewElement.querySelector('[data-dz-errormessage]')

      if (file.size > mergedOptions.maxFileSize * 1024 * 1024) {
        error = `Файл слишком большой. Максимальный размер файла: ${mergedOptions.maxFileSize} Мб.`
      }

      let errorMessage = 'Ошибка загрузки файла'

      if (errorMessageElement) {
        if (error.message) {
          errorMessage = error.message
        } else if (error.errors) {
          if (Array.isArray(error.errors.file)) {
            errorMessage = error.errors.file.join(', ')
          } else {
            errorMessage = error.errors.file
          }
        } else {
          errorMessage = error
        }
      }

      errorMessageElement.textContent = errorMessage

      model.value = [...dropzoneInstance.value.getAcceptedFiles(), ...dropzoneInstance.value.getRejectedFiles()]
    })

    dropzoneInstance.value.on('success', (file: any, response: Response) => {
      model.value = [...dropzoneInstance.value.getAcceptedFiles(), ...dropzoneInstance.value.getRejectedFiles()]
    })
  }
}

onMounted(() => {
  initDropzone()
})
</script>

<template>
  <div ref="dropzoneRef" class="ui-dropzone">
    <div class="ui-dropzone__btn" :disabled="isFilePickerDisabled" @click="handleFilePicker">
      <img src="/images/paper-clip.svg" alt="" />
      <span>{{ mergedOptions.label }}</span>
    </div>
    <div :id="uniqueId">
      <div :id="previewsId" class="ui-dropzone__previews" />
    </div>
  </div>
</template>

<style lang="scss">
.ui-dropzone {
  &__btn {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
    font-size: 16px;
    line-height: 100%;
    transition: all 0.2s ease 0s;

    @media (hover: hover) {
      &:hover {
        opacity: 0.6;
      }
    }
  }

  .dz-preview {
    margin: 20px 0 0;
    position: relative;
    padding: 0 32px;
  }

  .dz-mark-container {
    position: absolute;
    top: 0;
    left: 0;
  }

  .dz-load-mark {
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    color: $color-neutral-300;
    transition-property: opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    animation: load linear 1s infinite;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .dz-success-mark,
  .dz-error-mark {
    width: 24px;
    height: 24px;
    opacity: 0;
    transition-property: opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  .dz-success-mark {
    display: none;
    color: #ffffff;
  }

  .dz-error-mark {
    display: none;
    color: $color-red;
  }

  .dz-progress {
    display: none;
  }

  .dz-remove {
    position: absolute;
    top: 50%;
    right: 0;
    min-width: 24px;
    height: 24px;
    font-size: 14px;
    line-height: 20px;
    color: $color-neutral-300;
    transition-property: color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    transform: translate(0, -50%);

    @media (hover: hover) {
      &:hover,
      &:focus-visible {
        opacity: 0.5;
      }
    }
  }

  .dz-error-message {
    display: none;
    margin-top: 4px;
    width: 100%;
    font-size: 14px;
    line-height: 20px;
    color: $color-red;
  }

  .dz-preview.dz-complete .dz-load-mark {
    display: none;
  }

  .dz-preview.dz-error .dz-load-mark {
    display: none;
    opacity: 0;
  }

  .dz-preview.dz-error .dz-error-mark {
    display: block;
    opacity: 1;
  }

  .dz-preview.dz-success .dz-success-mark {
    display: block;
    opacity: 1;
  }

  .dz-details {
    overflow: hidden;
    overflow-wrap: break-word;
    display: flex;
    gap: 12px;
    align-items: baseline;
  }

  .dz-size {
    color: $color-neutral-300;

    strong {
      font-weight: 400;
    }
  }

  @keyframes load {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
