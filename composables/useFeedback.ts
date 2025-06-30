import { h } from 'vue'
import { useModal, useModalSlot } from 'vue-final-modal'
import AppModal from '@/components/AppModal.vue'

const openSuccessModal = () => {
  const { open, close } = useModal({
    component: AppModal,
    attrs: {
      title: 'Мы приняли вашу заявку',
      description: 'Спасибо! Наши менеджеры свяжутся с вами в ближайшее время'
    },
    slots: {
      footer: useModalSlot({
        component: h(
          'button',
          {
            class: 'ui-modal__close-btn btn btn--primary',
            onClick: () => close()
          },
          'Хорошо'
        )
      })
    }
  })
  open()
}

let errorStatusCode: string | undefined

const openFailureModal = () => {
  const { open, close } = useModal({
    component: AppModal,
    attrs: {
      title: 'Что-то пошло не так...',
      description: 'Мы знаем о проблеме и уже работаем. Попробуйте обновить страницу или зайти попозже.',
      modalProps: {
        buttonClose: true
      }
    },
    slots: {
      error: String(errorStatusCode),
      footer: useModalSlot({
        component: h(
          'button',
          {
            class: 'ui-modal__close-btn btn btn--primary',
            onClick: () => close()
          },
          'Хорошо'
        )
      })
    }
  })
  open()
}

export default function useFeedback() {
  return {
    openSuccessModal,
    openFailureModal
  }
}
