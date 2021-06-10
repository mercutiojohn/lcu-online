<template>
  <div id="searchbar">
    <transition name="fade-delay">
      <div :class="{'searchbar-wrap':true}" v-show="searchWrapDisplay">
        <div class="searchbar-mask" @click="changeWrapState($event)"></div>
        <div
          :class="{'searchbar-box':true,'searchbar-box-bg-off':!searchWrapDisplay}"
          @click.prevent.stop="searchWrapDisplay = searchWrapDisplay"
        >
          <div :class="'searchbar-container' + handleChangeBarColor()">
            <i
              :class="
                'iconfont icon-search searchbar-icon' +
                handleChangeBarIconColor()
              "
            ></i>
            <form
              target="_blank"
              autocomplete="off"
              :action="enginesList[currUrlEnginesListIndex].urls[currUrlIndex].url+returnSearchItem(enginesList[currUrlEnginesListIndex].urls[currUrlIndex])"
            >
              <input
                :class="'searchbar-input' + handleChangeBarFontColor()"
                type="text"
                ref="search"
                autocomplete="off"
                :name="enginesList[currUrlEnginesListIndex].urls[currUrlIndex].queryWord"
                :placeholder="enginesList[currUrlEnginesListIndex].urls[currUrlIndex].placeholder"
                @keyup="getResult($event)"
                @keydown.down="changeDown()"
                @keydown.up="changeUp()"
                @keydown.esc="changeEsc()"
                v-model="searchItem"
              />
            </form>
          </div>
          <!-- <ul
            id="searchbar-engines"
            class="searchbar-engines searchbar-wrap-items"
            @scroll.prevent="onScroll"
          >
            <li
              :class="{
                'searchbar-engines-item': true,
                'searchbar-engines-item-current': currUrlIndex === index,
              }"
              v-for="(item, index) in targetUrl"
              :key="index"
              @click="changeEngine(index)"
            >
              <div
                :id="index"
                :class="{
                  'searchbar-engines-item-icon': true,
                }"
              >
                <div
                  :style="'background:' + item.bg + ';width:100%;height:100%;'"
                >
                  <img :src="getIcon(item.icon)" alt="" srcset="" />
                </div>
              </div>
              <span
                :class="
                  'searchbar-engines-item-title' +
                  (currUrlIndex == index
                    ? ' searchbar-engines-item-title-active'
                    : '')
                "
                >{{ item.title }}</span
              >
            </li>
          </ul> -->
              <!-- <span :class="'searchbar-engines-item-title'">{{item.title}}</span> -->
          
          <div
            class="searchbar-suggestions searchbar-wrap-items"
            v-if="suggestions"
          >
            <ul>
              <li
                v-for="(item, index) in myData"
                :class="{
                  'searchbar-suggestions-item': true,
                  'searchbar-suggestions-item-selected':
                    index === suggestSelected,
                }"
                :key="index"
              >
                {{ item }}
              </li>
            </ul>
          </div>
          <div
            class="searchbar-engines searchbar-wrap-items" 
          >
            <div
            id="searchbar-engines"
              class="engines-categories"
              v-for="(engines, enginesListIndex) in enginesList"
              :key="enginesListIndex"
              @scroll.prevent="onScroll"
            >
              <span class="categories-list-title">{{ engines.name }}</span>
              <div class="engines-categories-list">
              <div
                :class="{
                  'searchbar-engines-item': true,
                  'searchbar-engines-item-current': currUrlIndex === index && currUrlEnginesListIndex == enginesListIndex,
                }"
                v-for="(item, index) in engines.urls"
                :key="index"
                @click="changeEngine(enginesListIndex,index)"
              >
                <div
                  :id="index"
                  :class="{
                    'searchbar-engines-item-icon': true,
                  }"
                >
                  <div
                    :style="
                      'background:' + item.bg + ';width:100%;height:100%;'
                    "
                  >
                    <img :src="getIcon(item.icon)" alt="" srcset="" />
                  </div>
                </div>
                <span
                  :class="
                    'searchbar-engines-item-title' +
                    (currUrlIndex == index
                      ? ' searchbar-engines-item-title-active'
                      : '')
                  "
                  >{{ item.title }}</span
                >
                <!-- <span :class="'searchbar-engines-item-title'">{{item.title}}</span> -->
              </div>
              </div>
            </div>
          </div>
        </div>
        

        <!-- <div class="searchbar-recommends searchbar-wrap-items" v-for="i in 100" :key="i"></div> -->
      </div>
    </transition>
    <div
      :class="'searchbar-opener' + handleChangeBarColor()"
      @click="changeWrapState($event)"
    >
      <i
        :class="
          'iconfont icon-search searchbar-icon' + handleChangeBarIconColor()
        "
      ></i>
      <form
        target="_blank"
        autocomplete="off"
        :action="enginesList[currUrlEnginesListIndex].urls[currUrlIndex].url"
      >
        <input
          :class="'searchbar-input' + handleChangeBarFontColor()"
          disabled
          type="text"
          autocomplete="off"
          :name="enginesList[currUrlEnginesListIndex].urls[currUrlIndex].queryWord"
          :placeholder="enginesList[currUrlEnginesListIndex].urls[currUrlIndex].placeholder"
        />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["bgEnable"],
  name: "SearchBar",
  data() {
    return {
      currUrlEnginesListIndex: 0,
      currUrlIndex: 0,
      searchItem: "",
      targetUrl: [
        {
          title: "必应",
          url: "https://cn.bing.com/search",
          queryWord: "q",
          placeholder: "Microsoft Bing 必应搜索",
        },
      ],
      searchWrapDisplay: false,
      suggestions: false,
      iconUrl: "",
      documentObj: null,
      myData: [],
      suggestSelected: -1,
      enginesList: [
        {
            "name": "网页搜索",
            "urls": [{
                    "title": "必应",
                    "url": "https://cn.bing.com/search",
                    "queryWord": "q",
                    "placeholder": "Microsoft Bing 必应搜索",
                    "bg": "#ffffff",
                    "icon": "bing.svg"
                }]
        }
      ],
    };
  },
  watch: {
    currUrlIndex(newUrlIndex) {
      localStorage.search_engine_index = newUrlIndex;
    },
    currUrlEnginesListIndex(newUrlEnginesListIndex) {
      localStorage.search_engines_list_index = newUrlEnginesListIndex;
    },
  },
  methods: {
    returnSearchItem(item){
      if(item.suffix){
        return this.searchItem;
      }else{
        return ""
      }
    },
    onScroll() {},
    setScroll() {
      this.documentObjs = document.getElementsByClassName("engines-categories-list"); // 获取DOM元素节点
      // 添加监听事件（不同浏览器，事件方法不一样，所以可以作判断，也可以如下偷懒）
      
      for (var i = 0;i<this.documentObjs.length;i++){
        this.documentObjs[i].addEventListener(
          "DOMMouseScroll",
          this.handlerMouserScroll,
          false
        );
        this.documentObjs[i].addEventListener(
          "mousewheel",
          this.handlerMouserScroll,
          false
        );}
    },
    handlerMouserScroll(event) {
      let detail = event.wheelDelta || event.detail;
      let moveForwardStep = -1;
      let moveBackStep = 1;
      let step = 0;
      step = detail > 0 ? moveForwardStep * 100 : moveBackStep * 100;
      this.documentObj.scrollLeft = this.documentObj.scrollLeft + step;
    },
    stopMove() {
      let m = function (e) {
        e.preventDefault();
      };
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", m, { passive: false }); //禁止页面滑动
    },
    move() {
      let m = function (e) {
        e.preventDefault();
      };
      document.body.style.overflow = ""; //出现滚动条
      document.removeEventListener("touchmove", m, { passive: true });
    },
    getIcon(icon) {
      try {
        const a = require("@/assets/img/search-engines/" + icon);
        return a;
      } catch (err) {
        console.log(err);
        return require("@/assets/img/function/pic.svg");
      }
    },
    getList() {
      var searchEngines = require("@/assets/data/searchEngines.json");
      // this.currUrlIndex = searchEngines.currUrlIndex;
      this.targetUrl = searchEngines.targetUrl;
      this.enginesList = searchEngines.enginesList;
    },
    changeWrapState(event) {
      if (this.searchWrapDisplay == true) {
        let tp = document.querySelector(".searchbar-box");
        if (tp) {
          if (!tp.contains(event.target)) {
            this.searchWrapDisplay = false;
            this.move();
          }
        }
      } else {
        this.searchWrapDisplay = true;
        this.$nextTick(() => {
          this.$refs.search.focus();
        });
        this.stopMove();
      }
    },

    handleChangeBarColor() {
      if (this.bgEnable) {
        return " searchbar-container-bgon";
      } else {
        return "";
      }
    },
    handleChangeBarFontColor() {
      if (this.bgEnable) {
        return " searchbar-input-bgon";
      } else {
        return "";
      }
    },
    handleChangeBarIconColor() {
      if (this.bgEnable) {
        return " searchbar-icon-bgon";
      } else {
        return "";
      }
    },
    suggestCallBack(queryWord) {
      window.baidu = {
        sug: function (json) {
          console.log(json);
        },
      };
    },
    changeEngine(enginesListIndex,index) {
      this.currUrlEnginesListIndex = enginesListIndex;
      this.currUrlIndex = index;
      this.$refs.search.focus();
    },
    getResult(e) {
      // 请求限制 按了上下箭头
      if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 27) {
        return;
      }
      this.$axios
        .get("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su", {
          params: {
            wd: this.searchItem,
          },
          jsonp: "cb",
        })
        .then((res) => {
          // 请求成功
          this.myData = res.data.s;
          this.suggestions = true;
          console.log(this.myData);
          this.suggestSelected = -1;
        })
        .catch((error) => {
          // 请求失败
          console.error(error.status);
        });
    },
    changeDown() {
      this.suggestSelected++;
      // 到了最后一个选项
      if (this.suggestSelected === this.myData.length) {
        this.suggestSelected = -1;
      }
      this.searchItem = this.myData[this.suggestSelected];
    },
    changeUp() {
      this.suggestSelected--;
      // 到了第一个选项
      if (this.suggestSelected === -2) {
        this.suggestSelected = this.myData.length - 1;
      }
      this.searchItem = this.myData[this.suggestSelected];
    },
    changeEsc() {
      this.searchWrapDisplay = false;
      this.move();
    },
  },
  beforeCreate() {
    console.log(this.currUrlIndex);
  },
  created() {
    console.log(this.currUrlIndex);
    this.getList();
  },
  mounted() {
    if (localStorage.search_engine_index)
      this.currUrlIndex = Number(localStorage.search_engine_index);
    if (localStorage.search_engines_list_index)
      this.currUrlEnginesListIndex = Number(localStorage.search_engines_list_index);
    // this.setScroll();
    // console.log(this.currUrlIndex);
  },
  beforeDestroy() {
    window.localStorage.setItem("search_engine_index", this.currUrlIndex);
    if (!this.documentObj) return;
    this.documentObj.removeEventListener(
      "DOMMouseScroll",
      this.handlerMouserScroll
    );
    this.documentObj.removeEventListener(
      "mousewheel",
      this.handlerMouserScroll
    );
  },
};
</script>

