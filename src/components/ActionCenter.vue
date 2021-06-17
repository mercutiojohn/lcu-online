<template>
  <div id="action-center">
    <div
      id="action-center-time"
      :class="{ 'action-center-time-active': clockWrapDisplay }"
      v-on:click="changeWrapState('display')"
    >
      <span class="action-center-open-icon"
        ><i
          :class="{
            iconfont: true,
            'icon-chevron-right': clockWrapDisplay,
            'icon-chevron-left': !clockWrapDisplay,
            'action-center-bg-on': bgEnable && !clockWrapDisplay,
          }"
        ></i
      ></span>
      <!-- <span
        id="action-center-week"
        :class="bgStatus ? 'bg-text-style' : '' + handleBgOn()"
      >
        第
        <span id="digits">{{ week }}</span
        >周
      </span> -->
      <span
        id="action-center-twelve-label"
        v-if="settings.twelveFormat"
        :class="{ 'action-center-bg-on': bgEnable && !clockWrapDisplay }"
        >{{ twelveLabel }}</span
      >
      <span
        id="action-center-time-content"
        :class="{ 'action-center-bg-on': bgEnable && !clockWrapDisplay }"
        >{{ date }}</span
      >
    </div>
    <transition name="trans">
      <div
        id="action-center-wrap"
        v-show="clockWrapDisplay"
        :class="{'action-center-wrap':true, 'action-center-wrap-expanded': clockWrapExpand,'action-center-wrap-blur':blurSetting }"
      >
        <div id="action-center-space">
          <div
            :class="{ tab: true, 'tab-active': currTab == item.component }"
            @click="changeTab(index)"
            style="cursor: pointer"
            v-for="(item, index) in tabList"
            :key="index"
          >
            <i :class="'iconfont ' + item.icon"></i>
            <span class="tab-name">{{ item.name }}</span>
          </div>
        </div>
        <transition name="fade" mode="out-in">
          <keep-alive>
            <component v-bind:is="currTab" class="tab"></component>
          </keep-alive>
        </transition>
      </div>
    </transition>
  </div>
</template>
<script>
import MediaCenter from "@/components/MediaCenter";
import Settings from "@/components/Settings";
export default {
  props: ["bgEnable"],
  name: "ActionCenter",
  components: {
    MediaCenter,
    Settings,
  },
  data() {
    return {
      timer:'',
      date:'',
      currTab: "MediaCenter",
      clockWrapDisplay: false,
      twelveLabel: "",
      currentDate: new Date(),
      clockWrapExpand: false,
      bgStatus: true,
      tabList: [
        {
          icon: "icon-grid",
          name: "影音",
          component: "MediaCenter",
        },
        {
          icon: "icon-settings",
          name: "设置",
          component: "Settings",
        },
      ],
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
    changeTab(index) {
      this.currTab = this.tabList[index].component;
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

      if (this.settings.twelveFormat) {
        // h = '下午' + (h % 12);
        if (h / 12 >= 1) {
          this.twelveLabel = "下午";
        } else {
          this.twelveLabel = "上午";
        }
        h = h % 12;
        // TODO
      }

      var result = h + ":" + m;

      if (this.settings.showSeconds) {
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
        return " action-center-noshadow";
      } else {
        return "";
      }
    },
  },
  mounted() {
    this.timer = setInterval(()=>{
      this.date = this.getTime();
    },100)
  },
  computed: {
    // date: function (){
    //   return this.getTime();
    // },
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
    settings: function () {
      return this.$store.state.settings.clock;
    },
    blurSetting:function () {
      return this.$store.state.settings.blur;
    }
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
#action-center {
  /* position: absolute; */
  /* right:10px; */
  /* top:10px; */
  /* z-index: 1000; */
  flex-shrink: 0;
  padding: 3px;
}
#action-center:hover {
}
#action-center-space {
  height: var(--headbar-height);
  /* width: 100%; */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* border-right: 1px solid #7e7e7e45; */
  padding-right: 10px;
  margin: 5px 220px 5px 0;
  color: var(--main-color);
  flex: 0 0 var(--headbar-height);
}
#action-center-space .tab {
  padding: 7px;
  /* border-radius: 7px; */
  margin: 0 0 0 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 3px solid transparent;
}
#action-center-space .tab-active {
  border-color: var(--accent-color) !important;
}
#action-center-space .tab i {
  font-size: 20px;
  margin-right: 3px;
}
#action-center-space .tab:hover {
  background: var(--second-assist-color);
}
#action-center-time {
  position: relative;
  z-index: 1001;
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 5px;
}
#action-center-time:hover {
  background: #80808054;
}
#action-center-time:active {
  background: #80808098;
}
.action-center-time-active {
}
#action-center-time-content {
  cursor: pointer;
  font-size: 40px;
  /* font-weight: 800; */
  font-family: "Mitype2018-90", Politica, -apple-system, SF UI Text,
    "SF Pro Display";
}
#action-center-time-content,
#action-center-twelve-label,
#action-center-week {
  color: var(--main-color);
  margin-left: 5px;
}
.action-center-open-icon i {
  font-size: 25px !important;
  color: var(--main-color);
}
.action-center-wrap {
  /* min-width: 400px; */
  max-width: 100vw;
  width: 400px;
  height: 100vh;
  background: var(--body-color);
  position: fixed;
  top: 0;
  right: 0;
  box-shadow: 0 5px 10px -2px #00000023;
  display: flex;
  flex-direction: column;
  z-index: 1000;
}
.action-center-wrap-blur{
  /* transition:background-color .5s ease; */
  background: var(--blur-color-solid);
  backdrop-filter: blur(120px) saturate(200%);
}
.action-center-wrap-expanded {
  width: 100vw !important;
  transition: all 0.2s ease;
}
#action-center-calendar-container {
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
/* TODO: */
.action-center-bg-on {
  color: #fff !important;
  text-shadow: 0 5px 10px #00000083 !important;
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
  #action-center-wrap {
    position: fixed;
    top: calc(-100vh + 64px);
    display: flex;
    width: 100vw;
    height: calc(100vh - 64px);
    box-shadow: none;
    background: var(--body-color);
  }
  #action-center-time {
  }
  #action-center-space {
    height: 30px;
  }
}
@media screen and (max-width: 950px) {
  #action-center-time-content,
  #action-center-twelve-label,
  #action-center-week {
    display: none;
  }
}
</style>
