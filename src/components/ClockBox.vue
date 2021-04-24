<template>
  <div id="clockbox">
    <div
      :id="!clockWrapDisplay ? 'clockbox-time' : 'clockbox-time-active'"
      v-on:click="changeWrapState('display')"
    >
      <span
        id="clockbox-week"
        :class="bgStatus ? 'bg-text-style' : '' + handleBgOn()"
      >
        第
        <span id="digits">{{ week }}</span
        >周
      </span>
      <span
        id="clockbox-twelve-label"
        v-if="clockPreferences.twelveFormat"
        :class="bgStatus ? 'bg-text-style' : '' + handleBgOn()"
        >{{ clockPreferences.twelveLabel }}</span
      >
      <span
        id="clockbox-time-content"
        :class="bgStatus ? 'bg-text-style' : '' + handleBgOn()"
        >{{ date }}</span
      >
    </div>
    <transition name="fade">
      <div
        id="clockbox-wrap"
        v-show="clockWrapDisplay"
        :class="clockWrapExpand ? 'clockbox-wrap-expanded' : ''"
      >
        <div id="clockbox-space">
          <span
            v-on:click="changeWrapState('expand')"
            style="cursor: pointer; color: white"
            ><svg
              t="1600101820387"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2731"
              width="200"
              height="200"
            >
              <path
                d="M853.333333 213.333333a42.666667 42.666667 0 0 0-42.666666-42.666666h-213.333334a42.666667 42.666667 0 0 0 0 85.333333h109.653334l-139.946667 140.373333a42.666667 42.666667 0 0 0 0 60.586667 42.666667 42.666667 0 0 0 60.586667 0L768 316.586667V426.666667a42.666667 42.666667 0 0 0 42.666667 42.666666 42.666667 42.666667 0 0 0 42.666666-42.666666zM456.96 567.04a42.666667 42.666667 0 0 0-60.586667 0L256 706.986667V597.333333a42.666667 42.666667 0 0 0-42.666667-42.666666 42.666667 42.666667 0 0 0-42.666666 42.666666v213.333334a42.666667 42.666667 0 0 0 42.666666 42.666666h213.333334a42.666667 42.666667 0 0 0 0-85.333333H316.586667l140.373333-140.373333a42.666667 42.666667 0 0 0 0-60.586667z"
                p-id="2732"
                fill="#ffffff"
              ></path></svg
          ></span>
          <span v-on:click="changeUrl()" style="cursor: pointer; color: white"
            ><svg
              t="1600101946682"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4641"
              width="200"
              height="200"
            >
              <path
                d="M768 426.666667a42.666667 42.666667 0 0 0-42.666667-42.666667H230.826667l98.133333-97.706667a42.666667 42.666667 0 0 0-60.586667-60.586666l-170.666666 170.666666a42.666667 42.666667 0 0 0-8.96 46.506667A42.666667 42.666667 0 0 0 128 469.333333h597.333333a42.666667 42.666667 0 0 0 42.666667-42.666666z m167.253333 154.453333A42.666667 42.666667 0 0 0 896 554.666667H298.666667a42.666667 42.666667 0 0 0 0 85.333333h494.506666l-98.133333 97.706667a42.666667 42.666667 0 0 0 0 60.586666 42.666667 42.666667 0 0 0 60.586667 0l170.666666-170.666666a42.666667 42.666667 0 0 0 8.96-46.506667z"
                p-id="4642"
                fill="#ffffff"
              ></path></svg
          ></span>
        </div>
        <div id="clockbox-calendar-container" class="">
          <div class="card-frame"><Player /></div>
          <!-- <div class="card-frame">
          <iframe
            id="left-col-iframe"
            
            allow="autoplay *; encrypted-media *; geolocation; microphone; camera"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
            :src="url[currUrl]"
            frameborder="0"
            scrolling="auto"
          ></iframe>
          </div> -->
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Player from "@/components/Player";
export default {
  props: ["bgEnable"],
  name: "ClockBox",
  components: {
    Player
  },
  data() {
    return {
      currUrl: 0,
      url: [
        "https://www.dida365.com/webapp/#q/all/today",
        // 'https://i.ai.mi.com/h5/precache/ai-schedule/#/home',
        // 'https://music.163.com/st/difm/index.html',
        // 'https://t.bilibili.com/pages/nav/index_new',
        // 'http://music.jsososo.com/',
      ],
      clockWrapDisplay: false,
      clockPreferences: {
        twelveFormat: true,
      },
      currentDate: new Date(),
      clockWrapExpand: false,
      bgStatus:true
    };
  },
  methods: {
    changeUrl() {
      if (this.currUrl + 1 < this.url.length) {
        this.currUrl++;
      } else {
        this.currUrl = 0;
      }
    },
    changeWrapState(item) {
      if (item == "display") {
        if (this.clockWrapDisplay == true) {
          this.clockWrapDisplay = false;
        } else {
          this.clockWrapDisplay = true;
        }
      } else if (item == "expand") {
        if (this.clockWrapExpand == true) {
          this.clockWrapExpand = false;
        } else {
          this.clockWrapExpand = true;
        }
      }
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
    handleBgOn() {
      if (this.bgEnable) {
        return " clockbox-noshadow";
      } else {
        return "";
      }
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
#clockbox {
  flex-shrink: 0;
  padding: 3px;
}
#clockbox:hover {
  background: #80808054;
  border-radius: 5px;
  cursor: pointer;
}
#clockbox-space {
  height: 64px;
  /* width: 100%; */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-right: 1px solid #ffffff45;
  padding-right: 10px;
  margin: 5px 220px 5px 0;
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
  color: var(--main-color);
  margin-left: 5px;
  /* text-shadow: 0 5px 10px #00000083; */
}
#clockbox-wrap {
  width: 400px;
  /* height: calc(100vh - var(--wrap-gap) * 2); */
  height: 100vh;
  /* background: var(--blur-color); */
  background: #91919113;
  background: #dadada;
  /* border-radius: 5px; */
  /* backdrop-filter: blur(100px); */
  position: fixed;
  /* top: var(--wrap-gap); */
  /* right: var(--wrap-gap); */
  top:0;
  right: 0;
  transition: all 0.1s;
  box-shadow: 0 5px 10px -2px #00000023;
  display: flex;
  flex-direction: column;
}
.clockbox-wrap-expanded {
  /* width: calc(100vw - var(--wrap-gap) * 2) !important; */
  width: 100vw !important;
  transition: all 0.2s ease;
}
#clockbox-calendar-container {
  margin: 0 10px 5px;
  /* border-radius: 5px 5px 12px 12px; */
  overflow: scroll;
  /* height: 100%; */
  /* flex: 1; */
}
.card-frame {
  margin: 10px 0;
  background: var(--elem-color);
  border-radius: 5px;
  box-shadow: 0 2px 6px 1px #00000014;
  /* background: #ffffff75;
  backdrop-filter: blur(30px) saturate(180%);
  border-radius: 10px;
  box-shadow: 0 5px 8px 3px #00000014; */
  overflow: hidden;
  flex-shrink: 0 ;
}
.clockbox-noshadow {
  text-shadow: none !important;
  transition: all 0.3s ease;
}
#left-col-iframe {
  background: #fff;
  width: 100%;
  height: 600px;
}
.icon {
  width: 20px;
  height: 20px;
  margin: 5px;
  padding: 4px;
  border-radius: 3px;
}
.icon:hover {
  background: #ffffff45;
}
</style>