<style>
.fade-delay-enter-active {
    transition: opacity .15s ease;
    /* transition-delay: -500ms; */
}

.fade-delay-leave-active {
    transition: opacity .1s ease;
    transition-delay: 200ms;
}

.fade-delay-enter,
.fade-delay-leave-to {
    opacity: 0;
}
#searchbar {
  width: 100vw;
  position: sticky;
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index:10000;
}
.searchbar-opener {
  display: flex;
  width: 70vw;
  max-width: 500px;
  border-radius: 10px;
  pointer-events: auto;
  height: 40px;
  margin: 12px 0;
  background: #00000015;
  color: var(--main-color);
  transition: background-color 0.4s ease;
  backdrop-filter:blur(30px);
}

/* @media screen and (prefers-color-scheme: light) {
.searchbar-container{
  background: #00000015;
  color: #000000;
}
} */

.searchbar-opener:hover {
  background: #ffffff;
  transition: all 0.2s ease;
  /* box-shadow: 0 4px 80px 1px #00000024; */
}
.searchbar-opener:active {
  background: #ffffff;
  transition: all 0.2s ease;
}
@media screen and (prefers-color-scheme: dark) {
  .searchbar-opener {
    background: #ffffff23;
  }
  .searchbar-opener:hover {
    background: #ffffff45 !important;
    transition: all 0.2s ease;
    box-shadow: 0 4px 80px 1px #00000024;
  }
  .searchbar-opener:active {
    background: #2d2e30 !important;
    transition: all 0.2s ease;
  }
}
.searchbar-input {
  width: calc(70vw - 90px);
  max-width: calc(500px - 90px);
  height: 100%;
  background: none;
  border: none;
  cursor: text;
}
.searchbar-input::placeholder {
  color: var(--inactive-color);
}
.searchbar-icon {
  height: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--inactive-color);
}

