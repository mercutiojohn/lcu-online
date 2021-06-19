<template>
  <div class="hello-page">
    <transition name="fade">
      <div class="back-to-top" @click="scrollToTop()" v-if="scrolling">
        <i class="iconfont icon-arrow-up"></i>
      </div>
    </transition>
    <div class="charm-intro">
      <DynamicMainContent />
    </div>
    <div class="search-tips" v-if="settings != 'full'">
      <Hitokoto />
      <!-- <div class="featured-playlists">
        <span class="playlists-title">音乐和电台</span> <span>快速链接</span>
        <div class="playlists-list">
          <div class="playlist-item"></div>
          <div class="playlist-item"></div>
          <div class="playlist-item"></div>
          <div class="playlist-item"></div>
          <div class="playlist-item"></div>
          <div class="playlist-item"></div>
        </div>
      </div> -->
    </div>
    <div
      :class="{
        'search-area': true,
        'search-area-compact': settings == 'full',
        'search-area-scroll': settings == 'scroll' || settings == 'none',
      }"
    >
      <SearchBar :bgEnable="bgEnable" />
    </div>
    <div
      :class="{
        'hello-content': true,
        'hello-content-scrolling': scrolling || settings == 'full',
        'hello-content-blur': !clockBoxStat && blurSetting,
      }"
      v-if="settings != 'none'"
    >

      <div id="left-info">
        <SideBar />
      </div>
      <div class="home-wrap">
        <top-banner />
        <div class="content-recommend">
          <BiliRecommend />
        </div>
        <Navigation
          v-for="(item, index) in list"
          :title="item.title"
          :sites="item.list"
          :key="index"
          :noIcon="item.noIcon ? true : false"
          :noColor="item.noColor ? true : false"
          :index="index"
        ></Navigation>

        <div class="about">
          <p>
            <span class="about-text"
              >背景来自
              <a href="http://unsplash.com"> Unsplash </a>
            </span>
            <span class="about-text"
              >随机一句来自
              <a href="http://hitokoto.cn"> Hitokoto </a>
            </span>
          </p>
          <p>
            <span class="about-text"
              >搜索栏上方的随机一句、壁纸等内容不代表作者观点。</span
            >
          </p>
          <p>
            <span class="about-text">鲁ICP备20018544号</span>
            <a href="http://mercutio.club">
              <span class="about-text">莫阿白的博客</span>
            </a>
            <a
              href="https://github.com/mercutiojohn/lcu-online/projects/1?fullscreen=true"
            >
              <span class="about-text" style="font-size: 10px">迭代路线</span>
            </a>
            <a href="https://github.com/mercutiojohn/lcu-online/issues">
              <span class="about-text" style="font-size: 10px">提意见</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CalendarBox from "@/components/CalendarBox";
import Navigation from "@/components/Navigation";
import Hitokoto from "@/components/Hitokoto";
import DynamicMainContent from "@/components/DynamicMainContent";
import SideBar from "@/components/SideBar";
import Homeworks from "@/components/Homeworks";
import Countdown from "@/components/Countdown";
import EmbedFrame from "@/components/EmbedFrame";
import Player from "@/components/Player";
import TopBanner from "@/components/TopBanner";
import SearchBar from "@/components/SearchBar";
import BiliRecommend from "@/components/BiliRecommend";

