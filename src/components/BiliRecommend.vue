<template>
  <div class="bili">
    <!-- <div class="bili-item" v-for="(item,index) in data" :key="index">
      <a :href="item.url"><span class="bili-content">{{ item.title }}</span></a>
    </div>-->

    <!-- <swiper :options="biliSwiperOptions" ref="mySwiper"> -->
    <!-- <swiper-slide -->
    <div class="bili-title">
      <span>B站推荐</span>
      <i :class="{ 'iconfont': true, 'icon-refresh': true, 'std-btn': true, 'btn-refreshing':refreshing}" @click="getBili()"></i>
    </div>
    <div v-for="(item, index) in data" :key="index" class="bili-slide">
      <!-- <div class="bili-item"> -->
      <a :href="getVidUrl(item)" :target="!toApp ? '_blank' : ''" class="bili-item">
        <div class="item-cover">
          <img :src="covers[index]" :alt="item.title" />
          <!-- <img :src="covers[0]" alt="" srcset="" /> -->
          <!-- <img :src="getCover(item.cover,index)" alt="" srcset="" /> -->
          <!-- <img :src="getCover(item.cover,index)" alt="" srcset="" /> -->
        </div>
        <div class="item-content">
          <span class="item-title">{{ item.title }}</span>
          <div class="item-desc">
            <div class="desc-first-line">
              <span class="desc-name">{{ item.args.up_name }}</span>
              <span class="desc-cate">
                {{ item.desc_button.text }}
                <br />
              </span>
            </div>
            <div class="desc-second-line">
              <span class="desc-plays">播放 {{ item.cover_left_text_1 }}</span>
              <span class="desc-danmakus">弹幕 {{ item.cover_left_text_2 }}</span>
              <span class="desc-length">时长 {{ item.cover_right_text }}</span>
            </div>
          </div>
        </div>
      </a>
      <!-- </div> -->
      <!-- </swiper-slide> -->
    </div>

    <div @click="addBili()" class="bili-load-more" ref="showMore">
      <i :class="{'iconfont':true,'icon-refresh btn-refreshing':loading,'icon-chevron-double-down':!loading}"></i>
      <span>加载{{loading?'中...':'更多'}}</span>
    </div>
    <!-- <div class="swiper-pagination" slot="pagination"></div> -->
    <!-- </swiper> -->
  </div>
</template>

<script>
export default {
  name: "BiliRecommend",
  data() {
    return {
      timer: "",
      cover_0: "",
      toApp: false,
      covers: [],
      index: 0,
      timer_fetch: "",
      old_length: 0,
      refreshing: false,
      loading: false,
      biliSwiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
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
    getItem(thing) {
      console.log(thing);
      return thing
    },
    getBili() {
      this.refreshing = true;
      this.$axios
        .get(this.$store.state.apiPath + "/bilibili/main")
        .then(({ data }) => {
          this.covers = [];
          this.data = data.content.data.items;
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
          data.content.data.items.forEach(element => {
            this.data.push(element);
          });
          this.getNewCover(this.old_length);
          this.loading = false;
        })
        .catch(console.error);
    },
    getCover(url, index) {
      let coverUrl = encodeURIComponent(url+'@257w_145h_1c_100q.webp');
      let base;
      this.covers[index] = require('@/assets/img/function/pic.svg');
      this.$axios
        .get(this.$store.state.apiPath + "/bilibili/get-cover?url=" + coverUrl)
        .then(({ data }) => {
          // console.log("got:" + index +" "+coverUrl);
          base = "data:image/jpg;base64," + data;
          this.covers[index] = base;
          this.$forceUpdate();
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
    scrollLoad(){
      console.log(this.$refs.showMore.offsetTop);
      if(this.$refs.showMore.offsetTop>this.scrollHeight+this.windowHeight){
        this.addBili();
      }
    }
  },
  created() {

  },
  mounted() {
    if (localStorage.bili_data) {
      this.data = JSON.parse(localStorage.bili_data);
    }
    this.timer_fetch = setTimeout(this.getBili(), 600000);
    window.addEventListener('scroll',this.scrollLoad,false);
  },
  computed: {
    scrollHeight: function() {
      return this.$store.state.pageYOffset;
    },
    windowHeight: function(){
      return this.$store.state.windowHeight;

    }
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
  /* background-color: linear-gradient(#b66969,#0080ff) ; */
  /* background-clip: border-box;
    background-attachment: fixed;
    background-origin: border-box;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover; */
  /* background-color: #000; */
  /* background-image: url(https://source.unsplash.com/random/800x600); */
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
}
.bili-slide:active {
  transform: scale(0.98);
}
.bili-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--first-assist-color);
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  color: var(--main-color);
  /* height: fit-content; */
}
.bili-content {
  /* text-shadow: 0 0 20px #00000094; */
  width: 100%;
  color: var(--main-color);
  display: flex;
  justify-content: flex-start;
  font-size: 24px;
  font-weight: 600;
}
.bili-item {
  /* border-radius: var(--radius); */
  display: flex;
  overflow: hidden;
  padding: 10px 20px;
  box-sizing: border-box;

  /* border-radius: var(--radius); */
  /* overflow: hidden; */
}
.bili-item {
  text-decoration: none;
  color: var(--elem-color);
  box-sizing: border-box;
}
.item-cover {
  background: var(--second-assist-color);
  width: 160px;
  flex: 0 0 160px;
  height: calc(160px / 16 * 9);
  /* overflow: hidden; */
  display: flex;
  align-items: center;
  z-index: 0;
  flex-shrink: 0;
  border-radius: 6px;
  overflow: hidden;
  /* justify-content: center; */
}
.item-cover > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.item-content {
  display: flex;
  flex-direction: column;
  width: 10px;
  flex: 1 0 10px;
  /* position: absolute; */
  /* bottom: 0; */
  /* background-image: linear-gradient(#00000000, #000000ee); */
  /* background-color: #00000090; */
  margin-left: 10px;
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
  font-size: 15px;
  line-height: 22px;
  height: 42px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-weight: 500;
  /*
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; */
}
.item-desc {
  font-family: ProximaNova;
  font-size: 12px;
  color: #bebebede;
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
  font-size:17px;
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
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);

  }
}

.btn-refreshing {
  animation:spinning 1s infinite;
}
.bili-load-more{
  width:100%;
  display:flex;
  justify-content:center;
  align-items:center;
  padding:10px 0;
  cursor:pointer;
  color:var(--main-color);
}
.bili-load-more:hover{
  background:var(--first-assist-color);
}
.bili-load-more:active{
  background:var(--second-assist-color);
}
</style>