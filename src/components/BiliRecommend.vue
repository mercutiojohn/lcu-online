<template>
  <div class="bili">
    <!-- <div class="bili-item" v-for="(item,index) in data" :key="index">
      <a :href="item.url"><span class="bili-content">{{ item.title }}</span></a>
    </div>-->

    <!-- <swiper :options="biliSwiperOptions" ref="mySwiper"> -->
    <!-- <swiper-slide -->
    <div class="bili-title">
      <div class="bili-title-left">
        <div class="nav-toggle-expand" @click="changeWrapState">
          <i
            :class="{
              iconfont: true,
              'icon-chevron-up': expand,
              'icon-chevron-down': !expand,
            }"
          ></i>
        </div>
        <span @click="changeWrapState">B站推荐</span>
      </div>
      <i
        :class="{
          iconfont: true,
          'icon-refresh': true,
          'std-btn': true,
          'btn-refreshing': refreshing,
        }"
        @click="getBili()"
        v-if="expand"
      ></i>
    </div>
    <div class="bili-content" v-if="expand">
      <div
        v-for="(item, index) in data"
        :key="index"
        :id="'bili-slide-' + index"
        class="bili-slide"
        :style="getSlideBgColor(index)"
      >
        <!-- <div class="bili-item"> -->
        <a
          :href="getVidUrl(item)"
          :target="!toApp ? '_blank' : ''"
          class="bili-item"
        >
          <div class="item-cover">
            <img
              :src="covers[index]"
              :alt="item.title"
              :id="'item-cover-' + index"
            />
            <!-- <img :src="covers[0]" alt="" srcset="" /> -->
            <!-- <img :src="getCover(item.cover,index)" alt="" srcset="" /> -->
            <!-- <img :src="getCover(item.cover,index)" alt="" srcset="" /> -->
          </div>
          <div class="item-content" :style="getItemContentBgColor(index)">
            <span class="item-title" :style="getSlideTitleColor(index)">{{ item.title }}</span>
            <!--  -->
            <div class="item-desc" :style="getSlideDescColor(index)">
              <div class="desc-first-line">
                <span class="desc-name">{{ item.args.up_name }}</span>
                <span class="desc-cate">
                  {{ item.desc_button.text }}
                  <br />
                </span>
              </div>
              <div class="desc-second-line">
                <span class="desc-plays"
                  >播放 {{ item.cover_left_text_1 }}</span
                >
                <span class="desc-danmakus"
                  >弹幕 {{ item.cover_left_text_2 }}</span
                >
                <span class="desc-length"
                  >时长 {{ item.cover_right_text }}</span
                >
              </div>
            </div>
          </div>
        </a>
        <!-- </div> -->
        <!-- </swiper-slide> -->
      </div>
    </div>
    <div @click="addBili();" class="bili-load-more" ref="showMore" v-if="expand">
      <i
        :class="{
          iconfont: true,
          'icon-refresh btn-refreshing': loading,
          'icon-chevron-double-down': !loading,
        }"
      ></i>
      <span>加载{{ loading ? "中..." : "更多" }}</span>
    </div>
    <!-- <div class="swiper-pagination" slot="pagination"></div> -->
    <!-- </swiper> -->
  </div>
</template>

