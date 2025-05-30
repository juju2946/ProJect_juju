<template>
  <div>
    <!-- MODIFIED: อัปเดตวันที่/เวลาให้เป็นค่าปัจจุบัน -->
    <div class="header-bar">
      <div class="date-nav flex items-center gap-4">
        <span class="text-gray-700 font-medium">Fri, 30 May 2025</span>
      </div>
    </div>

    <FullCalendar :options="calendarOptions" ref="calendar" />

  <UModal v-model:open="open">
    <template #content>
      
            <UCard class="w-full">
        <template #header>
          <h2 class="text-lg font-semibold">Booking</h2>
        </template>

        <UForm @submit.prevent="addEvent" class="space-y-4">
          <UFormField label="Room">
            <UInput v-model="form.room" readonly />
          </UFormField>

          <UFormField label="Name">
            <UInput v-model="form.name" placeholder="Enter name" />
          </UFormField>

          <UFormField label="Start">
            <UInput v-model="form.start" readonly />
          </UFormField>

          <UFormField label="End">
            <UInput v-model="form.end" readonly />
          </UFormField>

          <UFormField label="Detail">
            <UTextarea v-model="form.detail" :rows="3" placeholder="Enter details" />
          </UFormField>

          <div class="flex justify-end gap-2">
            <UButton color="gray" @click="closeModal">Cancel</UButton>
            <UButton type="submit" color="green" >Add</UButton>
          </div>
        </UForm>
      </UCard>
    </template>
  </UModal>
  </div>
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'

const open = ref(false)
const calendar = ref(null)
const selectedInfo = ref(null)

const form = ref({
  room: '',
  name: '',
  start: '',
  end: '',
  detail: ''
})

const events = ref([])

// ฟังก์ชันจัดการเมื่อลากเลือก
const handleSelect = (info) => {
  console.log(info)
  selectedInfo.value = info
  form.value.room = info.resource?.title || ''
  form.value.start = info.startStr
  form.value.end = info.endStr
  form.value.name = ''
  form.value.detail = ''
  open.value = true // เปิด Modal เมื่อลากเลือก
}

// ฟังก์ชันเพิ่ม event
const addEvent = (info) => {
  console.log(info)
  if (!form.value.name) {
    alert('Please enter a name.')
    return
  }
  const newEvent = {
    id: Date.now().toString(),
    title: form.value.name,
    start: form.value.start,
    end: form.value.end,
    resourceId: selectedInfo.value.resource?.id,
    extendedProps: {
      detail: form.value.detail
    },
    color: '#22c55e'
  }
  const calendarApi = calendar.value.getApi()
  calendarApi.addEvent(newEvent)
  events.value.push(newEvent)
  closeModal() // ปิด Modal หลังเพิ่ม event
}

// ฟังก์ชันปิด Modal
const closeModal = () => {
  open.value = false
  form.value = { room: '', name: '', start: '', end: '', detail: '' }
  selectedInfo.value = null
}

onMounted(() => {
  const savedEvents = JSON.parse(localStorage.getItem('calendarEvents') || '[]')
  events.value = savedEvents
  if (calendar.value) {
    const calendarApi = calendar.value.getApi()
    calendarApi.removeAllEvents()
    savedEvents.forEach(event => calendarApi.addEvent(event))
  }
})

watch(events, (newEvents) => {
  if (calendar.value) {
    const calendarApi = calendar.value.getApi()
    calendarApi.removeAllEvents()
    newEvents.forEach(event => calendarApi.addEvent(event))
    localStorage.setItem('calendarEvents', JSON.stringify(newEvents))
  }
}, { deep: true })

const calendarOptions = {
  plugins: [interactionPlugin, resourceTimeGridPlugin],
  initialView: 'resourceTimeGridDay',
  selectable: true,
  allDaySlot: false,
  slotMinTime: '09:00:00',
  slotMaxTime: '20:00:00',
  height: 'auto',
  select: handleSelect,
  headerToolbar: {
    left: '',
    center: 'title',
    right: 'today,prev,next'
  },
  events: computed(() => events.value),
  resources: [
    { id: 'a', title: 'Room A' },
    { id: 'b', title: 'Room B' },
    { id: 'c', title: 'Room C' },
    { id: 'd', title: 'Room D' },
    { id: 'e', title: 'Room E' }
  ]
}
</script>

<style scoped>
.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e5e7eb;
}
</style>