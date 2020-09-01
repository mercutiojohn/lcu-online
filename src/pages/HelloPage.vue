<template>
  <div class="hello-page">
    <div id="hello-background"></div>
    <div id="hello-content">
      <div id="top-info">
        <CalendarBox />
      </div>
      <div class="navigation">
        <Navigation />
      </div>
    </div>
  </div>
</template>

<script>
import CalendarBox from "@/components/CalendarBox";
import Navigation from "@/components/Navigation";

export default {
  name: "HelloPage",
  components: {
    CalendarBox,
    Navigation
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#hello-background {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  background: url(https://bing.rthe.net/wallpaper) no-repeat fixed center/cover;
}
#hello-content {
  background: #ffffff23;
  width: calc(100% - 80px);
  min-height: calc(100vh - 150px);
  padding: 20px;
  border-radius: 20px;
  margin: 0 20px 20px;
  display: flex;
}

</style>
