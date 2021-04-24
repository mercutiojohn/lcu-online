<template>
  <div id="all">
    <HeaderBar />
    <!-- <div id="fake"></div>  -->
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <!-- <Course /> -->
  </div>
</template>
<script>
import HeaderBar from "@/components/HeaderBar";

export default {
  name: "App",
  components: {
    HeaderBar,
  },
  mounted() {
    const script = document.createElement('script')
    script.src = 'https://v1.cnzz.com/z_stat.php?id=1279258067&web_id=1279258067'
    script.language = 'JavaScript'
    document.body.appendChild(script)
  },
  watch:{
    '$route': {
      handler(to, from) {
        setTimeout(() => { //避免首次获取不到window._czc
          if (window._czc) {
            let location = window.location;
            let contentUrl = location.pathname + location.hash;
            let refererUrl = '/';
            // 用于发送某个URL的PV统计请求，
            window._czc.push(['_trackPageview', contentUrl, refererUrl])
            window._czc.push(["_setAutoPageview", false]);
          }
        }, 300)
      },
      immediate: true  // 首次进入页面即执行
    }
  }
};
</script>

<style>
@import "./main.css";

body {
  /* perspective:550px; */

  margin: 0;
  padding: 0;
  /* background: url(https://bing.rthe.net/wallpaper) no-repeat fixed center/cover; */

}
body::before{
    transition:all .2s ease;
  
}
@media screen and (max-width: 1030px) {
  body::before{
    display: flex;
    align-items: center;
    justify-content: center;
    content:"暂不支持过窄宽度";
    color: #fff;
    position: fixed;
    top:calc(50% - 100px);
    left: calc(50% - 100px);
    z-index: 10000;
    background: #00000094;
    backdrop-filter: blur(50px);
    width: 200px;
    height: 200px;
    border-radius: 10px;
    box-sizing: border-box;
  }
  /* body::after{
    z-index: 1000;
    display: flex;
    position: fixed;
    top:0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #00000023;
    content: "";
  } */
}

#all {
  margin: 0;
  padding: 0;
  width: 100vw;
  min-height: 100vh;
  font-family: "SF Pro Display", "苹方", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* background: url(https://bing.rthe.net/wallpaper) no-repeat fixed center/cover; */
  /* text-align: center; */
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}
#fake {
  height: 1000px;
  width: 100px;
}
</style>
