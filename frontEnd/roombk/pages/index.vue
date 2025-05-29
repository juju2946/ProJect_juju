<template>
  <div>
    <!-- MODIFIED: เพิ่ม header-bar กลับมาและปรับวันที่/เวลาให้เป็นค่าปัจจุบัน -->
    <div class="header-bar">
      <div class="date-nav flex items-center gap-4">
        <span class="text-gray-700 font-medium">Thu, 29 May 2025</span>
      </div>
      
    </div>

    <FullCalendar :options="calendarOptions" ref="calendar" />
    
  </div>
  <UModal v-model:open="open">
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #content>
      <Placeholder class="h-48 m-4" />
    </template>
  </UModal>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue' // MODIFIED: เพิ่ม watch
import FullCalendar from '@fullcalendar/vue3'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
const open = ref(false)

// NEW: ฟังก์ชันช่วยจัดการคุกกี้
const setCookie = (name, value, days) => {
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + encodeURIComponent(value || '') + expires + '; path=/'
}

const getCookie = (name) => {
  const nameEQ = name + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length))
  }
  return null
}

// NEW: ใช้ ref เพื่อเก็บปฏิทินและสถานะ
const calendar = ref(null)
const vacantOnly = ref(false)
const events = ref([]) // NEW: ใช้ ref สำหรับ events เพื่อให้ reactive

// MODIFIED: ฟังก์ชันจัดการการเลือก เพื่อบันทึกในคุกกี้
const handleSelect = (info) => {
  console.log(info)
  open.value = true
  // const title = prompt('Enter event title:')
  // if (title) {
  //   const calendarApi = info.view.calendar
  //   const newEvent = {
  //     id: Date.now().toString(), // NEW: เพิ่ม ID เฉพาะเพื่อให้แต่ละ event มีเอกลักษณ์
  //     title,
  //     start: info.startStr,
  //     end: info.endStr,
  //     resourceId: info.resource?.id,
  //     color: '#22c55e'
  //   }
  //   calendarApi.addEvent(newEvent)

  //   // NEW: อัปเดต events และบันทึกลงคุกกี้
  //   events.value.push(newEvent)
  //   setCookie('calendarEvents', JSON.stringify(events.value), 30) // บันทึกคุกกี้ 30 วัน
  // }
}

// NEW: โหลด events จากคุกกี้เมื่อโหลดหน้าและซิงค์กับปฏิทิน
onMounted(() => {
  const savedEvents = JSON.parse(getCookie('calendarEvents') || '[]')
  events.value = savedEvents
  if (calendar.value) {
    const calendarApi = calendar.value.getApi()
    calendarApi.removeAllEvents() // ลบ events เดิม
    savedEvents.forEach(event => calendarApi.addEvent(event)) // เพิ่ม events จากคุกกี้
  }
})

// NEW: ดูแลให้ events ซิงค์กับปฏิทินเมื่อเปลี่ยนแปลง
watch(events, (newEvents) => {
  if (calendar.value) {
    const calendarApi = calendar.value.getApi()
    calendarApi.removeAllEvents()
    newEvents.forEach(event => calendarApi.addEvent(event))
    setCookie('calendarEvents', JSON.stringify(newEvents), 30)
  }
}, { deep: true })

const calendarOptions = {
  plugins: [interactionPlugin, resourceTimeGridPlugin, resourceTimelinePlugin],
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
    right: 'today,prev,next',
  },
  events: computed(() => events.value), // MODIFIED: ใช้ events reactive
  resources: [
    { id: 'a', title: 'Room A' },
    { id: 'b', title: 'Room B' },
    { id: 'c', title: 'Room C' },
    { id: 'd', title: 'Room D' },
    { id: 'e', title: 'Room E' },
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