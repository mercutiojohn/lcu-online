<template>
  <div id="side-bar">
    <div class="side-bar-content">
      <Countdown />
    </div>
    <div class="side-bar-content">
      <EmbedFrame
        url="https://www.dida365.com/webapp/#q/all/today"
        title="滴答清单"
        height="500"
      />
    </div>
    <!-- <div class="side-bar-content">
          <iframe
            class="side-bar-iframe"
            allow="autoplay *; encrypted-media *; geolocation; microphone; camera"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
            src="https://www.dida365.com/webapp/#q/all/today"
            frameborder="0"
            scrolling="auto"
          ></iframe>
        </div> -->
    <div class="side-bar-content">
      <Homeworks />
    </div>
    <!-- @makeGlobalDialogVisible="dialogVisible = true" -->
<!-- 
        :vals="this.login" -->
    <!-- <div class="side-bar-content"><Player /></div> -->

    <!-- <div class="about">
      <span class="about-text">鲁ICP备20018544号</span>
      <a href="http://mercutio.club"
        ><span class="about-text">莫阿白的博客</span></a
      >
      <a
        href="https://github.com/mercutiojohn/lcu-online/projects/1?fullscreen=true"
        ><span class="about-text" style="font-size: 10px">迭代路线</span></a
      >
      <a href="https://github.com/mercutiojohn/lcu-online/issues"
        ><span class="about-text" style="font-size: 10px">提意见</span></a
      >
    </div> -->
  </div>
</template>

<script>

import Homeworks from "@/components/Homeworks";
import Countdown from "@/components/Countdown";
import EmbedFrame from "@/components/EmbedFrame";
export default {
  name: "SideBar",
  components: {
    Homeworks,
    Countdown,
    EmbedFrame
  },
  data() {
    return {

    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style>

#side-bar {
  width:100%;
  height: 100%;
  /* height: calc(100vh - 115px); */
  box-sizing: border-box;
  /* position: fixed; */
  /* bottom: 50px; */
  /* padding: 0 10px 80px 10px; */
  /* width: 350px; */
  flex:1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  overflow-y: scroll;
  overflow-x: hidden;
  user-select: none;
}
#side-bar .side-bar-content {
  margin: 10px 5px;
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
#side-bar .side-bar-content .side-bar-iframe {
  width: 100%;
  height: 500px;
  display: block;
}
@media screen and (max-width: 600px) {
  #side-bar {
    position: unset;
    width: 100%;
    height: unset;
    /* display: none; */
    /* top:0px; */
    padding: 0;
    overflow: visible;
  }
  .home-wrap {
    max-width: 100%;
    /* display: none; */
    padding:0;
  }

}
</style>