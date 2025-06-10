<script setup lang="ts">
definePageMeta({ layout: false });

import type { FormError, FormSubmitEvent } from "@nuxt/ui";
import { useRouter } from "#app";

const router = useRouter()
const items = ref(['Admin', 'User']);
const state = reactive({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
    role: undefined
});


const validate = (state: any): FormError[] => {
    const errors = [];
    if (!state.firstName) errors.push({ name: "firstName", message: "Required" });
    if (!state.lastName) errors.push({ name: "lastName", message: "Required" });
    if (!state.email) errors.push({ name: "email", message: "Required" });
    if (!state.password) errors.push({ name: "password", message: "Required" });
    if (!state.role) errors.push({ name: "role", message: "Required" });
    return errors;
};

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<typeof state>) {
    const { firstName, lastName, email, password, role } = event.data;

    try {
        const response: any = await $fetch('http://localhost:3001/users', {
            method: 'POST',
            body: { firstName, lastName, email, password, role }
        });

        toast.add({
            title: "Success",
            description: "Your account has been created",
            color: "success"
        });

        console.log("Add New User", response);
        router.push('/login')
    } catch (error: any) {

        toast.add({
            title: "Add New User Failed",
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
                <h1 class="text-2xl font-bold text-center mb-4">Add a New User</h1>

                <UFormField class="w-full" label="First Name" name="firstname">
                    <UInput class="w-full" placeholder="First Name" v-model="state.firstName" />
                </UFormField>

                <UFormField class="w-full" label="Last Name" name="lastname">
                    <UInput class="w-full" placeholder="Last Name" v-model="state.lastName" />
                </UFormField>

                <UFormField class="w-full" label="Email" name="email">
                    <UInput class="w-full" placeholder="Enter your email" v-model="state.email" />
                </UFormField>

                <UFormField class="w-full" label="Password" name="password">
                    <UInput class="w-full" placeholder="Enter your password" v-model="state.password" type="password" />
                </UFormField>

                <UFormField class="w-full" label="Role" name="role">
                    <USelect v-model="state.role" :items="items" class="w-full" placeholder="Select your role" />
                </UFormField>
                <UButton type="submit" block> Submit </UButton>
            </UForm>
        </div>
    </div>
</template>