.searchbar-wrap {
  position:absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  pointer-events: auto;
  overflow: scroll !important;
  z-index:10001;

}
.searchbar-wrap-bg-off{
  /* pointer-events:visible; */
}
.searchbar-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  /* background: #000; */
}
.searchbar-box {
  box-sizing: border-box;
  /* border: 0.5px solid #00000022; */
  margin: 12px 0;
  background: var(--elem-color);
  /* backdrop-filter: blur(50px); */
  width: 500px;
  height: auto;
  box-shadow: 0 4px 80px 1px #00000024;
  /* box-shadow: 0 2px 10px 1px #00000014; */
  border-radius: 10px;
  overflow: hidden;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all .2s cubic-bezier(0.18,-0.01, 0, 0.99);
  max-height: calc(100vh - 12px * 2);
  transition-delay: 100ms;
}
.searchbar-box-bg-off {
  max-height: 40px;
  transition-delay: 0ms;
  /* opacity: 0; */
}
.searchbar-container {
  display: flex;
  width: 70vw;
  max-width: 500px;
  height: 50px;
  pointer-events: auto;
  height: 40px;
  color: var(--main-color);
  border-bottom: 1px solid var(--main-color-opa);
  flex-shrink: 0;
}
/* @media screen and (prefers-color-scheme: dark) {
  .searchbar-container{
  color: #ffffff;
  }
} */
.searchbar-wrap-items::-webkit-scrollbar {
    display: block;
    width: 8px;
    height: 0;
    position: absolute;
    right: 0;
    transition: all .2s ease;
    cursor: pointer;

}
.searchbar-wrap-items::-webkit-scrollbar:window-inactive{
  /* display: none; */
  width: 0;
}
.searchbar-wrap-items::-webkit-scrollbar-button,
.searchbar-wrap-items::-webkit-scrollbar-corner,
.searchbar-wrap-items::-webkit-scrollbar-track {
    background-color: transparent
}

