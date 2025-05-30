<!-- components/BookingFormModal.vue -->
<template>
  <UModal v-model:open="open">
    <UForm @submit="submit" class="space-y-4">
      <div class="text-lg font-bold">Booking</div>

      <UFormGroup label="Room">
        <UInput v-model="form.room" readonly />
      </UFormGroup>

      <UFormGroup label="Name">
        <UInput v-model="form.name" placeholder="Booking" />
      </UFormGroup>

      <UFormGroup label="Start">
        <UInput v-model="form.start" readonly />
      </UFormGroup>

      <UFormGroup label="End">
        <UInput v-model="form.end" readonly />
      </UFormGroup>

      <UFormGroup label="Detail">
        <UTextarea v-model="form.detail" rows="3" />
      </UFormGroup>

      <div class="flex justify-end gap-2">
        <UButton color="neutral" @click="close">Cancel</UButton>
        <UButton type="submit" color="primary">Add</UButton>
      </div>
    </UForm>
  </UModal>
</template>

<script setup>
import { ref, watch, defineEmits } from 'vue'

const props = defineProps(['open', 'info'])
const emit = defineEmits(['close', 'submit'])

const form = ref({
  room: '',
  name: 'Booking',
  start: '',
  end: '',
  detail: '',
})

watch(() => props.info, (info) => {
  if (info) {
    form.value = {
      room: info.resource?.title || '',
      name: 'Booking',
      start: info.startStr,
      end: info.endStr,
      detail: '',
    }
  }
}, { immediate: true })

const submit = () => {
  emit('submit', form.value)
}

const close = () => {
  emit('close')
}
</script>
