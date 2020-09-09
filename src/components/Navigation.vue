<template>
  <div class="nav">
    <div class="nav-often">
      <span class="nav-title">{{title}}</span>
      <div class="nav-content">
        <a v-for="(item,index) in sites" :key="index" :href="item.url" target="_blank">
          <div class="nav-block" :style="'background-color:'+item.color">
            <img class="nav-block-icon" :src="getIcon(item.icon)" alt />
            <span class="nav-block-title" :style="'color:'+ifWhite(item.color)">{{item.title}}</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    sites: Array,
  },
  name: "Navigation",
  data() {
    return {
      // title:'',
      // sites:{},
      imgUrl: "assets/img/",
    };
  },
  methods: {
    ifWhite(color) {
      if (color == "#ffffff") {
        return "#000000";
      } else {
        return "#FFFFFF";
      }
    },
    getIcon(icon) {
      try {
        const a = require("@/assets/img/" + icon);
        return a;
      } catch (err) {
        console.log(err);
        return require("@/assets/img/pic.svg");
      }
    },
  },
};
</script>   

<style>
.nav-content {
  display: flex;
  /* flex-direction: column; */
  /* width: calc((150px + 10px) * 3); */
  /* height: calc((100px + 10px) * 5); */
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: visible;
  width: max-content;
  width: 100%;
}
.nav-block {
  width: 150px;
  height: 100px;
  border-radius: 15px;
  background: #ffffff23;
  margin: 0 10px 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: all 0.1s ease-in;
}
.nav-block:hover {
  /* backdrop-filter: blur(50px) saturate(180%);
  background: #ffffff63 !important; */
  color: white !important;
  transform: scale(1.04);
  transition: all 0.3s ease-out;
  box-shadow: 0 5px 20px 5px #00000023;
}
.nav-block:active {
  backdrop-filter: blur(50px) saturate(180%);
  background: #00000023 !important;
  color: white !important;
  transform: scale(1);
  transition: transform, background 0.5s ease-out;
}
.nav-block-icon {
  max-height: 40px;
  max-width:80px;
}
.nav-block-title {
  margin-top: 10px;
}
.nav-title {
  color: #fff;
  font-size: 20px;
  text-shadow: 0 5px 10px #00000083;
  margin-bottom: 20px;
}
.nav {
  display: flex;
  /* overflow-x: scroll; */
  /* overflow-y: hidden; */
}
.nav-often {
  display: flex;
  flex-direction: column;
  /* width: calc((150px + 10px) * 3); */
  width: 100%;
  width: max-content;
  overflow: visible;
  padding-left: 10px;
}
</style>