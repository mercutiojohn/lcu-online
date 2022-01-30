<template>
  <div id="side-bar">
    <div class="side-bar-content" v-if="settings.showDida">
      <EmbedFrame
        url="https://www.dida365.com/webapp/#q/all/today"
        title="滴答清单"
        height="500"
        :expand="settings.expand.dida"
        @expandUpdate="updateExpand"
      />
    </div>
    <div class="side-bar-content" v-for="(item, index) in list" :key="index">
      <div class="homeworks-header" v-if="item.header">
        <span class="homeworks-title">{{item.title}}</span>
        <!-- <div class="left-info-icon-area" @click="makeGlobalDialogVisible">
        <i class="iconfont icon-user left-info-icon"></i>
      </div> -->
        <div class="left-info-icon-area" @click="changeWrapState(index)">
          <i
            :class="{
              iconfont: true,
              'icon-chevron-up': item.expand||item.header,
              'icon-chevron-down': (!item.expand||!item.header),
              'left-info-icon': true,
            }"
          ></i>
        </div>
      </div>
      <keep-alive>
        <transition name="fade">
        
        <component v-bind:is="item.component" class="card" v-show="item.expand||(!item.header)"></component>
        </transition>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Homeworks from "@/components/Homeworks";
import Countdown from "@/components/Countdown";
import EmbedFrame from "@/components/EmbedFrame";
import Weibo from "@/components/cards/Weibo";
import Weather from "@/components/cards/Weather";
import BiliRecommend from "@/components/BiliRecommend";
import BiliAnime from "@/components/cards/BiliAnime";
import NetEase from "@/components/cards/NetEase";
export default {
  name: "SideBar",
  components: {
    Homeworks,
    Countdown,
    EmbedFrame,
    Weibo,
    Weather,
    BiliRecommend,
    BiliAnime,
    NetEase,
  },
  data() {
    return {
      list: [
        // {
        //   component:'EmbedFrame'
        // },
        // {
        //   component: "Countdown",
        // },
        {
          component: "Weather",
          title: "天气",
          header: false,
          expand:true
        },
        // {
        //   component: "Weibo",
        // },
        {
          component: "NetEase",
          title: "我的歌单",
          header: true,
          expand:true
        },
        {
          component: "BiliAnime",
          title: "番剧推荐",
          header: true,
          expand:true
        },
        
      ],

    };
  },
  computed: {
    settings: function () {
      return this.$store.state.settings.sideBar;
    },
  },
  watch: {
  },
  methods: {
    updateExpand() {
      console.log("hello");
      this.$store.commit("dida");
    },
    changeWrapState(index) {

      if (this.list[index].expand == true) {
        this.list[index].expand = false;
      } else {
        this.list[index].expand = true;
      }
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style>
#side-bar {
  width: 100%;
  height: 100%;
  /* height: calc(100vh - 115px); */
  box-sizing: border-box;
  /* position: fixed; */
  /* bottom: 50px; */
  /* padding: 0 10px 80px 10px; */
  /* width: 350px; */
  flex: 1;
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
  border-radius: var(--dynamic-border-radius);
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
.homeworks-header {
  color: var(--main-color);
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--first-assist-color);
}
.left-info-icon{
  font-size: 22px;
}
.left-info-icon-area{
  padding: 3px;
  border-radius: 5px;
  margin: 0 0 0 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.left-info-icon-area:hover{
  background: var(--first-assist-color);
}
.left-info-icon-area:active{
  background: var(--first-assist-color);
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
    padding: 0;
  }
}
</style>