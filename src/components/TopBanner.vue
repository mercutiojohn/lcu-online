<template>
  <div id="top-banner">
    <transition name="fade">
      <div :class="{ 'dynamic-left': true, 'dynamic-left-fullscreen': fullscreen }">
        <!-- 
        @click="changeWrapState"
        :class="{ 'dynamic-left': true, 'dynamic-left-fullscreen': fullscreen }"
        -->
        <swiper class="swiper" :options="swiperOption" :auto-update="true" :auto-destroy="true">
          <swiper-slide>
            <DynamicMainContent />
          </swiper-slide>
          <swiper-slide>
            <DynamicMainContent />
          </swiper-slide>
          <swiper-slide>Slide 3</swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
    </transition>
    <div class="dynamic-right">
      <Navigation
        v-for="(item, index) in list"
        :title="item.title"
        :sites="item.list"
        :key="index"
        :ifSmall="true"
      ></Navigation>
    </div>
  </div>
</template>
<script>
import CalendarBox from "@/components/CalendarBox";
import Hitokoto from "@/components/Hitokoto";
import Navigation from "@/components/Navigation";
import DynamicMainContent from "@/components/DynamicMainContent";
import BannerSwiper from "@/components/BannerSwiper";

import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

export default {
  name: "TopBanner",
  components: {
    CalendarBox,
    Hitokoto,
    Navigation,
    DynamicMainContent,
    BannerSwiper,
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  data() {
    return {
      bgSrc: "https://source.unsplash.com/random/1920x1080",
      fullscreen: false,
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
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
    defaultBg: function() {
      return require("@/assets/img/bg/temp-bg.jpg");
    },
  },
};
</script>
<style lang="css" scoped>
:root {
  --dynamic-border-radius: 5px;
}

#top-banner {
  box-sizing: border-box;
  height: 350px;
  display: flex;
}
.swiper {
  height: 100%;
  width: 100%;
  transform: translateX(0px);
}
.swiper-slide-prev {
  /* transform:scale(0.95) translateX(200px); */
}
.swiper-slide-next {
  transform: scale(0.95);
  z-index: -1;
}
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  /* text-align: center; */
  font-weight: bold;
  /* font-size: $font-size-huge * 2; */
  background-color: white;
  border-radius: var(--dynamic-border-radius);
  overflow: hidden;
  transition: all 0.2s ease;
  border: 1px solid #000;
}
.dynamic-left {
  /* width: 60%; */
  box-sizing: border-box;
  flex: 1;
  height: 100%;
  background: #000;
  border-radius: var(--dynamic-border-radius);
  margin-right: 10px;
  overflow: hidden;
  /* cursor: pointer; */
  transform: translate(0);
  transition: transform 0.1s ease;
  z-index: 80;
}
/* .dynamic-left:hover {
  transform: scale(1.02) translate(0);
}
.dynamic-left:active {
  transform: scale(0.98) translate(0);
} */
.dynamic-left-fullscreen {
  transform: scale(1) translate(0) !important;
  border-radius: 0;
  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  /* padding: 50px; */
}
.dynamic-right {
  box-sizing: border-box;
  width: 300px;
  height: 100%;
  background: var(--elem-color);
  display: flex;
  /* padding: 10px 0; */
  justify-content: center;
  border-radius: var(--dynamic-border-radius);
  overflow: hidden;
}
.dynamic-right .nav {
  box-sizing: border-box;
  width: 100%;
  padding: 15px;
  flex: 1;
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
  #top-banner {
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