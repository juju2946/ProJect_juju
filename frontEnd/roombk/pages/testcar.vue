<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script>
// ✅ เพิ่ม plugin ที่จำเป็น
import FullCalendar from "@fullcalendar/vue3"
import interactionPlugin from "@fullcalendar/interaction"
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid" // 🌟 highlight
import resourceTimelinePlugin from "@fullcalendar/resource-timeline" // 🌟 highlight

export default {
  components: { FullCalendar },
  data() {
    return {
      calendarOptions: {
        // ✅ ใช้ resource plugins
        plugins: [
          interactionPlugin,
          resourceTimeGridPlugin, // 🌟 highlight
          resourceTimelinePlugin // 🌟 highlight
        ],
        initialView: "resourceTimeGridDay", // 🌟 เปลี่ยนเป็น resourceTimeGridDay
        slotMinTime: "06:00:00", // 🌟 กำหนดเวลาขั้นต่ำ
        slotMaxTime: "20:00:00", // 🌟 กำหนดเวลาสูงสุด
        allDaySlot: true, // 🌟 ให้มี all-day event ด้านบน
        selectable: true,
        headerToolbar: {
          left: "",
          center: "title",
          right: "today,prev,next"
        },
        // ✅ เพิ่มรายชื่อห้อง
        resources: [ // 🌟 highlight
          { id: "a", title: "Room A" },
          { id: "b", title: "Room B" },
          { id: "c", title: "Room C" },
          { id: "d", title: "Room D" },
        ],
        // ✅ เพิ่ม event ที่อิงห้อง
        events: [ // 🌟 highlight
          {
            id: 1,
            resourceId: "a",
            title: "event 1",
            start: "2025-05-28",
            allDay: true
          },
        //   {
        //     id: 2,
        //     resourceId: "a",
        //     title: "event 2",
        //     start: "2025-05-28T09:00:00",
        //     end: "2025-05-28T14:00:00"
        //   },
        //   {
        //     id: 4,
        //     resourceId: "c",
        //     title: "event 4",
        //     start: "2025-05-28T07:30:00",
        //     end: "2025-05-28T09:30:00"
        //   },
        //   {
        //     id: 5,
        //     resourceId: "d",
        //     title: "event 5",
        //     start: "2025-05-28T10:00:00",
        //     end: "2025-05-28T15:00:00"
        //   }
        ]
      }
    }
  }
}
</script>