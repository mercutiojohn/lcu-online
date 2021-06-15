<template>
  <div id="clockbox">
    <div
      id="clockbox-time"
      :class="{ 'clockbox-time-active': clockWrapDisplay }"
      v-on:click="changeWrapState('display')"
    >
      <span class="clockbox-open-icon"
        ><i
          :class="{
            iconfont: true,
            'icon-chevron-right': clockWrapDisplay,
            'icon-chevron-left': !clockWrapDisplay,
          }"
        ></i
      ></span>
      <!-- <span
        id="clockbox-week"
        :class="bgStatus ? 'bg-text-style' : '' + handleBgOn()"
      >
        第
        <span id="digits">{{ week }}</span
        >周
      </span> -->
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
    <transition name="trans">
      <div
        id="clockbox-wrap"
        v-show="clockWrapDisplay"
        :class="clockWrapExpand ? 'clockbox-wrap-expanded' : ''"
      >
        <div id="clockbox-space">
          <!-- <span
            v-on:click="changeWrapState('expand')"
            style="cursor: pointer"
            ><i class="iconfont icon-expand"></i></span>
          <span v-on:click="changeUrl()" style="cursor: pointer"
            ><i class="iconfont icon-switch"></i></span> -->
        </div>
        <div id="clockbox-calendar-container" class="">
          <div class="card-frame"><Player /></div>
          <div class="card-frame">
            <Television />
          </div>
          <!-- <div class="card-frame">
          <BiliRecommend />
          </div> -->
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
import TVNoise from "@/components/arts/TVNoise";
import Television from '@/components/Television';
import BiliRecommend from "@/components/BiliRecommend";
export default {
  props: ["bgEnable"],
  name: "ClockBox",
  components: {
    Player,
    TVNoise,
    Television,
    BiliRecommend
  },
  data() {
    return {
      currUrl: 0,
      url: [
        "https://app.raindrop.io/my/0",
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
      bgStatus: true,
    };
  },
  watch: {
    clockWrapDisplay(newStat) {
      const _this = this;
      // console.log(this.$store.state.clockBoxStat);
      // console.log(newStat);
      _this.$store.commit("update", ["clockBoxStat", newStat]);
      // console.log(this.$store.state.clockBoxStat);
    },
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
.trans-enter-active {
  transition: all 0.15s cubic-bezier(0.36, 0.13, 0.04, 1);
}

.trans-leave-active {
  transition: all 0.1s cubic-bezier(0.43, 0.2, 0.86, 0.88);
  /* transition-delay: 200ms; */
}

.trans-enter,
.trans-leave-to {
  /* background: transparent; */
  transform: translateX(25px);
  opacity: 0;
  /* backdrop-filter: blur(10px); */
}
:root {
  --wrap-gap: 10px;
}
#clockbox {
  flex-shrink: 0;
  padding: 3px;
}
#clockbox:hover {
}
#clockbox-space {
  height: var(--headbar-height);
  /* width: 100%; */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* border-right: 1px solid #7e7e7e45; */
  padding-right: 10px;
  margin: 5px 220px 5px 0;
  color: var(--main-color);
  flex:0 0 var(--headbar-height);
}
#clockbox-space span {
  padding: 7px;
  border-radius: 7px;
  margin: 0 0 0 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
}
#clockbox-space span i {
  font-size: 20px;
}
#clockbox-space span:hover {
  background: var(--accent-color);
  color: #fff;
}
#clockbox-time {
  position: relative;
  z-index: 99999;
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 5px;
}
#clockbox-time:hover {
  background: #80808054;
}
#clockbox-time:active {
  background: #80808098;
}
.clockbox-time-active {
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
.clockbox-open-icon i {
  font-size: 25px !important;
  color: var(--main-color);
}
#clockbox-wrap {
  /* min-width: 400px; */
  max-width: 100vw;
  width: 400px;
  height: 100vh;
  background: var(--blur-color);
  backdrop-filter: blur(120px) saturate(200%);
  position: fixed;
  top: 0;
  right: 0;
  box-shadow: 0 5px 10px -2px #00000023;
  display: flex;
  flex-direction: column;
}
.clockbox-wrap-expanded {
  width: 100vw !important;
  transition: all 0.2s ease;
}
#clockbox-calendar-container {
  margin: 0 0 5px;
  overflow: scroll;
}
.card-frame {
  margin: 10px 10px;
  background: var(--elem-color);
  border-radius: 5px;
  box-shadow: 0 2px 6px 1px #00000014;
  overflow: hidden;
  flex-shrink: 0;
}
.clockbox-noshadow {
  text-shadow: none !important;
  transition: all 0.3s ease;
}
#left-col-iframe {
  background: #fff;
  width: 100%;
  height: calc(100vh - var(--headbar-height) - 25px);
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
@media screen and (max-width: 600px) {
  #clockbox-wrap {
    position: fixed;
    top: calc(-100vh + 64px);
    display: flex;
    width: 100vw;
    height: calc(100vh - 64px);
    box-shadow: none;
    background: #000;
    background: var(--body-color);
  }
  #clockbox-time {
  }
  #clockbox-space {
    height: 30px;
  }
}
@media screen and (max-width: 950px) {
  #clockbox-time-content,
  #clockbox-twelve-label,
  #clockbox-week {
    display: none;
  }
}
</style>