<script>
import ColorThief from "colorthief";
export default {
  name: "BiliRecommend",
  data() {
    return {
      expand: true,
      timer: "",
      cover_0: "",
      toApp: false,
      covers: [],
      slideColors: [],
      slideTextColors: [],
      index: 0,
      timer_fetch: "",
      old_length: 0,
      refreshing: false,
      loading: false,
      biliSwiperOptions: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        mousewheel: true,
        // autoplay: {
        //   delay: 2500,
        //   disableOnInteraction: false
        // },
        loop: true,
        direction: "vertical",
        spaceBetween: 0,
        slidesPerView: "auto",
        longSwipesRatio: 0.2,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        // keyboard: {
        //   enabled: true,
        // },
        // autoHeight: true
      },
      data: [
        {
          args: {
            aid: 803056651,
            rid: 219,
            rname: "汪星人",
            tid: 9955,
            tname: "汪星人",
            up_id: 1463519331,
            up_name: "正在加载",
          },
          can_play: 1,
          card_goto: "av",
          card_type: "small_cover_v2",
          cover:
            "http://i0.hdslb.com/bfs/archive/3878ec2eb2813527ea929fbdc213fc9f163ec908.jpg",
          cover_left_icon_1: 1,
          cover_left_icon_2: 3,
          cover_left_text_1: "12.1万",
          cover_left_text_2: "1195",
          cover_right_text: "5:01",
          desc_button: {
            event: "channel_click",
            event_v2: "channel",
            text: "正在加载",
            type: 1,
            uri: "bilibili://pegasus/channel/9955",
          },
          goto: "av",
          idx: 1620734408,
          official_icon: 16,
          param: "",
          player_args: {
            aid: 803056651,
            cid: 336604845,
            duration: 301,
            type: "av",
          },
          three_point: {
            dislike_reasons: [
              {
                id: 4,
                name: "UP主:隔壁老李的矿山日记",
              },
              {
                id: 2,
                name: "分区:汪星人",
              },
              {
                id: 3,
                name: "频道:汪星人",
              },
              {
                id: 1,
                name: "不感兴趣",
              },
            ],
            feedbacks: [
              {
                id: 1,
                name: "恐怖血腥",
              },
              {
                id: 2,
                name: "色情低俗",
              },
              {
                id: 3,
                name: "封面恶心",
              },
              {
                id: 4,
                name: "标题党/封面党",
              },
            ],
            watch_later: 1,
          },
          three_point_v2: [
            {
              title: "添加至稍后再看",
              type: "watch_later",
            },
            {
              reasons: [
                {
                  id: 1,
                  name: "恐怖血腥",
                },
                {
                  id: 2,
                  name: "色情低俗",
                },
                {
                  id: 3,
                  name: "封面恶心",
                },
                {
                  id: 4,
                  name: "标题党/封面党",
                },
              ],
              subtitle: "(选择后将优化首页此类内容)",
              title: "反馈",
              type: "feedback",
            },
            {
              reasons: [
                {
                  id: 4,
                  name: "UP主:隔壁老李的矿山日记",
                },
                {
                  id: 2,
                  name: "分区:汪星人",
                },
                {
                  id: 3,
                  name: "频道:汪星人",
                },
                {
                  id: 1,
                  name: "不感兴趣",
                },
              ],
              subtitle: "(选择后将减少相似内容推荐)",
              title: "不感兴趣",
              type: "dislike",
            },
          ],
          title: "正在加载",
          uri: "",
        },
        {
          args: {
            aid: 803056651,
            rid: 219,
            rname: "汪星人",
            tid: 9955,
            tname: "汪星人",
            up_id: 1463519331,
            up_name: "正在加载",
          },
          can_play: 1,
          card_goto: "av",
          card_type: "small_cover_v2",
          cover:
            "http://i0.hdslb.com/bfs/archive/3878ec2eb2813527ea929fbdc213fc9f163ec908.jpg",
          cover_left_icon_1: 1,
          cover_left_icon_2: 3,
          cover_left_text_1: "0",
          cover_left_text_2: "0",
          cover_right_text: "5:01",
          desc_button: {
            event: "channel_click",
            event_v2: "channel",
            text: "正在加载",
            type: 1,
            uri: "bilibili://pegasus/channel/9955",
          },
          goto: "av",
          idx: 1620734408,
          official_icon: 16,
          param: "",
          player_args: {
            aid: 803056651,
            cid: 336604845,
            duration: 301,
            type: "av",
          },
          three_point: {
            dislike_reasons: [
              {
                id: 4,
                name: "UP主:隔壁老李的矿山日记",
              },
              {
                id: 2,
                name: "分区:汪星人",
              },
              {
                id: 3,
                name: "频道:汪星人",
              },
              {
                id: 1,
                name: "不感兴趣",
              },
            ],
            feedbacks: [
              {
                id: 1,
                name: "恐怖血腥",
              },
              {
                id: 2,
                name: "色情低俗",
              },
              {
                id: 3,
                name: "封面恶心",
              },
              {
                id: 4,
                name: "标题党/封面党",
              },
            ],
            watch_later: 1,
          },
          three_point_v2: [
            {
              title: "添加至稍后再看",
              type: "watch_later",
            },
            {
              reasons: [
                {
                  id: 1,
                  name: "恐怖血腥",
                },
                {
                  id: 2,
                  name: "色情低俗",
                },
                {
                  id: 3,
                  name: "封面恶心",
                },
                {
                  id: 4,
                  name: "标题党/封面党",
                },
              ],
              subtitle: "(选择后将优化首页此类内容)",
              title: "反馈",
              type: "feedback",
            },
            {
              reasons: [
                {
                  id: 4,
                  name: "UP主:隔壁老李的矿山日记",
                },
                {
                  id: 2,
                  name: "分区:汪星人",
                },
                {
                  id: 3,
                  name: "频道:汪星人",
                },
                {
                  id: 1,
                  name: "不感兴趣",
                },
              ],
              subtitle: "(选择后将减少相似内容推荐)",
              title: "不感兴趣",
              type: "dislike",
            },
          ],
          title: "正在加载",
          uri: "",
        },
      ],
    };
  },

  methods: {
    isLight(rgb){
      return (
        0.213 * rgb[0] + 0.715 * rgb[1] + 0.072 *rgb[2] >255 / 2
      );
    },
    getSlideTitleColor(index){
      return 'color:'+(this.slideTextColors[index]?'#000000':'#ffffff')+'!important;'
    },
    getSlideDescColor(index){
      return 'color:'+(this.slideTextColors[index]?'#222222b5':'#eeeeeeb5')+'!important;'
    },
    getSlideBgColor(index){
      return 'background-color:rgb(' + this.slideColors[index] + ');'
    },
    getItemContentBgColor(index){
      return 'background-image:linear-gradient(rgba(' + this.slideColors[index] + ',0) 0%,rgba(' + this.slideColors[index] + ',.7) 60px,rgba(' + this.slideColors[index] + ',1) 100px);'
    },
    getDominantColor(index) {
      let _this = this;
      let img = document.querySelector("#item-cover-" + index);
      console.log(img);
      this.slideColors[index] = {
        // bg:[255, 255, 255],
        // text:'#000'
        bg:[0, 0, 0],
        text:false
      };
      console.log(this.slideColors[index]);
      let colorthief = new ColorThief();
      img.addEventListener("load", function (e) {
        console.log(_this);
        // _this.slideColors[index] = colorthief.getColor(img);
        let rgb = colorthief.getColor(img);
        _this.slideColors[index] = rgb;
        _this.slideTextColors[index] = (0.213 * rgb[0] + 0.715 * rgb[1] + 0.072 *rgb[2] >255 / 2);
        _this.$forceUpdate();
      });
    },
    changeWrapState() {
      if (this.expand == true) {
        this.expand = false;
      } else {
        this.expand = true;
      }
    },
    getItem(thing) {
      console.log(thing);
      return thing;
    },
    getBili() {
      this.refreshing = true;
      this.$axios
        .get(this.$store.state.apiPath + "/bilibili/main")
        .then(({ data }) => {
          this.covers = [];
          this.data = data.content.data.items;
          this.data.pop();
          this.data.pop();
          this.getAllCover();
          this.refreshing = false;
        })
        .catch(console.error);
    },
    addBili() {
      this.loading = true;
      this.old_length = this.data.length;
      this.$axios
        .get(this.$store.state.apiPath + "/bilibili/main")
        .then(({ data }) => {
          data.content.data.items.forEach((element) => {
            this.data.push(element);
          });
          this.data.pop();
          this.data.pop();
          this.getNewCover(this.old_length);
          this.loading = false;
        })
        .catch(console.error);
    },
    getCover(url, index) {
      let coverUrl = encodeURIComponent(url + "@257w_145h_1c_100q.webp");
      let base;
      this.covers[index] = require("@/assets/img/video-posters/bili-loading.png");
      // this.covers[index] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABHCAMAAAB4UkqjAAAAh1BMVEUAAADd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d0UCIZXAAAALHRSTlMAoJDx4OYL/DcGF+6+JNi4ycSIT2k6LPeWfRzTVPXPszEQrV0hpo12cEZAZFpRNIQAAAJVSURBVFjD7dbZcpswGIbhHwwSi81q8Ib33fnu//oatRIpmliDhQ/aaZ+TKInnjVgkhb4RJMhP9Fzo8PiD+vEA+JPnqS0+1dRHBJhibAzh2HNeekxP9Z8XBSMZM6SmRBYx65QeM6XsY3rKPqanLGMWqeDmOh0b/Io9+YHi3gKtdExgLznSlyjFMGnUphIMlcgY22C4DSPBxTu4IrXDe+yI6IDWbPSqGVoHoohDyip6XZVB4hFN1TgPyUaYQ5rSWQ0nZGcC6UyJukKypa4yIXX3HLLlqCdHX++HLRfS/9bbWvvHLSLNR3N6tRXdFwdxejekiYF4fDnWYa/WqSm2PqRCSy0hrbP5RxAaW8141N17tVbZ+S1fFYbWFF2+1lqg62BoBdAsqWOLroWhxTh+M8vmWuuaxp1WaWjRSn43yl35sHTLUjxiaWlqnYE4LZoJme3v13MibqepFZRL6otV5V+/Hv+xVvi+FsvZG1qh/LQ7uFXnF/HlwcEfYlDktW2r5EARUiXWc1xRWAC8tGwxsdJ9dcRnYrddMdtrjDZyAy3kXrSJ7O89u8zEZAIKxBRnFzbonWD3ZkfCrrmzP+6979nicjAnW3NZ4OS1R6GtVBa8drTek539up3NAgMvcv51WNZQitCiFBZQaqIMSrx1XrWNoWTy/w1r+hk+xjuMSVjGGC6WZ3S1xlDriqTKxzB+Ra3I4bDHne62drqmied57QR9z0D94dHnOEmvJ/pWAMm4ovL2TTcJ5cRyMlHrbkdG5c/5r82fYqt+K/iR89m2JrP9PEZyI80PsPxVT0P3FAEAAAAASUVORK5CYII=";
      this.$axios
        .get(this.$store.state.apiPath + "/bilibili/get-cover?url=" + coverUrl)
        .then(({ data }) => {
          // console.log("got:" + index +" "+coverUrl);
          base = "data:image/jpg;base64," + data;
          this.covers[index] = base;
          this.$forceUpdate();
          this.getDominantColor(index);
        })
        .catch(console.error);
      return this.covers[index];
    },
    getAllCover() {
      let _this = this;
      for (var i = 0; i < this.data.length; i++) {
        // console.log("get the " + i + " cover")
        // this.covers[i] = this.getCover(_this.data[i].cover,i);
        this.getCover(_this.data[i].cover, i);
        // this.$forceUpdate();
      }
    },
    getNewCover(index) {
      let _this = this;
      for (var i = index; i < this.data.length; i++) {
        // console.log("get the " + i + " cover")
        // this.covers[i] = this.getCover(_this.data[i].cover,i);
        this.getCover(_this.data[i].cover, i);
        // this.$forceUpdate();
      }
    },

    getVidUrl(data) {
      if (this.toApp) return data.uri;
      else return "https://www.bilibili.com/video/av" + data.args.aid;
    },
    scrollLoad() {
      // try{
      //   if((this.$refs.showMore.offsetTop+100)<(this.scrollHeight+this.windowHeight)){
      //   console.log("-------TRUE:-------"+this.$refs.showMore.offsetTop+' '+(this.scrollHeight+this.windowHeight));
      //   // this.addBili();
      // }
      // }catch(e){
      //   // console.log(e);
      // }
      // // console.log(this.$refs.showMore.offsetTop+' '+(this.scrollHeight+this.windowHeight));
    },
  },
  created() {},
  mounted() {
    if (localStorage.bili_data) {
      this.data = JSON.parse(localStorage.bili_data);
    }
    if (localStorage.bili_status)
      this.expand = Number(localStorage.bili_status);
    this.timer_fetch = setTimeout(this.getBili(), 600000);
    // window.addEventListener('scroll',this.scrollLoad,false);
  },
  computed: {
    scrollHeight: function () {
      return this.$store.state.pageYOffset;
    },
    windowHeight: function () {
      return this.$store.state.windowHeight;
    },
  },
  watch: {
    data(newVal) {
      localStorage.bili_data = JSON.stringify(newVal);
    },
    // covers(newVal) {
    //   var i = 0;
    //   newVal.forEach((element) => {
    //     window.localStorage.setItem("bili_cover_" + i, element);
    //     i++;
    //   });
    // },
    expand(value) {
      if (value) localStorage.bili_status = 1;
      else {
        localStorage.bili_status = 0;
      }
    },
  },
  beforeDestroy() {
    localStorage.bili_data = JSON.stringify(this.data);
    var i = 0;
    this.covers.forEach((element) => {
      window.localStorage.setItem("bili_cover_" + i, element);
      i++;
    });
  },
};
</script>

