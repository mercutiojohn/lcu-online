<template>
  <div class="calendar">
    <div class="calendar-background"></div>
    <!-- <span class="block date-content"><span id="localdate"></span></span> -->
    <div class="calendar-content">
      <span class="block-today day-content">
        <span id="day">{{ day }}</span>
      </span>
      <span class="bloc-today year-content">
        {{ year }}
        <span style="font-family: sans-serif; font-weight: 300">/</span>
        {{ month }}
      </span>
      <!-- <span class="block month-content"><span id="month"></span>月</span> -->
      <span class="block-today week-content">星期{{ week }}</span>
      <span class="block-today week-content">
        <span v-if="schoolWeek < 0">开学还有</span>
        <!-- <span v-else>第</span>
          {{Math.abs(schoolWeek)}}
          周 -->
      </span>
      <!-- <span class="block-today time-content" id="localtime">{{localtime}}</span> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "CalendarBox",
  data() {
    return {
      year: "",
      month: "",
      day: "",
      week: "",
    };
  },

  methods: {
    showTime(objD) {
      var str;
      var hh = objD.getHours();
      if (hh < 10) hh = "0" + hh;
      var mm = objD.getMinutes();
      if (mm < 10) mm = "0" + mm;
      var ss = objD.getSeconds();
      if (ss < 10) ss = "0" + ss;
      str = hh + ":" + mm;
      return str;
    },
    showDate(objD, option) {
      var str, colorhead, colorfoot;
      var yy = objD.getYear();
      if (yy < 1900) yy = yy + 1900;
      var MM = objD.getMonth() + 1;
      // if (MM == 0) MM = "一";
      // if (MM == 1) MM = "二";
      // if (MM == 2) MM = "三";
      // if (MM == 3) MM = "四";
      // if (MM == 4) MM = "五";
      // if (MM == 5) MM = "六";
      // if (MM == 6) MM = "七";
      // if (MM == 7) MM = "八";
      // if (MM == 8) MM = "九";
      // if (MM == 9) MM = "十";
      // if (MM == 10) MM = "十一";
      // if (MM == 11) MM = "十二";
      // if (MM < 10) MM = '0' + MM;
      var dd = objD.getDate();
      if (dd < 10) dd = "0" + dd;
      var ww = objD.getDay();
      if (ww == 0) ww = "日";
      if (ww == 1) ww = "一";
      if (ww == 2) ww = "二";
      if (ww == 3) ww = "三";
      if (ww == 4) ww = "四";
      if (ww == 5) ww = "五";
      if (ww == 6) ww = "六";
      if (option == "y") {
        str = yy;
      } else if (option == "m") {
        str = MM;
      } else if (option == "d") {
        str = dd;
      } else if (option == "w") {
        str = ww;
      } else {
        str = yy + "-" + MM + "-" + dd + " " + ww;
      }
      return str;
    },
    // function showLocale(objD) {
    //     var str, colorhead, colorfoot;
    //     var yy = objD.getYear();
    //     if (yy < 1900) yy = yy + 1900;
    //     var MM = objD.getMonth() + 1;
    //     if (MM < 10) MM = '0' + MM;
    //     var dd = objD.getDate();
    //     if (dd < 10) dd = '0' + dd;
    //     var hh = objD.getHours();
    //     if (hh < 10) hh = '0' + hh;
    //     var mm = objD.getMinutes();
    //     if (mm < 10) mm = '0' + mm;
    //     var ss = objD.getSeconds();
    //     if (ss < 10) ss = '0' + ss;
    //     var ww = objD.getDay();
    //     if (ww == 0) colorhead = "<font color=\"#000\">";
    //     if (ww > 0 && ww < 6) colorhead = "<font color=\"#000\">";
    //     if (ww == 6) colorhead = "<font color=\"#000\">";
    //     if (ww == 0) ww = "星期日";
    //     if (ww == 1) ww = "星期一";
    //     if (ww == 2) ww = "星期二";
    //     if (ww == 3) ww = "星期三";
    //     if (ww == 4) ww = "星期四";
    //     if (ww == 5) ww = "星期五";
    //     if (ww == 6) ww = "星期六";
    //     colorfoot = "</font>"
    //     str = colorhead + yy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss + " " + ww + colorfoot;
    //     return (str);
    // }
    tick() {
      var today;
      today = new Date();
      this.localtime = this.showTime(today);
      this.year = this.showDate(today, "y");
      this.month = this.showDate(today, "m");
      this.day = this.showDate(today, "d");
      this.week = this.showDate(today, "w");
      // document.getElementById("localtime").innerHTML = this.showTime(today);
      // document.getElementById("localdate").innerHTML = showDate(today,'');
      // document.getElementById("year").innerHTML = this.showDate(today, 'y');
      // document.getElementById("month").innerHTML = this.showDate(today, 'm');
      // document.getElementById("day").innerHTML = this.showDate(today, 'd');
      // document.getElementById("week").innerHTML = this.showDate(today, 'w');
      window.setTimeout("tick()", 1000);
    },
  },
  computed: {
    schoolWeek: function () {
      var startDay = new Date(2021, 3, 1); // 开学时间，可以按格式改，月份从0开始
      var startMs = startDay.getTime();
      var startYear = startDay.getFullYear();
      var startMonth = startDay.getMonth() + 1; //月份从0开始
      var startDate = startDay.getDate();

      var nowDay = new Date();
      var nowMs = nowDay.getTime();
      var nowYear = nowDay.getFullYear();
      var nowMonth = nowDay.getMonth() + 1;
      var nowDate = nowDay.getDate();
      var startDays = parseInt(startMs / 86400000);
      var nowDays = parseInt(nowMs / 86400000);
      var totalDays = nowDays - startDays;
      var week = parseInt(totalDays / 7);
      var nowdate = totalDays % 7;
      return week + 1;
    },
  },
  created() {
    this.tick();
  },
};
</script>

<style>
.block-today {
  display: block;
}
.year-content,
.month-content,
.week-content,
.time-content,
.school-week-content {
  font-size: 30px;
  /* background: #aaa; */
  text-align: left;
  text-shadow: 0 0px 20px #00000083;
}
.time-content {
  font-size: 30px;
  /* background: #aaa; */
  text-align: right;
  /* background: #aaa; */
  /* width: 400px; */
  position: absolute;
  right: 30px;
  top: 120px;
}
.day-content {
  font-size: 120px;
  line-height: 110px;
  font-family: Politica, Mitype2018-60, Mitype2018-90, Palatino, Caecilia,
    Bookerly;
  text-shadow: 0 0px 30px #00000083;
  font-weight: 200;
  padding-bottom: 10px;
  /* background: #eee; */
}

.calendar {
  box-sizing: border-box;
  font-family: Mitype2018-60, Politica, "PingFang SC", "微软雅黑", MiLan,
    Helvetica, Futura;
  /* width: 300px; */
  font-weight: 800;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  /* background: #aaa; */
  color: #fff;
  user-select: none;
  padding: 20px;
}
.week-content,
.school-week-content {
  font-size: 20px;
  margin: 7px 0;
}
</style>