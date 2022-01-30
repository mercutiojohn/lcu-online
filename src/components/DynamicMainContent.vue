<template>
  <div id="dynamic-main-content">
    <div class="dynamic-left-background">
      <transition name="fade">
      <img
        class="dynamic-left-background-image"
        :src="bgSrc"
        alt=""
        :onerror="defaultBg"
        ref="bgImg"
        v-if="settings == 'unsplash'&&contentSettings != 'full'&&!loading"
      />
      <img
        class="dynamic-left-background-image dynamic-left-background-image-custom"
        :src="defaultBg"
        alt=""
        ref="bgImg"
        v-else-if="settings == 'custom'&&contentSettings != 'full'"
      />
      </transition>
      <div id="dynamic-left-background-mask" :class="{'dynamic-left-background-mask-compact':contentSettings == 'full'||settings == 'none'}"></div>
      <div class="dynamic-content">
        <CalendarBox :darkStyle="settings != 'none'"/>
      </div>
    </div>
  </div>
</template>
<script>
import CalendarBox from "@/components/CalendarBox";
import Navigation from "@/components/Navigation";
// import { Loading } from 'element-ui';

export default {
  name: "DynamicMainContent",
  components: {
    CalendarBox,
    Navigation,
  },
  data() {
    return {
      bgSrc: "https://source.unsplash.com/random/1920x1080",
      fullscreen: false,
      loading:false
    };
  },
  methods: {
    changeWrapState() {
      if (this.fullscreen == true) {
        this.fullscreen = false;
      } else {
        this.fullscreen = true;
      }
    },
    getList() {
      this.list = require("@/assets/data/uniNavList.json");
    },
    changeBackground() {
      // let a = this.$refs.bgImg;
      if (this.bgSrc == "https://source.unsplash.com/random/1920x1080")
        this.bgSrc = "https://source.unsplash.com/random/4096x2160";
      else this.bgSrc = "https://source.unsplash.com/random/1920x1080";
      // let a = document.querySelector("#dynamic-left-background-image");
      // a.setAttribute('src',"https://source.unsplash.com/random/1920x1080");
    },
  },
  created() {
    this.getList();
  },
  mounted() {
    setInterval(this.changeBackground, 480000);
  },
  computed: {
    defaultBg: function () {
      return require("@/assets/img/bg/temp-bg.jpg");
    },
    settings:function () {
      return this.$store.state.settings.background;
    },
    contentSettings:function () {
      return this.$store.state.settings.contents;
    }
  },
};
</script>
<style>

#dynamic-main-content {
  width:100%;
  box-sizing: border-box;
  height: 100%;
  display: flex;
}
.dynamic-left-background {
  box-sizing: border-box;
  padding: 20px;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 99;
  background: #444;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.dynamic-left-background-image {
  object-fit: cover;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
#dynamic-left-background-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-image: radial-gradient(
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.1) 100%
    ),
    radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.2) 166%),
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 0% 75%,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.2) 100%
    );
  pointer-events: none;
  transition: all .2s ease;
}
.dynamic-left-background-mask-compact{
  background: var(--body-color)!important;
}
.dynamic-content {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: absolute;
  left: 50px;
  top: 100px;
  width: 100%;
  height: 100%;
  z-index: 3;
  pointer-events: none;
}

</style>