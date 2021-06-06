<template>
  <div id="dynamic-main-content">
    <div class="dynamic-left-background">
      <img
        id="dynamic-left-background-image"
        :src="bgSrc"
        alt=""
        :onerror="defaultBg"
        ref="bgImg"
      />
      <div id="dynamic-left-background-mask"></div>
      <div class="dynamic-content">
        <CalendarBox />
        <Hitokoto />
      </div>
    </div>
  </div>
</template>
<script>
import CalendarBox from "@/components/CalendarBox";
import Hitokoto from "@/components/Hitokoto";
import Navigation from "@/components/Navigation";

export default {
  name: "DynamicMainContent",
  components: {
    CalendarBox,
    Hitokoto,
    Navigation,
  },
  data() {
    return {
      bgSrc: "https://source.unsplash.com/random/1920x1080",
      fullscreen: false
      
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
  },
};
</script>
<style>
:root {
  --dynamic-border-radius: 5px;
}

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
#dynamic-left-background-image {
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
}
.dynamic-content {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  pointer-events: none;
}
@media screen and (max-width: 1100px) {
  #dynamic-main-content {
    /* zoom: 0.2; */
    box-sizing: border-box;
    height: max-content;
    display: flex;
    flex-direction: column;
  }
  .dynamic-left {
    zoom: 0.8;
    height: max-content;
    margin: 0;
    margin: 0 0 10px;
    pointer-events: none;
    border-radius: 8px;
  }
  .dynamic-left-background {
    min-height: 350px;
  }
  .dynamic-right {
    width: 100%;
    height: max-content;
  }
}
</style>