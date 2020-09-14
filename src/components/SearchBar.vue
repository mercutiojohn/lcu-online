<template>
  <div id="searchbar">
    <transition name="fade">
      <div class="searchbar-wrap" v-show="searchWrapDisplay">
      </div>
    </transition>
    <div :class="'searchbar-container'+handleChangeBarColor()" v-on:click="changeWrapState('display')">
      <i :class="'el-icon-search searchbar-icon'+handleChangeBarIconColor()"></i>
      <form target="_blank" autocomplete="off" :action="targetUrl[currUrl].url">
        <input :class="'searchbar-input'+handleChangeBarFontColor()" type="text" autocomplete="off" :name="targetUrl[currUrl].queryWord" :placeholder="targetUrl[currUrl].title">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props:['bgEnable'],
  name: "SearchBar",
  data(){
    return{
      currUrl:1,
      targetUrl: [{
        title: "百度一下，你就知道",
        url: "http://www.baidu.com/s",
        queryWord: "wd",
      },{
        title: "秘迹搜",
        url: "https://mijisou.com/",
        queryWord: "q",
      }],
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
    },
    handleChangeBarColor(){
      if(this.bgEnable){
        return ' searchbar-container-bgon'
      }else{
        return ''
      }
    },
    handleChangeBarFontColor(){
      if(this.bgEnable){
        return ' searchbar-input-bgon'
      }else{
        return ''
      }
    },
    handleChangeBarIconColor(){
      if(this.bgEnable){
        return ' searchbar-icon-bgon'
      }else{
        return ''
      }
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
.searchbar-container-bgon{
  background: #00000015;
  /* backdrop-filter: none; */
  transition:all .5s ease;
  color: #000000;
  height:40px;

}
.searchbar-container:hover{
  background: #ffffff89;
  transition:all .2s ease;

}
.searchbar-container-bgon:hover{
  /* background: #ffffff89; */
  background: #00000026!important;
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
.searchbar-input-bgon::placeholder{
  color:#00000078;
}
.searchbar-icon{
  height:100%;
  padding:0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color:#ffffff78;
}
.searchbar-icon-bgon{
  color:#00000078;
}

.searchbar-wrap{
  width:100vw;
  height:100vh;
  position:fixed;
  top:0;
  left:0;
  backdrop-filter: blur(50px);
}
@media screen and (max-width: 600px){
  #searchbar{
    width:100%;
  }
  .searchbar-container{
    width:100%;
  }
}
</style>