.searchbar-wrap-items::-webkit-scrollbar-button {
    background-repeat: no-repeat;
    cursor: pointer;
}

.searchbar-wrap-items::-webkit-scrollbar-button:vertical {
    background-position: 50%;
    width: 18px;
    height: 18px
}

.searchbar-wrap-items::-webkit-scrollbar-button:horizontal {
    background-position: 50%;
    width: 0;
}
.searchbar-wrap-items::-webkit-scrollbar-track {
    background: transparent;
    /* width: 100px; */
}

.searchbar-wrap-items::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 5px;
    cursor: pointer;
}

.searchbar-wrap-items::-webkit-scrollbar-thumb:hover {
    background-color: #888
}
/* 
.searchbar-wrap-items::-webkit-scrollbar-resizer {
    background-color: #ff6e00
} */
.searchbar-wrap-items::-webkit-scrollbar-button:vertical:increment {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAUUlEQVQ4T6XLMQ6AMAwEwfz/bXRIfOeQCxckK8iKYgqvfCPJLxgNjAZGA6OB0VjCcV55M/8/jkbDMv+VJbSdccHYvsYFo4HRwGhgNDAaGPdl3LNlBnofQ4+bAAAAAElFTkSuQmCC)
}

.searchbar-wrap-items::-webkit-scrollbar-button:vertical:increment:hover {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAUklEQVQ4T6XLsQ2AMAwF0ey/A1swAnt95MIFyQlyoniFT/4jyS8YDYwGRgOjgdFYwnFeeTP/P45GwzL/lSW0nXHB2L7GBaOB0cBoYDQwGhj3Zdx8sf7rjOGQqwAAAABJRU5ErkJggg==)
}

