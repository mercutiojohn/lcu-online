<template>
  <div class="nav">
    <div class="nav-often">
      <span class="nav-title">{{title}}</span>
      <div class="nav-content">
        <a v-for="(item,index) in sites" :key="index" :href="item.url" target="_blank">
          <div :class="'nav-block'+handleBlockNoIcon()+handleBlockNoColor()" :style="'background-color:'+item.color">
            <img :class="'nav-block-icon'+handleNoIcon()" :src="getIcon(item.icon)" alt />
            <span :class="'nav-block-title'+handleTitleNoIcon()" :style="'color:'+ifWhite(item.color)">{{item.title}}</span>
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
    noColor: Boolean
  },
  name: "Navigation",
  data() {
    return {
      // title:'',
      // sites:{},
      imgUrl: "assets/img/",
    };
  },
  methods: {
    ifWhite(color) {
      if (color == "#ffffff") {
        return "#000000";
      } else {
        return "#FFFFFF";
      }
    },
    getIcon(icon) {
      try {
        const a = require("@/assets/img/" + icon);
        return a;
      } catch (err) {
        console.log(err);
        return require("@/assets/img/pic.svg");
      }
    },
    handleNoIcon(){
      if(this.noIcon){
        return ' nav-block-no-icon'
      }else{
        return ''
      }
    },
    handleBlockNoIcon(){
      if(this.noIcon){
        return ' nav-block-small'
      }else{
        return ''
      }
    },
    handleTitleNoIcon(){
      if(this.noIcon){
        return ' nav-block-title-no-icon'
      }else{
        return ''
      }
    },
    handleBlockNoColor(){
      if(this.noColor){
        return ' nav-block-no-color'
      }else{
        return ''
      }
    }
  },
};
</script>   

<style>
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
.nav-block-icon {
  max-height: 40px;
  max-width:80px;
}
.nav-block-no-icon{
  display: none;
}
.nav-block-no-color{
  /* backdrop-filter: blur(50px) saturate(180%); */
}
.nav-block-title {
  margin-top: 10px;
}
.nav-title {
  color: #fff;
  font-size: 20px;
  text-shadow: 0 5px 10px #00000083;
  margin-bottom: 20px;
}
.nav-block-title-no-icon{
  margin-top: 0;

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