export default {
  name: "HelloPage",
  components: {
    CalendarBox,
    Navigation,
    Hitokoto,
    DynamicMainContent,
    Player,
    Homeworks,
    Countdown,
    EmbedFrame,
    SideBar,
    TopBanner,
    SearchBar,
    BiliRecommend,
  },
  data() {
    return {
      dialogVisible: false,
      login: {
        uname: "",
        pwd: "",
        radio: "qst",
        savePwd: "false",
      },
      labelPosition: "right",
      headerHeight: 70,
      bgEnable: false,
    };
  },
  computed: {
    scrolling: function () {
      return this.$store.state.pageYOffset;
    },
    windowHeight: function () {
      return this.$store.state.windowHeight;
    },
    clockBoxStat: function () {
      return this.$store.state.clockBoxStat;
    },
    settings: function () {
      return this.$store.state.settings.contents;
    },
    blurSetting: function () {
      return this.$store.state.settings.blur;
    },
  },
  methods: {
    scrollToTop(){
      scrollTo(0,0);
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    linktab() {
      let goUrl = this.isMobile();
      if (goUrl === 1) {
        //移动端地址
        // location = "http://127.0.0.1:8043";
        // alert("hello");
        // location = "#/mobile";
      } else {
        //PC地址
      }
    },
    isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      let goUrl = flag ? 1 : 0;
      return goUrl;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleSubmit() {
      this.$emit("getLogin", this.login);
      this.dialogVisible = false;
    },
    getList() {
      this.list = require("@/assets/data/navList.json");
    },
  },
  created() {
    this.linktab();
    this.getList();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
:root {
  --left-bar-width: 300px;
  --header-height: 75px;
}
.hello-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* margin: 10px 0 0 0; */
}
.hello-page::before {
  transition: all 0.2s ease;
}
.charm-intro {
  position: fixed;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100vh;
}
.search-area {
  position: sticky;
  top: 0;
  width: 100vw;
  margin: calc((100vh - 40px - 64px - 300px) / 3 * 1) 0
    calc((100vh - 40px - 64px - 300px) / 3 * 2);
  /* height:300px; */
  z-index: 999;
  pointer-events: none;
  transition: margin 0.2s ease;
  /* background:#00000078; */
}
.search-area-compact {
  position: fixed;
  top: 0;
  margin: 0;
}
.search-area-scroll {
  margin: calc((100vh - 85px - 64px - 20px) / 5 * 1) 0
    calc((100vh - 85px - 64px - 20px) / 5 * 4);
}
.search-tips {
  top: 150px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  transform: translateY(-50px);
  z-index: 1;
}
.featured-playlists {
  padding-top: 100px;
}
.playlists-list {
  display: flex;
}
.playlists-title {
  color: var(--main-color);
}
.playlist-item {
  width: 80px;
  height: 80px;
  background: var(--elem-color);
  border-radius: 15px;
  margin: 5px;
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

.hello-content {
  box-sizing: border-box;
  width: var(--box-width);
  display: flex;
  position: relative;
  /* max-width: 1300px; */
  background: var(--body-color);
  border-radius: 20px 20px 0 0;
  width: calc(100vw - 40px);
  margin: 0;
  padding: 30px 20px;
  /* height: 100vh; */
  /* overflow: scroll; */
  overflow: hidden;
  z-index: 2;
  transition: all 0.3s ease;
}
.hello-content-blur {
  background: var(--blur-color-solid);
  backdrop-filter: blur(50px);
}
.hello-content-scrolling {
  /* backdrop-filter: none; */
  background: var(--body-color);
  width: 100vw;
  padding: 30px 40px;
  border-radius: 0;
}
.home-wrap {
  padding-left: calc(350px + 10px);
  padding-right: 20px;
  display: flex;
  flex: 1;
  /* max-width: calc(1300px - (350px + 20px)); */
  max-width: calc(100% - (350px + 20px));
  /* overflow: scroll; */
  flex-direction: column;
  /* height:calc(100vh - 150px); */
  user-select: none;
  padding-top: 10px;
  /* height:calc(100vh - 80px); */
  /* overflow:scroll; */
}
.content-recommend {
  margin: 10px 0;
}
.about {
  /* position: fixed; */
  /* bottom: 22px; */
  /* left: 25px; */
  width: 100%;
  /* margin: 0 auto 20px; */
  /* display: flex;
  align-items: center; */
  /* flex-direction: row; */
  /* justify-content: space-evenly; */
  font-size: 12px;
}
.about a {
  /* text-decoration: underline; */
  cursor: pointer;
  color: #000;
}

.about-text,
.about a {
  color: var(--main-color);
  padding: 2px;
  transition: all 0.2s ease;
}
.about-text-course {
  color: var(--main-color);
  padding-left: 12px;
  font-size: 10px;
}
.about a:hover {
  /* color: #ffffff!important; */
  background: var(--main-color-opa);
  border-radius: 5px;
  /* text-decoration: underline; */
  cursor: pointer;
  transition: all 0.35s ease;
}
.back-to-top {
  padding: 10px;
  background: var(--elem-color);
  border-radius: 5px;
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 100000;
  color:var(--main-color);
  box-shadow: 0 1px 10px 1px #00000078;
  cursor: pointer;
  transition: all .2s ease;
}
.back-to-top:hover{
  background: var(--accent-color);
  color:#fff;
}
.back-to-top i{
  font-size: 25px!important;
}
/* Left */
#left-info {
  /* height: calc(100vh - 115px); */
  box-sizing: border-box;
  position: absolute;
  /* top: 70px; */
  padding: 0 10px 10px 10px;
  width: 350px;
  display: flex;
  flex-direction: column;
  /* align-items: stretch;
  justify-content: flex-start; */
  /* overflow-y: scroll; */
  /* overflow-x: hidden; */
  user-select: none;
}
/* #left-info .left-info-content {
  margin: 10px 0;
  background: var(--elem-color);
  border-radius: 5px;
  box-shadow: 0 2px 6px 1px #00000014;
  overflow: hidden;
  flex-shrink: 0;
}
#left-info .left-info-content .left-info-iframe {
  width: 100%;
  height: 500px;
  display: block;
} */

@media screen and (max-width: 1030px) {
  /* .hello-page::before {
    display: flex;
    align-items: center;
    justify-content: center;
    content: "暂不支持过窄宽度";
    color: #fff;
    position: fixed;
    top: calc(50% - 100px);
    left: calc(50% - 100px);
    z-index: 10000;
    background: #00000094;
    backdrop-filter: blur(50px);
    width: 200px;
    height: 200px;
    border-radius: 10px;
    box-sizing: border-box;
  } */
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
@media screen and (max-width: 600px) {
  .hello-content {
    width: calc(100vw - 20px);
    padding: 30px 10px;

    flex-direction: column;
    margin: 0;
  }
  .hello-content-scrolling {
    /* backdrop-filter: none; */
    background: var(--body-color);
    width: 100vw;
    padding: 30px 20px;
    border-radius: 0;
  }
  #left-info {
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
    padding: 0;
  }
  .about {
    /* position: absolute; */
    /* bottom: -80px; */
    /* left: 25px; */
    width: 100%;
    /* margin: 0 auto 20px; */
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: center; */
    /* flex-direction: row; */
    /* justify-content: space-evenly; */
    font-size: 12px;
  }
}
</style>
