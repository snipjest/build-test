import { useModal, useModalSlot, useVfm, type ModalSlot } from 'vue-final-modal'
import AppModal from '@/components/AppModal.vue'

import type { Component } from 'vue'

interface ModalConfig {
  title?: string
  description?: string
  component?: Component
  modalProps?: Record<string, unknown>
  componentProps?: Record<string, unknown>
}

export default function useUIModal() {
  const { closeAll } = useVfm()

  async function openModal(config?: ModalConfig) {
    const slots: { [key: string]: ModalSlot | undefined } = {}

    if (config?.component) {
      slots.default = useModalSlot({
        component: config.component,
        attrs: config.componentProps || {}
      })
    }

    if (config?.modalProps?.footerComponent) {
      slots.footer = useModalSlot({
        component: config.modalProps.footerComponent,
        attrs: config.modalProps.footerProps || {}
      })
    }

    const { open } = useModal({
      component: AppModal,
      attrs: {
        title: config?.title,
        description: config?.description,
        ...config?.modalProps
      },
      slots
    })

    await closeAll()
    open()
  }

  return {
    openModal,
    closeAll
  }
}
