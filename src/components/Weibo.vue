<template>
  <div class="weibo">
    <div class="weibo-title">
      <span>微博热搜</span>
    </div>

    <div class="weibo-item" v-for="(item, index) in data" :key="index">
      <a :href="item.url" target="_blank">
        <span class="weibo-content">
          <!-- {{ index + 1 }} -->
          {{ item.title }}
        </span>
      </a>
      <!-- <div class="weibo-item" v-for="(item, index) in data" :key="index">
      <a :href="item.url"
        ><span class="weibo-content">{{ item.title }}</span></a
      >
      </div>-->
    </div>
    <span class="weibo-content-end" v-if="!loading">到头了~</span>
  </div>
</template>

<script>
export default {
  components: {},
  name: "weibo",
  data() {
    return {
      swiperOption: {
        // autoplay: {
        //   delay: 3000,
        //   disableOnInteraction: false,
        // },
        loop: false,
        direction: "vertical",
        spaceBetween: 0,
        slidesPerView: "auto",
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        keyboard: {
          enabled: true,
        },
        // autoHeight:true
      },
      data: [
        {
          title: "正在加载",
          url: "",
        },
      ],
      timer: "",
      loading: true
    };
  },

  methods: {
    getWeibo() {
      this.$axios
        .get(this.$store.state.apiPath + "/weibo")
        .then(({ data }) => {
          console.log(data);
          this.data = data.content.data;
          // this.data.push(this.data.shift());
          this.loading = false;
          // this.$forceUpdate();
        })
        .catch(console.error);
    },
  },
  created() { },
  mounted() {
    let _this = this;
    _this.getWeibo();
    this.timer = setInterval(() => {
      _this.getWeibo();
      _this.$forceUpdate();
    }, 120000);
  },
};
</script>

<style>
.weibo {
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
  padding: 20px;
  /* height: 100%; */
  flex-direction: column;
  /* height: 300px; */
}
.weibo-item {
  width: 100%;
  padding: 3px 0;
  margin: 5px 0;
  border-radius: 5px;
}
.weibo-item:active {
  background: var(--first-assist-color);
}
.weibo-content {
  /* text-shadow: 0 0 20px #00000094; */
  /* overflow:scroll; */
  /* font-family: ProximaNova; */
  width: 100%;
  color: var(--main-color);
  display: flex;
  justify-content: flex-start;
  font-size: 15px;
  /* font-weight: 600; */
}
.weibo-content-end {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: var(--inactive-color);
}
.weibo-item a {
  text-decoration: none;
}
.weibo-title {
  border-bottom: 1px solid var(--first-assist-color);
  width: 100%;
  padding: 0 0 10px 0;
  color: var(--main-color);
  /* height: fit-content; */
}
.weibo-swiper {
  width: 100%;
  height: calc(100% - 25px);
  /* flex:10 0; */
}
</style>