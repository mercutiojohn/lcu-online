<template>
  <div class="weibo">
    <div class="weibo-title" :style="!expand?'border:none':''">
      <span>微博热搜</span>
      <div class="left-info-icon-area" @click="changeExpand()">
        <i
          :class="{
            iconfont: true,
            'icon-chevron-up': expand,
            'icon-chevron-down': !expand,
            'left-info-icon': true,
          }"
        ></i>
      </div>
    </div>
    <div class="weibo-list" v-if="expand">
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
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  name: "weibo",
  data() {
    return {
      expand: true,
      data: [
        {
          title: "正在加载",
          url: "",
        },
      ],
      timer: "",
      loading: true,
    };
  },
  watch: {
    expand(value) {
      if (value) localStorage.weibo_status = 1;
      else {
        localStorage.weibo_status = 0;
      }
    },
  },
  methods: {
    changeExpand() {
      if (this.expand == true) {
        this.expand = false;
      } else {
        this.expand = true;
      }
      // window.localStorage.setItem("kaoyan_status",this.expand);
    },
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
  created() {},
  mounted() {
    if (localStorage.weibo_status)
      this.expand = Number(localStorage.weibo_status);
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
  /* height: 100%; */
  flex-direction: column;
}
.weibo-title {
  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--first-assist-color);
  width: 100%;
  padding: 10px 20px;
  color: var(--main-color);
  /* height: fit-content; */
}
.expand {
  padding: 3px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  flex-grow: 0;
}

.weibo-list {
  box-sizing: border-box;
  width: 100%;
  max-height: 400px;
  overflow: scroll;
  padding: 5px 20px;
  margin: 0 0 20px;
}
.weibo-list::-webkit-scrollbar {
  display: block;
  width: 8px;
  height: 0;
  position: absolute;
  right: 0;
  transition: all 0.2s ease;
  cursor: pointer;
}
.weibo-list::-webkit-scrollbar:window-inactive {
  /* display: none; */
  width: 0;
}
.weibo-list::-webkit-scrollbar-button,
.weibo-list::-webkit-scrollbar-corner,
.weibo-list::-webkit-scrollbar-track {
  background-color: transparent;
}

.weibo-list::-webkit-scrollbar-button {
  background-repeat: no-repeat;
  cursor: pointer;
}

.weibo-list::-webkit-scrollbar-button:vertical {
  background-position: 50%;
  width: 18px;
  height: 18px;
}

.weibo-list::-webkit-scrollbar-button:horizontal {
  background-position: 50%;
  width: 0;
}
.weibo-list::-webkit-scrollbar-track {
  background: transparent;
  /* width: 100px; */
}

.weibo-list::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.weibo-list::-webkit-scrollbar-thumb:hover {
  background-color: #888;
}
/* 
.weibo-list::-webkit-scrollbar-resizer {
    background-color: #ff6e00
} */
.weibo-list::-webkit-scrollbar-button:vertical:increment {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAUUlEQVQ4T6XLMQ6AMAwEwfz/bXRIfOeQCxckK8iKYgqvfCPJLxgNjAZGA6OB0VjCcV55M/8/jkbDMv+VJbSdccHYvsYFo4HRwGhgNDAaGPdl3LNlBnofQ4+bAAAAAElFTkSuQmCC);
}

.weibo-list::-webkit-scrollbar-button:vertical:increment:hover {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAUklEQVQ4T6XLsQ2AMAwF0ey/A1swAnt95MIFyQlyoniFT/4jyS8YDYwGRgOjgdFYwnFeeTP/P45GwzL/lSW0nXHB2L7GBaOB0cBoYDQwGhj3Zdx8sf7rjOGQqwAAAABJRU5ErkJggg==);
}

.weibo-list::-webkit-scrollbar-button:vertical:decrement {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAVUlEQVQ4T6XMMQoAIQxEUe9/NrsFrzOSIqDxgzu7xSv8ZGySfsHowOjA6MDowOjAmPozFGpfYQw5vn2CsY5TvQtHoOGq3m+PLzA6MDowOjA6ML6nNgFW+wZ6kTk6FAAAAABJRU5ErkJggg==);
}

.weibo-list::-webkit-scrollbar-button:vertical:decrement:hover {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAVklEQVQ4T6XMwQ3AIAwEQfrvgS5SAn0d8sMSmJXIJY95sPLRJP2C0YHRgdGB0YHRgTH1ZyjUvsIYcnz7BGMdp3oXjkDDVb3fHl9gdGB0YHRgdGB8T20CB+X+675uLU0AAAAASUVORK5CYII=);
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

.weibo-swiper {
  width: 100%;
  height: calc(100% - 25px);
  /* flex:10 0; */
}
</style>