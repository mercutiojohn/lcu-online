<template>
  <div id="searchbar">
    <transition name="fade">
      <div class="searchbar-wrap" v-show="searchWrapDisplay">
      </div>
    </transition>
    <div class="searchbar-container" v-on:click="changeWrapState('display')">
      <i class="el-icon-search searchbar-icon"></i>
      <form target="_blank" autocomplete="off" action="http://www.baidu.com/s">
        <input class="searchbar-input" type="text" autocomplete="off" name="wd" placeholder="百度一下，你就知道">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data(){
    return{
      targetUrl: {
        title: "百度一下，你就知道",
        url: "http://www.baidu.com/s",
        queryWord: "wd",
      },
      searchWrapDisplay: false
    }
  },
  methods:{
    changeWrapState(item) {
        if(item=='display'){
      if (this.searchWrapDisplay == true) {
        this.searchWrapDisplay = false;
      } else {
        this.searchWrapDisplay = true;
      }}
      else if(item=='expand'){
      if (this.searchWrapDisplay == true) {
        this.searchWrapDisplay = false;
      } else {
        this.searchWrapDisplay = true;
      }}
    }
  }
};
</script>

<style>
.searchbar-container{
  display: flex;
  width:70vw;
  max-width:500px;
  height:50px;
  background: #ffffff35;
  backdrop-filter: blur(30px) saturate(180%);
  border-radius: 25px;
  transition:all .5s ease;
}
.searchbar-container:hover{
  background: #ffffff89;
  transition:all .2s ease;

}
.searchbar-input{
  width:300px;
  height:100%;
  background: none;
  color:white;
}
.searchbar-input::placeholder{
  color:#ffffff78;
}
.searchbar-icon{
  height:100%;
  padding:0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color:#ffffff78;
}
.searchbar-wrap{
  width:100vw;
  height:100vh;
  position:fixed;
  top:0;
  left:0;
  backdrop-filter: blur(50px);
}
</style>