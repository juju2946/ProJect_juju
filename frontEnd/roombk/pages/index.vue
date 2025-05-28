<template>
  <div>
    <!-- ส่วนหัวที่เพิ่มใหม่ -->
    <div class="header-bar">
      <div class="date-nav flex items-center gap-4">
        <span class="text-gray-700">Today</span>
        <UButton @click="prevDay" icon="i-heroicons-chevron-left" color="gray" variant="ghost" />
        <span class="text-gray-700 font-medium">Wed, 28 May 2025</span>
        <UButton @click="nextDay" icon="i-heroicons-chevron-right" color="gray" variant="ghost" />
        <span class="text-gray-700">05:44 PM - 06:44 PM</span>
      </div>
      <div class="filters flex items-center gap-4">
        <div class="flex items-center gap-2">
          <USwitch v-model="vacantOnly" color="primary" />
          <span class="text-gray-700">Vacant Only</span>
        </div>
        <UButton color="gray" variant="outline" trailing-icon="i-heroicons-chevron-down">More Filter</UButton>
      </div>
    </div>

    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script>
definePageMeta({ layout: "default" });

import FullCalendar from "@fullcalendar/vue3";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid"; // 🌟 highlight
import resourceTimelinePlugin from "@fullcalendar/resource-timeline"; // 🌟 highlight

export default {
  components: {FullCalendar},
  data() {
    return {
      calendarOptions: {
        plugins: [ interactionPlugin, resourceTimeGridPlugin, resourceTimelinePlugin],
        initialView: "resourceTimeGridDay",
        selectable: true,
        allDaySlot: false,
        slotMinTime: "09:00:00",
        slotMaxTime: "20:00:00",
        height: "auto",
        select: this.handleSelect, // Callback เมื่อเลือกช่วงเวลา
        headerToolbar: {
          left: "",
          center: "title",
          right: "today,prev,next",
        },
        // ✅ เพิ่มรายชื่อห้อง
        resources: [ // 🌟 highlight
          { id: "a", title: "Room A" },
          { id: "b", title: "Room B" },
          { id: "c", title: "Room C" },
          { id: "d", title: "Room D" },
          { id: "d", title: "Room E" }
        ],
      },
    };
  },
};
</script>

<style scoped></style>