<style>
:root {
  /* --content-max-width: 100%; */
  --content-max-width: 100%;
  /* --content-max-height: 200px; */
  --content-max-height: 200px;
}
.bili {
  /* position: relative; */
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0;
  /* height: 100%; */
  flex-direction: column;
  width: 100%;
  /* height:200px; */
}
.swiper-container,
.swiper-wrapper,
.bili-slide,
.bili-item {
  width: 100%;
  height: 100%;
}
.bili-slide {
  transition: all 0.2s ease;
  position: relative;
  width: calc(230px - 10px);
  min-width: calc(25% - 10px);
  max-width: calc(300px - 10px);
  background: var(--elem-color);
  border-radius: 5px;
  overflow: hidden;
  margin: 5px 10px 5px 0;
  box-shadow: 0 2px 5px 1px #00000023;
}
.bili-slide:hover {
  transform: scale(1.01) translateY(-2px);
  transition: all 0.3s ease-out;
  box-shadow: 0 7px 10px 1px #00000023;
  /* filter: brightness(1.1); */
}
.bili-slide:active {
  transform: scale(0.98);
}
.bili-title-left {
  display: flex;
}
.bili-title {
  position: sticky;
  top: 100px;
  display: flex;
  justify-content: space-between;
  /* border-bottom: 1px solid var(--first-assist-color); */
  width: 100%;
  padding: 10px 0;
  font-size: 20px;
  box-sizing: border-box;
  color: var(--main-color);
  /* height: fit-content; */
}
.bili-content {
  /* text-shadow: 0 0 20px #00000094; */
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: stretch;
}

