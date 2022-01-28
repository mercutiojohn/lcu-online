<template>
  <div class="bilianime">
    <div class="bilianime-content">
      <ul class="tabs">
        <li
          :class="{
            tab: true,
            'tab-active': ifTabActive(item.index)
          }"
          v-for="(item, index) in tabs"
          :key="index"
          @click="changeTab(item.index)"
        >
          {{ item.name }}
        </li>
      </ul>
      <div
        class="bilianime-area"
        v-for="(tabItem, tabIndex) in data"
        :key="tabIndex"
      >
        <transition name="fade">
          <div class="bilianime-list" v-show="currTabIndex == tabIndex">
            <a
              class="bilianime-item"
              v-for="(listItem, listIndex) in tabItem"
              :key="listIndex"
              :href="listItem.url"
              target="_blank"
            >
              <img
                :src="listItem.cover"
                alt=""
                srcset=""
                class="bilianime-cover"
              />
              <div class="bilianime-details">
                <span class="bilianime-title">
                  {{ listItem.title }}
                </span>
                <span class="bilianime-stats">
                  {{ listItem.follows?listItem.follows+' ':'' }} {{ listItem.plays?listItem.plays+'播放':'' }}
                  {{ listItem.rating?listItem.rating:'' }}
                </span>
                <span class="bilianime-detail">
                  {{ listItem.pub_index?listItem.pub_index:'' }} 
                  {{ listItem.new_ep?listItem.new_ep.index_show:'' }}
                </span>
              </div>
            </a>
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
          index: "timeline",
        },
        {
          name: "番剧排行",
          index: "rankjp",
        },
        {
          name: "国创排行",
          index: "rankcn",
        },
      ],
      timer: "",
      loading: true,
      currTabIndex: "timeline",
    };
  },
  watch: {
  },
  methods: {
    ifTabActive(index){
      if(index == this.currTabIndex)
        return true
      else
        return false
    },
    changeTab(tabIndex) {
      this.currTabIndex = tabIndex;
    },
    getBiliAnimeContent(index) {
      this.$axios
        .get(this.$store.state.apiPath + "/bilibili/anime/" + index)
        .then(({ data }) => {
          // console.log(index,data);
          if (index == "timeline") {
            this.data[index] = data.content.result.latest;
          } else if (index == "rankjp") {
            this.data[index] = data.content.result.list;
          } else if (index == "rankcn") {
            this.data[index] = data.content.data.list;
          }
          this.data[index].forEach((element, id) => {
            // console.log(index,element)
            // console.log(index,id)
            this.getCover(element.cover, index, id);
          });
          this.loading = false;
          // this.$forceUpdate();
        })
        .catch(console.error);
    },
    refresh() {
      this.tabs.forEach((element) => {
        // console.log(element);
        this.getBiliAnimeContent(element.index);
      });
    },
    getCover(url, type, index) {
      let coverUrl = encodeURIComponent(url + "@99w_133h_1c_50q.webp");
      let base;
      this.data[type][
        index
      ].cover = require("@/assets/img/video-posters/bili-loading.png");
      // tthis.data[type][index].cover = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABHCAMAAAB4UkqjAAAAh1BMVEUAAADd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d0UCIZXAAAALHRSTlMAoJDx4OYL/DcGF+6+JNi4ycSIT2k6LPeWfRzTVPXPszEQrV0hpo12cEZAZFpRNIQAAAJVSURBVFjD7dbZcpswGIbhHwwSi81q8Ib33fnu//oatRIpmliDhQ/aaZ+TKInnjVgkhb4RJMhP9Fzo8PiD+vEA+JPnqS0+1dRHBJhibAzh2HNeekxP9Z8XBSMZM6SmRBYx65QeM6XsY3rKPqanLGMWqeDmOh0b/Io9+YHi3gKtdExgLznSlyjFMGnUphIMlcgY22C4DSPBxTu4IrXDe+yI6IDWbPSqGVoHoohDyip6XZVB4hFN1TgPyUaYQ5rSWQ0nZGcC6UyJukKypa4yIXX3HLLlqCdHX++HLRfS/9bbWvvHLSLNR3N6tRXdFwdxejekiYF4fDnWYa/WqSm2PqRCSy0hrbP5RxAaW8141N17tVbZ+S1fFYbWFF2+1lqg62BoBdAsqWOLroWhxTh+M8vmWuuaxp1WaWjRSn43yl35sHTLUjxiaWlqnYE4LZoJme3v13MibqepFZRL6otV5V+/Hv+xVvi+FsvZG1qh/LQ7uFXnF/HlwcEfYlDktW2r5EARUiXWc1xRWAC8tGwxsdJ9dcRnYrddMdtrjDZyAy3kXrSJ7O89u8zEZAIKxBRnFzbonWD3ZkfCrrmzP+6979nicjAnW3NZ4OS1R6GtVBa8drTek539up3NAgMvcv51WNZQitCiFBZQaqIMSrx1XrWNoWTy/w1r+hk+xjuMSVjGGC6WZ3S1xlDriqTKxzB+Ra3I4bDHne62drqmied57QR9z0D94dHnOEmvJ/pWAMm4ovL2TTcJ5cRyMlHrbkdG5c/5r82fYqt+K/iR89m2JrP9PEZyI80PsPxVT0P3FAEAAAAASUVORK5CYII=";
      this.$axios
        .get(this.$store.state.apiPath + "/bilibili/get-cover?url=" + coverUrl)
        .then(({ data }) => {
          base = "data:image/jpg;base64," + data;
          this.data[type][index].cover = base;
        })
        .catch(console.error);
      return this.data[type][index].cover;
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
  },
  created() {},
  mounted() {
    let _this = this;
    _this.refresh();
    this.timer = setInterval(() => {
      _this.refresh();
      _this.$forceUpdate();
    }, 120000);
  },
};
</script>

