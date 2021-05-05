<template>
  <div :class="{'header-bar-container':true,'header-bar-container-bgon':bgEnable, 'header-bar-container-bg-no-blur':clockBoxStat&&bgEnable}">
    <ul class="header-bar-tablist"  @click="printPath()">
      <router-link to="/">
        <li :class="{'header-bar-tabitem':true,'header-bar-tabitem-bgon':bgEnable,'header-bar-tabitem-active':currTab == '/'}">首页</li>
      </router-link>
      <router-link :to="item.url" v-for="(item,index) in navs" :key="index">
        <li :class="{'header-bar-tabitem':true,'header-bar-tabitem-bgon':bgEnable,'header-bar-tabitem-active':currTab == item.url}">{{item.name}}</li>
      </router-link>
      <!-- <router-link to="/classic">
        <li :class="'header-bar-tabitem'+handleChangeFontColor()">经典</li>
      </router-link> -->

    </ul>
    <SearchBar :bgEnable="bgEnable"/>
    <div class="header-bar-right">
      <ClockBox :bgEnable="bgEnable"/>
    </div>
    
  </div>
</template>
 
<script>
import ClockBox from '@/components/ClockBox'
import SearchBar from '@/components/SearchBar'


export default {
  name: "HeaderBar",
  components: {
    ClockBox,
    SearchBar
  },
  data() {
    return {
      bgEnable:false,
      navs:[
        {
        name:"工具",
        url:"/utils"
      },
      {
        name:"视频教程",
        url:"/course"
      }]
    };
  },
  computed:{
    currTab:function(){
      return this.$route.path;
    },
    clockBoxStat:function(){
      return this.$store.state.clockBoxStat;
    }
  },
  methods: {
    printPath(){
      console.log(this.$route.path)
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      // let offsetTop = document.querySelector("body").offsetTop;
      // console.log(scrollTop);
      // console.log(offsetTop);
      console.log(this.$store.state.clockBoxStat);
      if (scrollTop) {
        this.bgEnable = true;
      } else{
        this.bgEnable = false;
      }
    },
    handleShowBg(){
      if(this.bgEnable){
        return ' header-bar-container-bgon'
      }else{
        return ''
      }
    },
    handleChangeFontColor(){
      if(this.bgEnable){
        return ' header-bar-tabitem-bgon'
      }else{
        return ''
      }
    }
  },
  
  mounted(){
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style>

.header-bar-container {
  box-sizing: border-box;
  user-select: none;
  padding: 20px 30px 20px 30px;
  position: sticky;
  top: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index:1000;
  transition: all .6s ease;
  padding: 5px 30px 5px 30px;
  /* background: linear-gradient(var(--elem-color),transparent); */
  height: 64px;
}
.header-bar-container-bgon{
  background: var(--blur-color);
  backdrop-filter: blur(40px) saturate(120%);
  transition: all .05s ease;

  box-shadow: 0 0px 10px 4px #00000010;
}
.header-bar-container-bg-no-blur{
  background: var(--elem-color)!important;
  backdrop-filter: none;
}
.header-bar-tablist {
  display: flex;
  align-items: center;
  justify-content: center;
}
.header-bar-tabitem {
  flex-shrink:0;
  width: max-content;
  /* font-size: 15px; */
  color: var(--main-color);
  margin: 0 5px;
  padding: 8px 15px;
  font-weight: 400;
  border-radius: 25px;
  transition: all 0.2s ease;
}
.header-bar-tabitem-bgon {
  text-shadow: none;

}
.header-bar-tabitem:hover {
  /* color: #000; */
  /* font-size: 20px; */
  /* box-shadow: 0 2px 10px 2px #00000023; */
  /* font-weight: 600; */
  /* background: #ffffff65; */
  background: var(--accent-color-opa);
  color: #fff;
  /* backdrop-filter: blur(30px) saturate(180%); */
  text-shadow:none;
}
.header-bar-tabitem:active,
.header-bar-tabitem-active{
  /* font-size: 20px; */
  /* box-shadow: 0 2px 10px 2px #00000023; */
  /* font-weight: 600; */
  /* padding-right: 12px;
  padding-left: 12px; */
  
  /* background: #ffffff65; */
  background: var(--accent-color)!important;
  color: #fff;

  /* backdrop-filter: blur(30px) saturate(180%); */
  transition: all 0.2s ease;
  text-shadow:none;
}
.header-bar-right{
  display: flex;
}
@media screen and (max-width: 600px){
  .header-bar-container{
    position: fixed;
    top:unset;
    bottom: 0;
    height: 64px;
    left: 0;
    background: var(--blur-color);
    backdrop-filter: blur(40px) saturate(120%);
  }
  .header-bar-tablist{
    /* display: none; */
  }
  #clockbox{
    /* display: none; */

  }
  
}
@media screen and (max-width: 1020px)and (min-width: 600px){
  .header-bar-tablist{
    width: 0;
    overflow: hidden;
  }
}
</style>