.bili-item {
  /* border-radius: var(--radius); */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  color: var(--elem-color);
}
.item-cover {
  background: var(--second-assist-color);
  width: 100%;
  flex: 0 0 100%;
  /* height: calc(200px / 16 * 9); */
  margin-bottom: -100px;
  /* overflow: hidden; */
  display: flex;
  align-items: center;
  z-index: 0;
  flex-shrink: 0;
  /* border-radius: 3px; */
  overflow: hidden;
  /* justify-content: center; */
}
.item-cover > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.item-content {
  box-sizing: border-box;
  padding: calc(13px + 90px) 13px 13px;
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1 0 100%;
  z-index: 1000;
  background-image:linear-gradient(rgba(100,100,100,0) 0%,rgba(100,100,100,.7) 60px,rgba(100,100,100,1) 100px);

  /* position: absolute; */
  /* bottom: 0; */
  /* background-image: linear-gradient(#00000000, #000000ee); */
  /* background-color: #00000090; */
  /* border-radius: 0 0 30px 30px; */
}
.item-title {
  font-family: ProximaNova;
  display: flex;
  margin: 0 0 10px 0;
  color: var(--main-color);
  text-overflow: ellipsis;
  white-space: wrap;
  display: block;
  font-size: 17px;
  line-height: 25px;
  height: 48px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-weight: 700;
  /*
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; */
}
.item-desc {
  font-family: ProximaNova;
  font-size: 12px;
  color: var(--inactive-color);
  /* z-index: 100; */
  flex-direction: column;
  display: flex;
  /* justify-content: space-between; */
}
.item-desc .desc-first-line {
  /* max-width: 50%; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item-desc .desc-second-line {
  /* max-width: 50%; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1 0;
}
.swiper-pagination {
  /* background: #000; */
  right: 10px;
  top: 50%;
  transform: translate3d(0, -50%, 0);
}
.std-btn {
  /* position:relative;
  right: 20px;
  top: 20px; */
  padding: 3px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  flex-grow: 0;
  transition: all 0.2s ease;
  font-size: 17px;
  /* height: min-content; */
}
.std-btn:hover {
  background: var(--first-assist-color);
}
.std-btn:active {
  background: var(--first-assist-color);
}
@keyframes spinning {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.btn-refreshing {
  animation: spinning 1s infinite;
}
.bili-load-more {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
  color: var(--main-color);
  border-radius: 20px;
}
.bili-load-more:hover {
  background: var(--second-assist-color);
}
.bili-load-more:active {
  background: var(--accent-color);
  color:white;
}
.content-hidden {
  height: 0;
  overflow: hidden;
}
</style>