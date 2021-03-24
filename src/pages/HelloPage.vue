<template>
  <div class="hello-page">
    <!-- <div id="hello-background"></div> -->
    <!-- <div id="hello-background-mask"></div> -->
    <div id="hello-content">
      <div id="left-info">
        <div class="left-info-content"><CalendarBox /></div>
        <div class="left-info-content"><Hitokoto /></div>
        <div class="about">
          <span class="about-text">鲁ICP备20018544号</span>
          <a href="http://mercutio.club"><span class="about-text">莫阿白的博客</span></a>
          <!-- <a href="http://bing.com"><span class="about-text" style="font-size:10px;">壁纸来自Unsplash</span></a> -->
        </div>
      </div>
      <div class="navigation">
        <DynamicMainContent />
        <Navigation v-for="(item,index) in list" :title="item.title" :sites="item.list" :key="index" :noIcon="item.noIcon?true:false" :noColor="item.noColor?true:false"> </Navigation>
        <span class="about-text-course">现处预览测试阶段，无法自定义内容。</span>
        <span class="about-text-course">如果想来一起做后端，欢迎博客留言💜</span>
      </div>
    </div>
    
  </div>
</template>

<script>
import CalendarBox from "@/components/CalendarBox";
import Navigation from "@/components/Navigation";
import Hitokoto from "@/components/Hitokoto";
import DynamicMainContent from "@/components/DynamicMainContent";

export default {
  name: "HelloPage",
  components: {
    CalendarBox,
    Navigation,
    Hitokoto,
    DynamicMainContent
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

.hello-page{
  display: flex;
  align-items: center;
  justify-content: center;
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
#hello-background-mask{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  background-image: radial-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%), radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.3) 166%),linear-gradient(180deg, rgba(0, 0, 0, 0) 0%,rgba(0, 0, 0, 0) 0% 75%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%);
}
#hello-content {
  box-sizing: border-box;
  /* background: #ffffff23; */
  /* border:  1px solid #ffffff45; */
  width:var(--box-width);
  /* backdrop-filter: blur(50px) saturate(180%); */
  /* height:var(--box-height); */
  /* min-height: calc(100vh - 150px); */
  /* padding: 20px; */
  border-radius: var(--box-radius);
  /* margin: 0 20px 20px; */
  display: flex;
  /* overflow-y: scroll; */
  position: relative;
}

#left-info{
  box-sizing: border-box;
  position: sticky;
  top:0;
  padding: 40px 20px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
}
#left-info .left-info-content{
  margin: 10px 0;
  background: #ffffff75;
  backdrop-filter: blur(30px) saturate(180%);
  border-radius: 10px;
  box-shadow: 0 5px 8px 3px #00000014;
}

.navigation {
  display: flex;
  width: 70%;
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
  .navigation {
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
  color: #ffffff45;
  font-size: 12px;
}
.about a{
  /* text-decoration: underline; */
  cursor: pointer;
}

.about-text,.about a{
  padding: 2px;
  color: #ffffff67;
  transition: all .2s ease;
}
.about-text-course{
  color: #ffffff;
  padding-left: 12px;
  font-size:10px;
}
.about a:hover{
  color: #ffffff!important;
  background: #00000037;
  border-radius: 5px;
  /* text-decoration: underline; */
  cursor: pointer;
  transition: all .35s ease;
}
</style>
