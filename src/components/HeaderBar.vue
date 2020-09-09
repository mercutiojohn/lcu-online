<template>
  <div :class="'header-bar-container'+handleShowBg()">
    <ul class="header-bar-tablist">
      <router-link to="/">
        <li :class="'header-bar-tabitem'+handleChangeFontColor()">首页</li>
      </router-link>
      <router-link to="/test">
        <li :class="'header-bar-tabitem'+handleChangeFontColor()">学习</li>
      </router-link>
      <router-link to="/fanya">
        <li :class="'header-bar-tabitem'+handleChangeFontColor()">数字聊大</li>
      </router-link>
      <router-link to="/classic">
        <li :class="'header-bar-tabitem'+handleChangeFontColor()">经典</li>
      </router-link>
    </ul>
    <SearchBar :bgEnable="bgEnable"/>
    <ClockBox :bgEnable="bgEnable"/>
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
      bgEnable:false
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

}
.header-bar-container-bgon{
  background: #ffffff;
  /* backdrop-filter: blur(150px); */
  transition: all .3s ease;
  color:#000!important;
  padding: 5px 30px 5px 30px;

}
.header-bar-tablist {
  display: flex;

}
.header-bar-tabitem {
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
</style>