<script setup lang="ts">
definePageMeta({ layout: false });

import { useFetch } from '#imports'
import type { FormError, FormSubmitEvent } from "@nuxt/ui";
import { useRouter } from "#app";
import { ref, watch, reactive } from 'vue'

// ประกาศอินเทอร์เฟส User ภายในไฟล์
interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
  status?: 'Active' | 'Inactive' // ทำ optional ตาม schema
  createdAt: string
  updatedAt: string
  password?: string
}

// กำหนดประเภทของ state
interface FormState {
  firstName: string | undefined
  lastName: string | undefined
  email: string | undefined
  password: string | undefined
  role: string | undefined
}

const router = useRouter()
const { params } = useRoute()
const userId = Number(params.id)
const items = ref(['ADMIN', 'USER']) // ใช้ Role enum จาก schema

const state = reactive<FormState>({
  firstName: '' as string | undefined,
  lastName: '' as string | undefined,
  email: '' as string | undefined,
  password: '' as string | undefined, // ไม่บังคับกรอกถ้าไม่เปลี่ยน
  role: '' as string | undefined
});

const { data: user, error, pending } = await useFetch<User>(`http://localhost:3001/users/${userId}`, {
  immediate: true
})

// ใช้ watch เพื่ออัปเดต state ด้วยข้อมูลจาก API
watch(user, (newUser: User | null) => {
  console.log('User data received:', newUser) // ดีบั๊กเพื่อตรวจสอบข้อมูล
  if (newUser) {
    state.firstName = newUser.firstName || ''
    state.lastName = newUser.lastName || ''
    state.email = newUser.email || ''
    state.password = '' // ไม่แสดง password เดิม ปล่อยให้กรอกใหม่ถ้าต้องการ
    state.role = newUser.role || ''
  } else {
    console.log('No user data received, resetting state')
    state.firstName = ''
    state.lastName = ''
    state.email = ''
    state.password = ''
    state.role = ''
  }
}, { immediate: true })

const validate = (state: FormState): FormError[] => {
  const errors = [];
  if (!state.firstName) errors.push({ name: "firstName", message: "Required" });
  if (!state.lastName) errors.push({ name: "lastName", message: "Required" });
  if (!state.email) errors.push({ name: "email", message: "Required" });
  // ไม่บังคับ password ถ้าไม่เปลี่ยน
  if (state.password === '' || state.password === undefined) {
    // ปล่อยผ่านถ้าไม่กรอก password
  } else if (!state.password) {
    errors.push({ name: "password", message: "Required if changing" });
  }
  if (!state.role) errors.push({ name: "role", message: "Required" });
  return errors;
};

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<FormState>) {
  // ระบุประเภทของ event.data ให้ชัดเจน
  const { firstName, lastName, email, password, role } = event.data as FormState;
  // กำหนดประเภทของ payload ให้รองรับ password เป็น optional
  const payload: Partial<FormState> = { firstName, lastName, email, role };
  if (password) payload.password = password; // ตรวจสอบและเพิ่ม password ถ้ามี

  try {
    const response: any = await $fetch(`http://localhost:3001/users/${userId}`, {
      method: 'PUT',
      body: payload
    });

    toast.add({
      title: "Success",
      description: "User updated successfully",
      color: "success"
    });

    console.log("Update User", response);
    router.push('/Aduser');
  } catch (error: any) {
    toast.add({
      title: "Update User Failed",
      description: error.message || "Please try again",
      color: "error"
    });
    console.error("Error", error);
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="w-full max-w-md bg-white p-8 rounded-xl shadow-md relative" style="z-index: 0;">
      <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
        <h1 class="text-2xl font-bold text-center mb-4">Edit User</h1>

        <div v-if="pending" class="text-gray-500 text-center mb-4">Loading...</div>
        <div v-if="error" class="text-red-500 text-center mb-4">Error loading user: {{ error.message }}</div>

        <UFormField v-if="!pending && !error" class="w-full" label="First Name" name="firstName">
          <UInput class="w-full" :value="state.firstName" placeholder="First Name" v-model="state.firstName" />
        </UFormField>

        <UFormField v-if="!pending && !error" class="w-full" label="Last Name" name="lastName">
          <UInput class="w-full" :value="state.lastName" placeholder="Last Name" v-model="state.lastName" />
        </UFormField>

        <UFormField v-if="!pending && !error" class="w-full" label="Email" name="email">
          <UInput class="w-full" :value="state.email" placeholder="Enter your email" v-model="state.email" />
        </UFormField>

        <UFormField v-if="!pending && !error" class="w-full" label="Password" name="password">
          <UInput class="w-full" :value="state.password" placeholder="Enter new password (leave blank to keep current)" v-model="state.password" type="password" />
        </UFormField>

        <UFormField v-if="!pending && !error" class="w-full" label="Role" name="role">
          <USelect v-model="state.role" :options="items" class="w-full" :value="state.role" placeholder="Select your role" />
        </UFormField>

        <div v-if="!pending && !error" class="flex justify-end gap-4 p-4">
          <nuxt-link to="/Aduser">
            <UButton type="button" class="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200">
              Cancel
            </UButton>
          </nuxt-link>
          <UButton type="submit" class="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200">
            Save Changes
          </UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>