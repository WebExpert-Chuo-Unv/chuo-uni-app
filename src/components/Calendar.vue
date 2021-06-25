<template>
  <div>
    <div class="content">
      <div>
        <div>
          <!-- <router-link to="/viewpage">閲覧ページ</router-link> -->
        </div>
        <router-view />
      </div>
      <h2>カレンダー{{ currentDate }}</h2>
      <div>
        <div>
          <!-- <router-link to="/viewpage">閲覧ページ</router-link> -->
        </div>
        <router-view />
      </div>
      <div class="button-area">
        <button @click="prevMonth" class="button">前の月</button>
        <button @click="nextMonth" class="button">次の月</button>
        <div class="back">
          <router-link to="/MyPage">マイページに戻る</router-link>
        </div>
      </div>
      <div class="calendar">
        <div
          class="calendar-weekly"
          v-for="(week, index) in calendars"
          :key="index"
        >
          <router-link
            class="calendar-daily"
            v-for="(day, index) in week"
            :key="index"
            v-on:click="alerttest(day)"
            :to="{ name: 'PageView', params: { todayDate: day } }"
          >
            <div class="calendar-day">
              {{ day.day }}
            </div>
            <div v-for="dayEvent in day.dayEvents" :key="dayEvent.id">
              <div
                class="calendar-event"
                :style="`background-color:${dayEvent.color}`"
              >
                {{ dayEvent.name }}
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      currentDate: moment(),
      events: [
        // {
        //   id: 1,
        //   name: "ミーティング",
        //   start: "2021-06-01",
        //   end: "2021-06-01",
        //   color: "blue",
        // },
        // {
        //   id: 2,
        //   name: "イベント",
        //   start: "2021-06-02",
        //   end: "2021-06-03",
        //   color: "limegreen",
        // },
      ],
      dayEvents: null,
    };
  },
  methods: {
    getStartDate() {
      let date = moment(this.currentDate);
      date.startOf("month");
      const youbiNum = date.day();
      return date.subtract(youbiNum, "days");
    },
    getEndDate() {
      let date = moment(this.currentDate);
      date.endOf("month");
      const youbiNum = date.day();
      return date.add(6 - youbiNum, "days");
    },
    getCalendar() {
      let startDate = this.getStartDate();
      const endDate = this.getEndDate();
      const weekNumber = Math.ceil(endDate.diff(startDate, "days") / 7);

      let calendars = [];
      let calendarDate = this.getStartDate();

      for (let week = 0; week < weekNumber; week++) {
        let weekRow = [];
        for (let day = 0; day < 7; day++) {
          let dayEvents = this.getDayEvents(calendarDate);
          weekRow.push({
            day: calendarDate.get("date"),
            month: calendarDate.format("YYYY-MM"),
            dayEvents,
          });
          calendarDate.add(1, "days");
        }
        calendars.push(weekRow);
      }
      return calendars;
    },
    getDayEvents(date) {
      return this.events.filter((event) => {
        let startDate = moment(event.start).format("YYYY-MM-DD");
        let endDate = moment(event.end).format("YYYY-MM-DD");
        let Date = date.format("YYYY-MM-DD");
        if (startDate <= Date && endDate >= Date) return true;
      });
    },
    nextMonth() {
      this.currentDate = moment(this.currentDate).add(1, "month");
    },
    prevMonth() {
      this.currentDate = moment(this.currentDate).subtract(1, "month");
    },
    alerttest(day) {
      console.log(day);
    },
  },
  computed: {
    calendars() {
      return this.getCalendar();
    },
  },
  // mounted() {
  //   this.events.push({
  //     id: 3,
  //     name: "練習",
  //     start: "2021-06-18",
  //     end: "2021-06-18",
  //     color: "green",
  //   });
  // },
};
</script>
<style>
.content {
  margin: 2em auto;
  width: 900px;
}
.button-area {
  margin: 0.5em 0;
}
.button {
  padding: 4px 8px;
  margin-right: 8px;
}
.calendar {
  max-width: 900px;
  border-top: 1px solid #e0e0e0;
  font-size: 0.8em;
}
.calendar-weekly {
  display: flex;
  border-left: 1px solid #e0e0e0;
  /* background-color: black; */
}
.calendar-daily {
  flex: 1;
  min-height: 125px;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  margin-right: -1px;
}
.calendar-day {
  text-align: center;
}
.calendar-event {
  color: white;
  margin-bottom: 1px;
  height: 25px;
  line-height: 25px;
}
.back {
  float: right;
}
</style>
