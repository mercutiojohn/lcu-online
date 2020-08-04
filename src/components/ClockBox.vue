<template>
  <div id="clockbox">
    <div
      :id="!clockWrapDisplay?'clockbox-time':'clockbox-time-active'"
      v-on:click="changeWrapState('display')"
    >
      <span id="clockbox-week" :class="bgStatus?'bg-text-style':''">
        第
        <span id="digits">{{week}}</span>周
      </span>
      <span
        id="clockbox-twelve-label"
        v-if="clockPreferences.twelveFormat"
        :class="bgStatus ?'bg-text-style':''"
      >{{clockPreferences.twelveLabel}}</span>
      <span id="clockbox-time-content" :class="bgStatus ?'bg-text-style':''">{{date}}</span>
    </div>
    <transition name="fade">
      <div id="clockbox-wrap" v-show="clockWrapDisplay" :class="clockWrapExpand?'clockbox-wrap-expanded':''">
        <div id="clockbox-space">
          <span v-on:click="changeWrapState('expand')" style="cursor:pointer;color:white">expand</span>
          <!-- <span v-on:click="changeWrapState()" style="cursor:pointer;">关闭</span> -->
        </div>
        <div id="clockbox-calendar-container">
          <!-- <el-calendar v-model="currentDate">
          </el-calendar>-->
          <!-- <iframe
            id="left-col-iframe"
            allow="autoplay *; encrypted-media *; geolocation; microphone; camera"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
            src="https://www.dida365.com/webapp/#q/all/today"
            frameborder="0"
            scrolling="auto"
          ></iframe> -->
          <van-calendar v-model="show" type="range" :formatter="formatter" />
        </div>
      </div>
    </transition>
  </div>
</template>
<script>


export default {
  name: "ClockBox",
  date: "",
  data() {
    return {
      clockWrapDisplay: false,
      clockPreferences: {
        twelveFormat: true,
      },
      currentDate: new Date(),
      clockWrapExpand: false,
    };
  },
  methods: {
    changeWrapState(item) {
        if(item=='display'){
      if (this.clockWrapDisplay == true) {
        this.clockWrapDisplay = false;
      } else {
        this.clockWrapDisplay = true;
      }}
      else if(item=='expand'){
      if (this.clockWrapExpand == true) {
        this.clockWrapExpand = false;
      } else {
        this.clockWrapExpand = true;
      }}
    },
    getTime() {
      var today = new Date();
      var h = today.getHours();
      var m = today.getMinutes();
      var s = today.getSeconds();
      // add a zero in front of numbers<10
      m = this.checkTime(m);
      s = this.checkTime(s);

      if (this.clockPreferences.twelveFormat) {
        // h = '下午' + (h % 12);
        if (h / 12 >= 1) {
          this.clockPreferences.twelveLabel = "下午";
        } else {
          this.clockPreferences.twelveLabel = "上午";
        }
        h = h % 12;
        // TODO
      }

      var result = h + ":" + m;

      if (this.clockPreferences.showSecond) {
        result = h + ":" + m + ":" + s;
      }
      return result;
    },
    checkTime(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    },
  },
  created() {
    this.date = this.getTime();
  },
  computed: {
    week: function () {
      function getYearWeek(date) {
        var date2 = new Date(date.getFullYear(), 0, 1);
        var day1 = date.getDay();
        if (day1 == 0) day1 = 7;
        var day2 = date2.getDay();
        if (day2 == 0) day2 = 7;
        var d = Math.round(
          (date.getTime() -
            date2.getTime() +
            (day2 - day1) * (24 * 60 * 60 * 1000)) /
            86400000
        );
        return Math.ceil(d / 7) + 1;
      }
      var start = new Date(2020, 2, 17);
      return getYearWeek(start);
    },
  },
};
</script>
<style>
:root {
  --wrap-gap: 10px;
}
#clockbox-space {
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 25px;
}
#clockbox-time {
  position: relative;
  z-index: 99999;
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
}
#clockbox-time-active {
  position: relative;
  z-index: 99999;
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
}
#clockbox-time-content {
  cursor: pointer;
  font-size: 40px;
  /* font-weight: 800; */
  font-family: "Mitype2018-90", Politica, -apple-system, SF UI Text,
    "SF Pro Display";
}
#clockbox-time-content,
#clockbox-twelve-label,
#clockbox-week {
  color: #fff;
  margin-left: 5px;
  text-shadow: 0 5px 10px #00000083;
}
#clockbox-wrap {
  width: 500px;
  height: calc(100vh - var(--wrap-gap) * 2);
  background: var(--blur-color);
  border-radius: 15px;
  backdrop-filter: blur(100px);
  position: fixed;
  top: var(--wrap-gap);
  right: var(--wrap-gap);
  transition: all 0.5s ease;
  box-shadow: 0 5px 10px 2px #00000043;
}
.clockbox-wrap-expanded {
  width: calc(100vw - var(--wrap-gap) * 2)!important;
  transition: all 0.5s ease;
}
#clockbox-calendar-container {
  margin: 0 20px 20px 20px;
  border-radius: 12px;
  overflow: scroll;
  height: calc(100% - 90px - var(--wrap-gap));
}
</style>
