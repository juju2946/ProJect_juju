<script setup lang="ts">
definePageMeta({ layout: false });

import type { FormError, FormSubmitEvent } from "@nuxt/ui";

const state = reactive({
  firstname: undefined,
  lastname: undefined,
  email: undefined,
  password: undefined,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.firstname) errors.push({ name: "firstname", message: "Required" });
  if (!state.lastname) errors.push({ name: "lastname", message: "Required" });
  if (!state.email) errors.push({ name: "email", message: "Required" });
  if (!state.password) errors.push({ name: "password", message: "Required" });
  return errors;
};

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<typeof state>) {
  toast.add({
    title: "Success",
    description: "The form has been submitted.",
    color: "success",
  });
  console.log(event.data);
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
      <UForm
        :validate="validate"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <h1 class="text-2xl font-bold text-center mb-4">Register</h1>

        <UFormField class="w-full" label="First Name" name="firstname">
          <UInput class="w-full" placeholder="First Name" v-model="state.firstname"/>
        </UFormField>

        <UFormField class="w-full" label="Last Name" name="lastname">
          <UInput class="w-full" placeholder="Last Name" v-model="state.lastname"/>
        </UFormField>

        <UFormField class="w-full" label="Email" name="email">
          <UInput
            class="w-full"
            placeholder="Enter your email"
            v-model="state.email"
          />
        </UFormField>

        <UFormField class="w-full" label="Password" name="password">
          <UInput
            class="w-full"
            placeholder="Enter your password"
            v-model="state.password"
            type="password"
          />
        </UFormField>
        <UButton type="submit" block> Register </UButton>
      </UForm>
    </div>
  </div>
</template>
