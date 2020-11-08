<template>
  <div class="nav">
    <div class="nav-often">
      <span class="nav-title">{{ title }}</span>
      <div class="nav-content">
        <a
          v-for="(item, index) in sites"
          :key="index"
          :href="item.url"
          target="_blank"
        >
          <div
            :class="'nav-block' + handleBlockNoIcon() + handleBlockNoColor()"
            :id="'nav-block_' + title + index"
            :style="'background-color:' + item.color"
          >
            <!--
              @mouseover="blockOver(index)"
              @mousemove="blockMove(index)"
              @mouseout="blockOut(index)"
            -->
            <div :class="'nav-block-top-area' + handleTopAreaNoIcon()">
              <img
                :class="'nav-block-icon' + handleNoIcon()"
                :src="getIcon(item.icon)"
                alt
              />
            </div>
            <div :class="'nav-block-bottom-area' + handleBottomAreaNoIcon()">
              <span
                :class="'nav-block-title' + handleTitleNoIcon()"
                :style="'color:' + ifWhite(item.color)"
                >{{ item.title }}</span
              >
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    sites: Array,
    noIcon: Boolean,
    noColor: Boolean,
  },
  name: "Navigation",
  data() {
    return {
      // title:'',
      // sites:{},
      imgUrl: "assets/img/",
      flag: false,
      box: "",
      delX: 0,
      delY: 0,
    };
  },
  methods: {
    blockOver(index) {
      this.flag = true;
      //获取需要删除的距离
      console.log("#nav-block_" + this.title + index);
      this.delX =
        event.clientX - document.querySelector("#nav-block_" + this.title + index).offsetLeft;


      this.delY =
        event.clientY - document.querySelector("#nav-block_" + this.title + index).offsetTop;


      // console.log("监听事件");
    },
    blockMove(index) {
      if (this.flag) {
        //删除多余的距离 保持住按下的位置
        var x = (event.clientX - this.delX) / 10;
        console.log(event.clientX+' '+this.delX);
        var y = (event.clientY - this.delY) / 10;
        console.log(event.clientY+' '+this.delY);
        document.querySelector("#nav-block_" + this.title + index).style.transform =
          "translateX(" + x + "px)" + "translateY(" + y + "px)";
      }
      // console.log("监听事件move");
    },
    blockOut(index) {
      this.flag = false;
      document.querySelector("#nav-block_" + this.title + index).style.transform =
        "translateX(0px) translateY(0px)";
    },
    ifWhite(color) {
      if (color == "#ffffff") {
        return "#000000";
      } else {
        return "#FFFFFF";
      }
    },
    getIcon(icon) {
      try {
        const a = require("@/assets/img/content/" + icon);
        return a;
      } catch (err) {
        console.log(err);
        return require("@/assets/img/function/pic.svg");
      }
    },
    handleNoIcon() {
      if (this.noIcon) {
        return " nav-block-no-icon";
      } else {
        return "";
      }
    },
    handleBlockNoIcon() {
      if (this.noIcon) {
        return " nav-block-small";
      } else {
        return "";
      }
    },
    handleTitleNoIcon() {
      if (this.noIcon) {
        return " nav-block-title-no-icon";
      } else {
        return "";
      }
    },
    handleBottomAreaNoIcon(){
      if (this.noIcon) {
        return " nav-block-bottom-area-no-icon";
      } else {
        return "";
      }
    },
    handleTopAreaNoIcon(){
      if (this.noIcon) {
        return " nav-block-top-area-no-icon";
      } else {
        return "";
      }
    },
    handleBlockNoColor() {
      if (this.noColor) {
        return " nav-block-no-color";
      } else {
        return "";
      }
    },
  },
  created() {
    console.log("created");
    // this.delX = 0;
    // this.delY = 0;
    // this.box = document.querySelector("#nav-block"+this.currentBox);

    // this.box.onmouseout = function () {

    //   // flag = false;
    // };
    //1.获取页面元素
    //设置开关判断鼠标是在box否按下
    // var flag = false;
    //2.box绑定鼠标按下事件
    // box.onmouseover = function () {
    // };
    //3.整个文档绑定鼠标移动事件
    //4.给整个文档绑定了 鼠标抬起事件
  },
};
</script>

<style>
.nav {
  height: max-content;
}
.nav-content {
  display: flex;
  /* flex-direction: column; */
  /* width: calc((150px + 10px) * 3); */
  /* height: calc((100px + 10px) * 5); */
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: visible;
  width: max-content;
  width: 100%;
}
.nav-block {
  width: 150px;
  height: 100px;
  border-radius: 15px;
  background: #00000056;
  margin: 0 10px 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: all 0.1s ease-in;
  box-shadow: 0 2px 5px 1px #00000023;
}
.nav-block-small {
  height: 50px;
  width: max-content;
  padding: 0 10px;
}
.nav-block:hover {
  /* backdrop-filter: blur(50px) saturate(180%);
  background: #ffffff63 !important; */
  color: white !important;
  transform: scale(1.02) translateY(-5px);
  transition: all 0.3s ease-out;
  box-shadow: 0 7px 10px 1px #00000023;
}
.nav-block:active {
  /* backdrop-filter: blur(50px) saturate(180%); */
  background: #00000023 !important;
  color: white !important;
  transform: scale(1);
  transition: all 0.1s ease-out;
  box-shadow: 0 2px 5px 1px inset #00000023;
}
.nav-block-top-area{
  height:50%;
  margin-top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav-block-bottom-area{
  height:40%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav-block-bottom-area-no-icon{
  height:100%;
}
.nav-block-icon {
  max-height: 40px;
  max-width: 80px;
}
.nav-block-no-icon,.nav-block-top-area-no-icon {
  display: none;
}
.nav-block-no-color {
  /* backdrop-filter: blur(50px) saturate(180%); */
}
.nav-block-title {
  /* position: relative; */
  /* bottom: 0; */
  /* background-color: #000; */
  /* margin-top: 10px; */
  font-size: 15px;
}
.nav-title {
  color: #fff;
  font-size: 20px;
  text-shadow: 0 5px 10px #00000083;
  margin-bottom: 20px;
}
.nav-block-title-no-icon {
  position: static;
}
.nav {
  display: flex;
  /* overflow-x: scroll; */
  /* overflow-y: hidden; */
}
.nav-often {
  display: flex;
  flex-direction: column;
  /* width: calc((150px + 10px) * 3); */
  width: 100%;
  width: max-content;
  overflow: visible;
  padding-left: 10px;
}
</style>
