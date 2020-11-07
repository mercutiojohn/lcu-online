<template>
  <div class="hello-page">
    <div id="hello-background"></div>
    <div id="hello-background-mask"></div>
    <div id="hello-content">
      <div id="top-info">
        <CalendarBox />
        <div>
          {{test}}
        </div>
      </div>
      <div class="navigation">
        <Navigation v-for="(item,index) in list" :title="item.title" :sites="item.list" :key="index" :noIcon="item.noIcon" :noColor="item.noColor"> </Navigation>
        <span class="about-text-course" style="font-size:10px;margin-bottom:20px;">现处预览测试阶段，无法自定义课程</span>
      </div>
    </div>
    <div class="about">
          <span class="about-text">鲁ICP备20018544号</span>
          <a href="http://mercutio.club"><span class="about-text">莫阿白的博客</span></a>
          <!-- <a href="http://bing.com"><span class="about-text" style="font-size:10px;">壁纸来自Unsplash</span></a> -->
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
    Navigation,
  },
  data() {
    return {
      test:"你好，世界！"
    };
  },
  methods: {
    getList() {
      this.list = require("@/assets/data/navList.json");
    },
    getHitokoto(){
      axios.get('https://v1.hitokoto.cn')
      .then(({ data }) => {
        this.test = data.hitokoto
      })
      .catch(console.error)
    }
  },
  created(){
    this.getList();
  },
  mounted(){
    this.getHitokoto();
  }
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
  z-index: -2;
  background: url(https://source.unsplash.com/random/1920x1080) no-repeat fixed center/cover;
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
  background: #ffffff23;
  width: calc(100% - 20px * 2 - 20 * 2);
  /* backdrop-filter: blur(50px) saturate(180%); */
  /*height:calc(100vh - 150px);*/
  min-height: calc(100vh - 150px);
  padding: 20px;
  border-radius: 20px;
  margin: 0 20px 20px;
  display: flex;
  overflow-y: scroll;
  position: relative;
}

#top-info{
  position: sticky;
  top:0px;
}

.navigation {
  display: flex;
  width: 70%;
  /* overflow: scroll; */
  flex-direction: column;
}
@media screen and (max-width: 600px){
  #hello-content {
    flex-direction: column;
    margin: 0;
    width:calc(100% - 20px * 2);
  }
  #top-info{
  position: relative;
  display: none;
  /* top:0px; */
  }
  .navigation {
  width: 100%;
  }
}
.about{
  width:20%;
  margin: 0 auto 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
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