.searchbar-wrap-items::-webkit-scrollbar-button:vertical:decrement {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAVUlEQVQ4T6XMMQoAIQxEUe9/NrsFrzOSIqDxgzu7xSv8ZGySfsHowOjA6MDowOjAmPozFGpfYQw5vn2CsY5TvQtHoOGq3m+PLzA6MDowOjA6ML6nNgFW+wZ6kTk6FAAAAABJRU5ErkJggg==)
}

.searchbar-wrap-items::-webkit-scrollbar-button:vertical:decrement:hover {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAVklEQVQ4T6XMwQ3AIAwEQfrvgS5SAn0d8sMSmJXIJY95sPLRJP2C0YHRgdGB0YHRgTH1ZyjUvsIYcnz7BGMdp3oXjkDDVb3fHl9gdGB0YHRgdGB8T20CB+X+675uLU0AAAAASUVORK5CYII=)
}


.searchbar-wrap-items {
  width: 100%;
  flex-shrink: 0;
  overflow: scroll;
  max-height: 320px;
  padding-bottom: 10px;
  margin-right: 5px;
}
.searchbar-wrap-items:window-inactive {
  margin-right: 0px;
  
}
.searchbar-suggestions {
  border-top: 5px solid #92929213;
}
.engines-categories-list {
  box-sizing: border-box;
  display: flex;
  padding: 5px 0;
  overflow: scroll;
  background: var(--body-color);
  margin: 0 10px;
  border-radius: 10px;

}
.engines-categories-list::-webkit-scrollbar{
  display: none;
}
.categories-list-title{
  color: var(--main-color);
  box-sizing: border-box;
  display: block;
  padding: 10px 15px;

}
.searchbar-engines-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6px;
  border-radius: 8px;
}
.searchbar-engines-item:nth-child(1) {
  margin-left: 5px;
}
.searchbar-engines-item:hover {
  transform: scale(1.05);
  background: var(--main-color-opa);
  cursor: pointer;
  /* margin-right: 10px; */
}
.searchbar-engines-item,
.searchbar-engines-item:hover {
  transition: all 0.2s ease;
}
.searchbar-engines-item:active {
  transform: scale(0.98);
  transition: all 0.2s ease;
}
.searchbar-engines-item-current {
  background: var(--main-color-opa);
}
.searchbar-engines-item-icon {
  width: 50px;
  height: 50px;
  background: var(--main-color-opa);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 17px -5px #00000024;
}
.searchbar-engines-item-icon div {
  display: flex;
  justify-content: center;
  align-items: center;
}
.searchbar-engines-item-icon img {
  width: 90%;
  height: 90%;
}
.searchbar-engines-item-title {
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: var(--main-color);
  width: 55px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 17px;
  font-size: 13px;
  padding: 3px 0 0;
  /* word-wrap: break-word; */
}

.searchbar-engines-item-title-active {
  color: var(--main-color);
}
.searchbar-recommends {
  height: 500px;
}
.searchbar-suggestions-item {
  padding: 10px 20px;
  border-bottom: 1px solid var(--main-color-opa);
  color: var(--main-color);
}
.searchbar-suggestions-item-selected {
  background: var(--main-color-opa);
}

@media screen and (max-width: 600px) {
  .header-bar-container {
    width: 100%;
  }
  .searchbar-opener,
  .searchbar-box {
    width: calc(100% - 20px);
  }
  .searchbar-opener form,
  .searchbar-box form {
    flex: 1;
  }
  .searchbar-container {
    width: 100%;
    max-width: 100%;
  }
  .searchbar-opener form input,
  .searchbar-box form input {
    width: 100%;
  }
  #searchbar{
    display: none;
  }
}
</style>