<template>
  <div :class="'header-bar-container'+handleShowBg()">
    <ul class="header-bar-tablist">
      <Player />
      <router-link to="/">
        <li :class="'header-bar-tabitem'+handleChangeFontColor()">首页</li>
      </router-link>
      <router-link :to="item.url" v-for="(item,index) in navs" :key="index">
        <li :class="'header-bar-tabitem'+handleChangeFontColor()">{{item.name}}</li>
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
import Player from '@/components/Player'

export default {
  name: "HeaderBar",
  components: {
    ClockBox,
    SearchBar,
    Player
  },
  data() {
    return {
      bgEnable:false,
      navs:[{
        name:"收藏夹",
        url:"/fanya"
      },
      {
        name:"网课",
        url:"/course"
      }]
    };
  },
  methods: {
    handleScroll() {
      let scrollTop =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      // let offsetTop = document.querySelector("body").offsetTop;
      console.log(scrollTop);
      // console.log(offsetTop);
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
  user-select: none;
  padding: 20px 30px 20px 30px;
  position: sticky;
  top: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index:1000;
  transition: all .3s ease;
  padding: 5px 30px 5px 30px;
}
.header-bar-container-bgon{
  background: #ffffff;
  /* background: #0000001e; */
  /* backdrop-filter: blur(150px) saturate(180%); */
  transition: all .3s ease;
  color:#000!important;
  /* color:#fff!important; */

  box-shadow: 0 0px 10px 4px #00000010;
}

.header-bar-tablist {
  display: flex;
  align-items: center;
  justify-content: center;
}
.header-bar-tabitem {
  flex-shrink:0;
  width: max-content;
  font-size: 20px;
  color: white;
  margin: 0 5px;
  padding-right: 12px;
  padding-left: 12px;
  font-weight: 400;
  border-radius: 15px;
  text-shadow: 0 5px 10px #00000083;
}
.header-bar-tabitem-bgon {
  color: black;
  text-shadow: none;

}
.header-bar-tabitem:hover {
  /* color: #000; */
  font-size: 20px;
  box-shadow: 0 2px 10px 2px #00000023;
  font-weight: 600;
  padding-right: 12px;
  padding-left: 12px;
  background: #ffffff65;
  /* backdrop-filter: blur(30px) saturate(180%); */
  transition: all 0.2s ease;
  text-shadow:none;
}
.header-bar-right{
  display: flex;
}
@media screen and (max-width: 600px){
  .header-bar-tablist{
    /* display: none; */
    width:0px;
    max-height:50px;
    overflow: hidden;
  }
  #clockbox{
    /* display: none; */
    width:0px;
    overflow: hidden;
    max-height:50px;
  }
  
}
</style>