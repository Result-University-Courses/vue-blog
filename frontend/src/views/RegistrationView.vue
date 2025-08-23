<script setup>
import LabelBase from '@/components/base/LabelBase.vue';
import InputBase from '@/components/base/InputBase.vue';
import InputErrorBase from '@/components/base/InputErrorBase.vue';
import ButtonBase from '@/components/base/ButtonBase.vue';
import MessageBoxBase from '@/components/base/MessageBoxBase.vue';

import { useUserStore } from '@/stores/user';
import { Form } from 'vee-validate';
import * as yup from 'yup';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const userStore = useUserStore();
const errorMessage = ref('')

const schema = yup.object({
  login: yup.string().required('Логин обязателен').min(3, 'Логин должен быть не меньше 3 символов'),
  password: yup.string().required('Пароль обязателен').min(6, 'Пароль должен быть не меньше 6 символов'),
  confirmedPassword: yup.string().required('Повтор пароля обязателен').oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
})

const handleSubmit = async (formData) => {
  errorMessage.value = '';

  try {
    const data = await userStore.register(formData.login, formData.password)

    if (data?.error) {
      throw new Error(data?.error)
    }

    userStore.user = data.user
    router.push('/')

  } catch (error) {
    errorMessage.value = error
  }
}

</script>

<template>
  <div class="py-8">
    <h1 class="text-2xl font-bold text-center my-4">Регистрация</h1>
    <Form class="bg-white w-full max-w-sm mx-auto p-6 rounded-md shadow-md" :validation-schema="schema"
      @submit="handleSubmit">
      <div class="mb-4">
        <LabelBase for="login">Логин</LabelBase>
        <InputBase type="text" name="login" id="login" />
        <InputErrorBase name="login" />
      </div>
      <div class="mb-4">
        <LabelBase for="password">Пароль</LabelBase>
        <InputBase type="password" name="password" id="password" />
        <InputErrorBase name="password" />
      </div>
      <div class="mb-4">
        <LabelBase for="confirmedPassword" class="block text-gray-700">Повтор пароля</LabelBase>
        <InputBase type="password" name="confirmedPassword" id="confirmedPassword" />
        <InputErrorBase name="confirmedPassword" />
      </div>
      <ButtonBase type="submit" class="w-full">Зарегистроваться</ButtonBase>
      <MessageBoxBase type="error">{{ errorMessage }}</MessageBoxBase>
    </Form>
  </div>
</template>
