<template>
  <div id="dynamic-main-content">
    <div class="dynamic-left">
      <div class="dynamic-left-background">
        <img
          id="dynamic-left-background-image"
          src="https://source.unsplash.com/random/1920x1080"
          alt=""
          srcset=""
        />
        <div id="dynamic-left-background-mask"></div>
        <div class="dynamic-content">
          <CalendarBox />
          <Hitokoto />
        </div>
      </div>
    </div>
    <div class="dynamic-right"></div>
  </div>
</template>
<script>
import CalendarBox from "@/components/CalendarBox";
import Hitokoto from "@/components/Hitokoto";

export default {
  name: "DynamicMainContent",
  components: {
    CalendarBox,
    Hitokoto,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style>
:root {
  --dynamic-border-radius: 5px;
}
#dynamic-main-content {
  box-sizing: border-box;
  height: 350px;
  display: flex;
}
.dynamic-left {
  /* width: 60%; */
  flex: 1;
  height: 100%;
  background: #000;
  border-radius: var(--dynamic-border-radius);
  margin-right: 10px;
  overflow: hidden;
}
.dynamic-right {
  width: 300px;
  height: 100%;
  background: #ccc;
  border-radius: var(--dynamic-border-radius);
}
.dynamic-left-background {
  box-sizing: border-box;
  padding: 20px;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 0;
  background: #444;
  /* background: url(https://source.unsplash.com/random/1920x1080) no-repeat fixed
    center/cover #444; */
  /* background: url(https://source.unsplash.com/random/1920x1080) no-repeat fixed
    center/cover #444; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
#dynamic-left-background-image {
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
}
.dynamic-content{
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
}
</style>