<style scoped>
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
  max-height: 500px;
  overflow: scroll;
  padding: 5px 20px;
  margin: 0 0 20px;
}

.bilianime-item {
  display: flex;
  width: 100%;
  /* padding: 3px 3px; */
  margin: 5px 0;
  border-radius: 5px;
  transition: all 0.2s ease;
  cursor: pointer;
}
.bilianime-item:hover {
  background: var(--first-assist-color);
}
.bilianime-item:active {
  background: var(--first-assist-color);
}
.bilianime-item a {
  text-decoration: none;
}

.bilianime-area {
  /* display: flex; */
  /* align-items: center;
  justify-content: center; */
  max-height:450px;
  overflow:scroll;
}
.bilianime-area::-webkit-scrollbar {
  display: block;
  width: 8px;
  height: 0;
  position: absolute;
  right: 0;
  transition: all 0.2s ease;
  cursor: pointer;
}
.bilianime-area::-webkit-scrollbar:window-inactive {
  /* display: none; */
  width: 0;
}
.bilianime-area::-webkit-scrollbar-button,
.bilianime-area::-webkit-scrollbar-corner,
.bilianime-area::-webkit-scrollbar-track {
  background-color: transparent;
}

.bilianime-area::-webkit-scrollbar-button {
  background-repeat: no-repeat;
  cursor: pointer;
}

.bilianime-area::-webkit-scrollbar-button:vertical {
  background-position: 50%;
  width: 18px;
  height: 18px;
}

.bilianime-area::-webkit-scrollbar-button:horizontal {
  background-position: 50%;
  width: 0;
}
.bilianim-content::-webkit-scrollbar-track {
  background: transparent;
  /* width: 100px; */
}

.bilianime-area::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.bilianime-area::-webkit-scrollbar-thumb:hover {
  background-color: #888;
}
/* 
.bilianime-list::-webkit-scrollbar-resizer {
    background-color: #ff6e00
} */
.bilianime-area::-webkit-scrollbar-button:vertical:increment {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAUUlEQVQ4T6XLMQ6AMAwEwfz/bXRIfOeQCxckK8iKYgqvfCPJLxgNjAZGA6OB0VjCcV55M/8/jkbDMv+VJbSdccHYvsYFo4HRwGhgNDAaGPdl3LNlBnofQ4+bAAAAAElFTkSuQmCC);
}

.bilianime-area::-webkit-scrollbar-button:vertical:increment:hover {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAUklEQVQ4T6XLsQ2AMAwF0ey/A1swAnt95MIFyQlyoniFT/4jyS8YDYwGRgOjgdFYwnFeeTP/P45GwzL/lSW0nXHB2L7GBaOB0cBoYDQwGhj3Zdx8sf7rjOGQqwAAAABJRU5ErkJggg==);
}

.bilianime-area::-webkit-scrollbar-button:vertical:decrement {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAVUlEQVQ4T6XMMQoAIQxEUe9/NrsFrzOSIqDxgzu7xSv8ZGySfsHowOjA6MDowOjAmPozFGpfYQw5vn2CsY5TvQtHoOGq3m+PLzA6MDowOjA6ML6nNgFW+wZ6kTk6FAAAAABJRU5ErkJggg==);
}

.bilianime-area::-webkit-scrollbar-button:vertical:decrement:hover {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAVklEQVQ4T6XMwQ3AIAwEQfrvgS5SAn0d8sMSmJXIJY95sPLRJP2C0YHRgdGB0YHRgTH1ZyjUvsIYcnz7BGMdp3oXjkDDVb3fHl9gdGB0YHRgdGB8T20CB+X+675uLU0AAAAASUVORK5CYII=);
}
.bilianime-list {
  /* position:absolute; */
}
.tabs {
  display:flex;

}
.tab{
  font-size:11px;
  padding:3px 7px;
  margin:4px 2px;
  border-radius: 15px;
  color:var(--main-color);
  cursor:pointer
}
.tab:hover{
  
}
.tab-active{
  background: var(--accent-color);
  color:#fff;
}
.bilianime-details{
  display:flex;
  flex-direction: column;
  margin-left:10px;
}
.bilianime-cover {
  border-radius: 5px;
  width: 99px;
}
.bilianime-stats,
.bilianime-detail {
  color: var(--main-color);
  font-size: 10px;
}
.bilianime-title{
  color: var(--main-color);
  /* display: flex; */
  justify-content: flex-start;
  font-size: 15px;
  display: -webkit-box; 
  -webkit-box-orient: vertical; 
  -webkit-line-clamp: 3; 
  overflow: hidden;
}
.bilianime-title-end {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: var(--inactive-color);
}
</style>