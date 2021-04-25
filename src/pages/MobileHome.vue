<template>
  <div id="mobile">
    <div class="mobile-tools-list">
       <div class="mobile-tool-item">
        <Countdown />
      </div>
        <DynamicMainContent />
      
      <div class="mobile-tool-item">
        <Player />
      </div>
      <div class="mobile-tool-item">
        <Homeworks />
      </div>
    </div>
  </div>
</template>

<script>
import Player from "@/components/Player";
import Countdown from "@/components/Countdown";
import Homeworks from "@/components/Homeworks";
import DynamicMainContent from "@/components/DynamicMainContent";
export default {
  name: "MobileHome",
  components: {
    Player,
    Countdown,
    Homeworks,
    DynamicMainContent
  },
  data() {},
  methods: {
    linktab() {
      let goUrl = this.isMobile();
      if (goUrl === 1) {
        //移动端地址
        // location = "http://127.0.0.1:8043";
        // alert("hello");
      } else {
        //   location = "/";
        //PC地址
      }
    },
    isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      let goUrl = flag ? 1 : 0;
      return goUrl;
    }
  },
  mounted() {
      this.linktab();
  },
  created() {},
};
</script>

<style>
.mobile-tools-list {
  margin: 0 20px;
}
.mobile-tool-item {
  margin: 10px 0;
  background: var(--elem-color);
  border-radius: 5px;
  box-shadow: 0 2px 6px 1px #00000014;
  /* background: #ffffff75;
  backdrop-filter: blur(30px) saturate(180%);
  border-radius: 10px;
  box-shadow: 0 5px 8px 3px #00000014; */
  overflow: hidden;
  flex-shrink: 0;
}
</style>