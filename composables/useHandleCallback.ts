import { useVfm } from 'vue-final-modal'
import useUIModal from '@/composables/useUIModal'
import CallbackForm from '@/components/CallbackForm.vue'

export default function useHandleCallback() {
  const { openModal } = useUIModal()
  const { closeAll } = useVfm()
  const { openSuccessModal, openFailureModal } = useFeedback()

  function handleCallback() {
    openModal({
      title: 'Обратный звонок',
      description: 'Оставьте заявку, и наш менеджер свяжется с вами в течение часа',
      componentProps: {
        async onSubmitSuccess() {
          await closeAll()
          openSuccessModal()
        },
        onSubmitFailure(error: any) {
          openFailureModal()
        }
      },
      component: CallbackForm
    })
  }
  return {
    handleCallback
  }
}
