<script setup lang="ts">
definePageMeta({ layout: false })

import type { FormError, FormSubmitEvent } from '@nuxt/ui'
import { useRouter } from '#app'
const router = useRouter()

const state = reactive({
  email: undefined,
  password: undefined
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ name: 'email', message: 'Required' })
  if (!state.password) errors.push({ name: 'password', message: 'Required' })
  return errors
}

const toast = useToast()
// async function onSubmit(event: FormSubmitEvent<typeof state>) {
//   const { email, password } = event.data

//   // หา user ที่ email และ password ตรงกับข้อมูล mock
//   const matchedUser = mockUser.find(
//     user => user.email === email && user.password === password
//   )
//   if (matchedUser) {
//     toast.add({
//       title: 'Login Success',
//       description: 'You have successfully logged in!',
//       color: 'success'
//     })
//     console.log('✅ Logged in:', email)
//     router.push('/')
//   } else {
//     toast.add({
//       title: 'Login Failed',
//       description: 'Invalid email or password',
//       color: 'error'
//     })
//     console.log('❌ Login failed')
//   }
// }

// ฟังก์ชันเมื่อกดปุ่ม Submit
async function onSubmit(event: FormSubmitEvent<typeof state>) {
  const { email, password } = event.data

  try {
    // เรียก API ที่ backend ของคุณ
    const response:any = await $fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      body: { email, password }
    })

    // ถ้า login สำเร็จ (สมมุติ backend ส่ง token กลับมา)
    if (response && response.token) {
      // เก็บ token ไว้ใน cookie
      const token = useCookie('token')
      token.value = response.token
    }

    // แสดงข้อความสำเร็จ
    toast.add({
      title: 'Login Success',
      description: 'You have successfully logged in!',
      color: 'success'
    })

    console.log('✅ Logged in:', response)

    // เปลี่ยนหน้าไปยังหน้าแรก
    router.push('/')
  } catch (error: any) {
    // ถ้า login ผิดพลาด เช่น email หรือ password ไม่ถูกต้อง
    toast.add({
      title: 'Login Failed',
      description: error?.data?.message || 'Invalid email or password',
      color: 'error'
    })

    console.error('❌ Login failed:', error)
  }
}

</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
      <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
        <h1 class="text-2xl font-bold text-center mb-4">Login</h1>

        <UFormField class="w-full" label="Email" name="email">
          <UInput class="w-full" placeholder="Enter your email" v-model="state.email" />
        </UFormField>

        <UFormField class="w-full" label="Password" name="password">
          <UInput class="w-full" placeholder="Enter your password" v-model="state.password" type="password" />
        </UFormField>

        <UButton type="submit" block>
          Submit
        </UButton>
        <nuxt-link to="/register">
          <UButton color="neutral" variant="outline" type="button" block>
            Register
          </UButton>
        </nuxt-link>
      </UForm>
    </div>
  </div>
</template>
