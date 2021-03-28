<template>
  <div class="hello-page">
    <!-- <div id="hello-background"></div> -->
    <div id="hello-content">
      <div id="left-info">
        <div class="left-info-content"><homeworks /></div>
      <div class="left-info-content"><Player /></div>
        <div class="about">
          <span class="about-text">鲁ICP备20018544号</span>
          <a href="http://mercutio.club"><span class="about-text">莫阿白的博客</span></a>
          <!-- <a href="http://bing.com"><span class="about-text" style="font-size:10px;">壁纸来自Unsplash</span></a> -->
        </div>
      </div>
      <div class="home-wrap">
        <DynamicMainContent />
        <Navigation v-for="(item,index) in list" :title="item.title" :sites="item.list" :key="index" :noIcon="item.noIcon?true:false" :noColor="item.noColor?true:false"> </Navigation>
      </div>
    </div>
    
  </div>
</template>

<script>
import Player from '@/components/Player'
import CalendarBox from "@/components/CalendarBox";
import Navigation from "@/components/Navigation";
import Hitokoto from "@/components/Hitokoto";
import DynamicMainContent from "@/components/DynamicMainContent";
import Homeworks from "@/components/Homeworks";

export default {
  name: "HelloPage",
  components: {
    CalendarBox,
    Navigation,
    Hitokoto,
    DynamicMainContent,
    Player,
    Homeworks
  },
  data() {
    return {
      
    };
  },
  methods: {
    getList() {
      this.list = require("@/assets/data/navList.json");
    },
    
  },
  created(){
    this.getList();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
:root{
  --left-bar-width: 300px;
}
.hello-page{
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0 0 0;
}
#hello-background {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -2;
  /* background: url(https://source.unsplash.com/random/1920x1080) no-repeat fixed center/cover; */
}

#hello-content {
  box-sizing: border-box;
  width:var(--box-width);
  display: flex;
  position: relative;
  max-width: 1300px;
}

#left-info{
  height: 710px;
  box-sizing: border-box;
  position: fixed;
  bottom: 20px;
  padding: 40px 10px;
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  overflow: scroll;
}
#left-info .left-info-content{
  margin: 10px 0;
  background: var(--elem-color);
  border-radius: 5px;
  box-shadow: 0 2px 6px 1px #00000014;
  /* background: #ffffff75;
  backdrop-filter: blur(30px) saturate(180%);
  border-radius: 10px;
  box-shadow: 0 5px 8px 3px #00000014; */
      overflow: hidden;
}

.home-wrap {
  padding-left: calc(350px + 20px);
  display: flex;
  flex:1;
  overflow: scroll;
  flex-direction: column;
  /* height:calc(100vh - 150px); */
  user-select: none;
}
@media screen and (max-width: 600px){
  #hello-content {
    flex-direction: column;
    margin: 0;
    width:calc(100% - 20px * 2);
  }
  #left-info{
  position: relative;
  display: none;
  /* top:0px; */
  }
  .home-wrap {
  width: 100%;
  }
}
.about{
  position: absolute;
  bottom:0;
  left:25px;
  width:100%;
  /* margin: 0 auto 20px; */
  display: flex;
  flex-direction: row;
  /* justify-content: space-evenly; */
  font-size: 12px;
}
.about a{
  /* text-decoration: underline; */
  cursor: pointer;
  color: #000;
}

.about-text,.about a{
  color: var(--main-color);
  padding: 2px;
  transition: all .2s ease;
}
.about-text-course{
  color: var(--main-color);
  padding-left: 12px;
  font-size:10px;
}
.about a:hover{
  /* color: #ffffff!important; */
  background: var(--main-color-opa);
  border-radius: 5px;
  /* text-decoration: underline; */
  cursor: pointer;
  transition: all .35s ease;
}
</style>
