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
};
</script>

<style>
@import "./main.css";

body {
  margin: 0;
  padding: 0;
  background: url(https://bing.rthe.net/wallpaper) no-repeat fixed center/cover;

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
