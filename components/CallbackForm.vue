<script lang="ts" setup>
import { vMaska } from 'maska/vue'
import { v4 as uuidv4 } from 'uuid'
import * as Yup from 'yup'
import { Form, Field } from 'vee-validate'

interface FormData {
  uploadKey: string
  fio: string
  tel: string
  comment: string
  files: any[]
  agree: boolean
}

const emits = defineEmits<{
  (e: 'submit-success'): void
  (e: 'submit-failure', error: any): void
}>()

const MAX_FILES = 1
const MAX_FILE_SIZE = 5 // Мб
const ACCEPTED_FILES = ['.doc', '.docx', '.rtf', '.pdf', '.txt']
const UPLOAD_URL = '/api/upload/'

const formRef = ref()
const isLoading = ref<boolean>(false)
const componentKey = ref<number>(0)
const uploadKey = uuidv4()

const form = reactive<FormData>({
  uploadKey,
  fio: '',
  tel: '',
  comment: '',
  files: [],
  agree: false
})

const schema = Yup.object().shape({
  name: Yup.string().required(),
  tel: Yup.string().required().length(16, 'Укажите корректный телефон'),
  comment: Yup.string().max(3000, 'Максимум 3000 символов'),
  files: Yup.array()
    .test('isAcceptedFile', 'Недопустимый формат файла', function (value: any[] | undefined, context): boolean {
      if (!value || value.length === 0) {
        return true
      }

      const invalidFiles = value.filter(file => {
        const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
        return !ACCEPTED_FILES.includes(fileExtension)
      })

      return invalidFiles.length === 0
    })
    .test(
      'fileSize',
      `Файл превышает максимальный размер ${MAX_FILE_SIZE} Мб`,
      function (value: any[] | undefined): boolean {
        if (!value || value.length === 0) {
          return true
        }

        const oversizedFiles = value.filter(file => file.size / 1024 / 1024 > MAX_FILE_SIZE)
        return oversizedFiles.length === 0
      }
    )
    .test(
      'no-upload-errors',
      'Не удалось загрузить некоторые файлы. Удалите их и повторите попытку.',
      (value: any[] | undefined): boolean => {
        if (!Array.isArray(value) || value.length === 0) return true
        return !value.some((f: any): boolean => f.status === 'error')
      }
    ),
  agree: Yup.boolean().oneOf([true])
})

const onTelInput = (e: Event): void => {
  const input = e.target as HTMLInputElement
  if (input.value.startsWith('+7 8') || input.value.startsWith('+78')) {
    input.value = '+7 ' + input.value.slice(4)
    form.tel = input.value
  }
}

const handleSubmit = async (values: any, actions: any) => {
  isLoading.value = true

  try {
    await $fetch('/api/callback/', {
      method: 'POST',
      body: {
        ...form
      }
    })

    actions.resetForm()
    form.files = []
    componentKey.value += 1

    emits('submit-success')
  } catch (error: any) {
    if (error.statusCode === 422) {
      actions.setErrors(error.data.errors)
    } else {
      emits('submit-failure', error)
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <Form ref="formRef" class="form" :validation-schema="schema" @submit="handleSubmit">
    <div class="form__flex">
      <Field v-slot="{ field, meta, errorMessage }" v-model="form.fio" name="name">
        <div class="input" :class="{ disabled: isLoading }">
          <div class="input__inner">
            <input
              v-model.trim="form.fio"
              v-maska
              data-maska="A"
              data-maska-tokens="A:[A-Za-zА-Яа-яЁё -]:multiple"
              v-bind="field"
              type="text"
              name="name"
              autocomplete="name"
              placeholder="Имя"
              :class="{
                error: meta.validated && !meta.valid
              }"
              :disabled="isLoading"
            />
            <label class="input__label">Имя<span>*</span></label>
          </div>

          <FormMessage v-if="errorMessage">
            {{ errorMessage }}
          </FormMessage>
        </div>
      </Field>
      <Field v-slot="{ field, meta, errorMessage }" v-model="form.tel" name="tel">
        <div class="input" :class="{ disabled: isLoading }">
          <div class="input__inner">
            <input
              v-maska="'+7 ### ###-##-##'"
              v-bind="field"
              type="tel"
              name="tel"
              autocomplete="tel"
              placeholder="Номер телефона"
              :class="{
                error: meta.validated && !meta.valid
              }"
              :disabled="isLoading"
              @input="onTelInput"
            />
            <label class="input__label">Номер телефона<span>*</span></label>
          </div>
          <FormMessage v-if="errorMessage">
            {{ errorMessage }}
          </FormMessage>
        </div>
      </Field>
      <Field v-slot="{ field, meta, errorMessage }" v-model="form.comment" name="comment">
        <div class="input" :class="{ disabled: isLoading }">
          <div class="input__inner">
            <textarea
              v-bind="field"
              name="comment"
              placeholder="Ваш вопрос"
              :class="{
                error: meta.validated && !meta.valid
              }"
              :disabled="isLoading"
            />
            <label class="input__label">Ваш вопрос</label>
          </div>
          <FormMessage v-if="errorMessage">
            {{ errorMessage }}
          </FormMessage>
        </div>
      </Field>
      <Field v-slot="{ field, errorMessage }" name="files">
        <div class="input" :class="{ disabled: isLoading }">
          <UIDropZone
            :key="componentKey"
            v-bind="field"
            v-model="form.files"
            name="files"
            :options="{
              label: 'Прикрепить файл',
              maxFilesAmount: MAX_FILES,
              maxFileSize: MAX_FILE_SIZE,
              acceptedFiles: ACCEPTED_FILES,
              uploadUrl: UPLOAD_URL,
              uploadKey: uploadKey
            }"
          />
          <FormMessage v-if="errorMessage">
            {{ errorMessage }}
          </FormMessage>
        </div>
      </Field>
    </div>
    <div class="form__bottom">
      <button :disabled="isLoading || !form.agree || !form.fio || !form.tel" class="btn btn--primary" type="submit">
        Оставить заявку
      </button>
      <Field
        v-slot="{ field, meta }"
        v-model="form.agree"
        name="agree"
        type="checkbox"
        :value="true"
        :unchecked-value="false"
      >
        <div class="input" :class="{ disabled: isLoading }">
          <label class="checkbox">
            <input
              v-bind="field"
              type="checkbox"
              :value="true"
              name="agree"
              class="checkbox__input"
              :class="{
                error: meta.validated && !meta.valid
              }"
              :disabled="isLoading"
            />
            <span class="checkbox__custom" />
            <span class="checkbox__text typo-p4">
              Я даю согласие на обработку моих персональных данных и принимаю
              <NuxtLink to="/politika/" target="_blank" class="gsap-draw-line">
                <span>политику конфиденциальности</span>
                <div class="gsap-draw-line-box" />
              </NuxtLink>
            </span>
          </label>
        </div>
      </Field>
    </div>
  </Form>
</template>
