<template>
  <div class="bilianime">
    <div class="bilianime-header" :style="!expand ? 'border:none' : ''">
      <span>动画推荐</span>
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
    <div class="bilianime-content" v-if="expand">
      <ul class="tabs">
        <li class="tab" v-for="(item, index) in tabs" :key="index" @click="changeTab(item.index)">
          {{ item.name }}
        </li>
      </ul>
      <div class="bilianime-area" v-for="(tabItem, tabIndex) in data" :key="tabIndex">
        <transition name="fade">
          <div class="bilianime-list" v-show="currTabIndex == tabIndex">
            {{ tabIndex }}
          <div
            class="bilianime-item"
            v-for="(listItem, listIndex) in tabItem"
            :key="listIndex"
          >
            <a :href="listItem.url" target="_blank">
              <span class="bilianime-title">
                {{ listItem.title }}
                
              </span>
            </a>
          </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  name: "bilianime",
  data() {
    return {
      expand: true,
      data: {
        timeline: [
          {
            title: "时间表",
            url: "",
          },
        ],
        rankjp: [
          {
            title: "番剧排名",
            url: "",
          },
        ],
        rankcn: [
          {
            title: "国创排行",
            url: "",
          },
        ],
      },
      tabs: [
        {
          name: "时间表",
          index:'timeline'
        },
        {
          name: "番剧排行",
          index:'rankjp'
        },
        {
          name: "国创排行",
          index:'rankcn'
        },
      ],
      timer: "",
      loading: true,
      currTabIndex:'rankcn'
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
    changeTab(tabIndex){
      this.currTabIndex = tabIndex
    },
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
        .get(this.$store.state.apiPath + "/bilianime")
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
.bilianime {
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
.bilianime-header {
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

.bilianime-content {
  box-sizing: border-box;
  width: 100%;
  max-height: 400px;
  overflow: scroll;
  padding: 5px 20px;
  margin: 0 0 20px;
}
.bilianime-content::-webkit-scrollbar {
  display: block;
  width: 8px;
  height: 0;
  position: absolute;
  right: 0;
  transition: all 0.2s ease;
  cursor: pointer;
}
.bilianime-content::-webkit-scrollbar:window-inactive {
  /* display: none; */
  width: 0;
}
.bilianime-content::-webkit-scrollbar-button,
.bilianime-content::-webkit-scrollbar-corner,
.bilianime-content::-webkit-scrollbar-track {
  background-color: transparent;
}

.bilianime-content::-webkit-scrollbar-button {
  background-repeat: no-repeat;
  cursor: pointer;
}

.bilianime-content::-webkit-scrollbar-button:vertical {
  background-position: 50%;
  width: 18px;
  height: 18px;
}

.bilianime-content::-webkit-scrollbar-button:horizontal {
  background-position: 50%;
  width: 0;
}
.bilianim-content::-webkit-scrollbar-track {
  background: transparent;
  /* width: 100px; */
}

.bilianime-content::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.bilianime-content::-webkit-scrollbar-thumb:hover {
  background-color: #888;
}
/* 
.bilianime-list::-webkit-scrollbar-resizer {
    background-color: #ff6e00
} */
.bilianime-content::-webkit-scrollbar-button:vertical:increment {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAUUlEQVQ4T6XLMQ6AMAwEwfz/bXRIfOeQCxckK8iKYgqvfCPJLxgNjAZGA6OB0VjCcV55M/8/jkbDMv+VJbSdccHYvsYFo4HRwGhgNDAaGPdl3LNlBnofQ4+bAAAAAElFTkSuQmCC);
}

.bilianime-content::-webkit-scrollbar-button:vertical:increment:hover {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAUklEQVQ4T6XLsQ2AMAwF0ey/A1swAnt95MIFyQlyoniFT/4jyS8YDYwGRgOjgdFYwnFeeTP/P45GwzL/lSW0nXHB2L7GBaOB0cBoYDQwGhj3Zdx8sf7rjOGQqwAAAABJRU5ErkJggg==);
}

.bilianime-content::-webkit-scrollbar-button:vertical:decrement {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAVUlEQVQ4T6XMMQoAIQxEUe9/NrsFrzOSIqDxgzu7xSv8ZGySfsHowOjA6MDowOjAmPozFGpfYQw5vn2CsY5TvQtHoOGq3m+PLzA6MDowOjA6ML6nNgFW+wZ6kTk6FAAAAABJRU5ErkJggg==);
}

.bilianime-content::-webkit-scrollbar-button:vertical:decrement:hover {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAVklEQVQ4T6XMwQ3AIAwEQfrvgS5SAn0d8sMSmJXIJY95sPLRJP2C0YHRgdGB0YHRgTH1ZyjUvsIYcnz7BGMdp3oXjkDDVb3fHl9gdGB0YHRgdGB8T20CB+X+675uLU0AAAAASUVORK5CYII=);
}

.bilianime-item {
  width: 100%;
  padding: 3px 3px;
  margin: 5px 0;
  border-radius: 5px;
  transition:all .2s ease;
}
.bilianime-item:hover{
  background: var(--first-assist-color);
}
.bilianime-item:active {
  background: var(--first-assist-color);
}
.bilianime-title {
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
.bilianime-title-end {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: var(--inactive-color);
}
.bilianime-item a {
  text-decoration: none;
}

.bilianime-area{
  /* display: flex; */
  /* align-items: center;
  justify-content: center; */
}
.bilianime-list{
  /* position:absolute; */
}
</style>