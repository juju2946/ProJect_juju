<!-- <template>
  <FullCalendar :options="calendarOptions" />
</template>

<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

export default {
  components: {
    FullCalendar},
  data() {
    return {
      calendarOptions: {
        plugins: [timeGridPlugin, interactionPlugin, resourceTimeGridPlugin,resourceTimelinePlugin],
        initialView: "resourceTimeGridDay",
        timezone: "UTM",

        // dateClick: this.handleDateClick,
        selectable: true,
        allDaySlot: false, //ปิดแถบบน allDaySlot
        slotMinTime: "09:00:00",
        slotMaxTime: "20:00:00",
        height: "auto",
        //ตกแต่งส่วนบนของ ปฎิธิน
        headerToolbar: {
          left: "",
          center: "title",
          right: "timeGridWeek,timeGridDay,today,prev,next" // user can switch between the two
        },
      },
    };
  },
  methods: {
    handleDateClick: function (arg) {
      alert("date click! " + arg.dateStr);
    },
  },
};
</script>

<script setup>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const handleDateClick = (arg) => {
  alert("date click! " + arg.dateStr);
};

const calendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  dateClick: handleDateClick,
  events: [
    { title: "event 1", date: "2019-04-01" },
    { title: "event 2", date: "2019-04-02" },
  ],
};

</script> -->

<style scoped></style>
