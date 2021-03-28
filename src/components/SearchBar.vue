<template>
  <div id="searchbar">
    <!-- <transition name="fade"> -->
      <div class="searchbar-wrap" v-show="searchWrapDisplay">
        <div class="searchbar-mask" @click="changeWrapState($event)"></div>
        <div class="searchbar-box" @click.prevent.stop="searchWrapDisplay = searchWrapDisplay">
          <div :class="'searchbar-container'+handleChangeBarColor()">
      <i :class="'iconfont icon-search searchbar-icon'+handleChangeBarIconColor()"></i>
      <form target="_blank" autocomplete="off" :action="targetUrl[currUrl].url">
        <input :class="'searchbar-input'+handleChangeBarFontColor()" type="text" ref="search" autofocus autocomplete="off" :name="targetUrl[currUrl].queryWord" :placeholder="targetUrl[currUrl].placeholder">
      </form>
    </div>
        <ul class="searchbar-engines srarchbar-wrap-items">
              <li class="searchbar-engines-item" v-for="(item,index) in targetUrl" :key="index" @click="changeEngine(index)">
                <div :class="'searchbar-engines-item-icon' + (currUrl==index?' searchbar-engines-item-icon-active':'')">
                  <div :style="'background:'+item.bg+';width:100%;height:100%;'">
                    <img :src="getIcon(item.icon)" alt="" srcset="">
                  </div>
                </div>
                <span :class="'searchbar-engines-item-title' + (currUrl==index?' searchbar-engines-item-title-active':'')">{{item.title}}</span>
                <!-- <span :class="'searchbar-engines-item-title'">{{item.title}}</span> -->
              </li>
        </ul></div>
        <div class="searchbar-suggestions srarchbar-wrap-items" v-if="suggestions"></div>
        <!-- <div class="searchbar-recommends srarchbar-wrap-items" v-for="i in 100" :key="i"></div> -->
        
      </div>
    <!-- </transition> -->
    <div :class="'searchbar-opener'+handleChangeBarColor()"  @click="changeWrapState($event)">
      <i :class="'iconfont icon-search searchbar-icon'+handleChangeBarIconColor()"></i>
      <form target="_blank" autocomplete="off" :action="targetUrl[currUrl].url">
        <input :class="'searchbar-input'+handleChangeBarFontColor()" disabled type="text" autocomplete="off" :name="targetUrl[currUrl].queryWord" :placeholder="targetUrl[currUrl].placeholder">
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
      // currIndex:0,
      currUrl:0,
      targetUrl: [{
        title: "必应",
        url: "https://cn.bing.com/search",
        queryWord: "q",
        placeholder: "Microsoft Bing 必应搜索"
      }],
      searchWrapDisplay: false,
      suggestions: false,
      iconUrl:''
    }
  },
  methods:{
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
      this.currUrl = searchEngines.currUrl;
      this.targetUrl = searchEngines.targetUrl;
    },
    changeWrapState(event) {
      if (this.searchWrapDisplay == true) {
        let tp = document.querySelector(".searchbar-box");
	      if (tp) {
	        if (!tp.contains(event.target)) {
	          this.searchWrapDisplay = false;
	        }
	      }
      } else {
        this.searchWrapDisplay = true;
        this.$refs.search.focus();
      }
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
    },
    suggestCallBack(queryWord){
      
      window.baidu = {
          sug: function(json) {
              console.log(json)
          }
      }
    },
    changeEngine(index){
      this.currUrl = index;
      // this.currIndex = index;
    }
  },
  created(){
    this.getList();
  }
};
</script>

<style>
#searchbar{
  width:100vw;
  position: fixed;
  display: flex;
  justify-content: center;
  top:0;
  left:0;
  pointer-events:none;
}
.searchbar-opener{
  display: flex;
  width:70vw;
  max-width:500px;
  height:50px;
  border-radius: 10px;
  pointer-events:auto;
  height:40px;
  margin-top: 10px;
  background: #00000015;
  color: var(--main-color);
  transition:all .2s ease;
}

/* @media screen and (prefers-color-scheme: light) {
.searchbar-container{
  background: #00000015;
  color: #000000;
}
} */

.searchbar-opener:hover{
  background: #ffffff;
  transition:all .2s ease;
}
.searchbar-opener:active{
  background: #ffffff;
  transition:all .2s ease;
}
@media screen and (prefers-color-scheme: dark) {
.searchbar-opener{
  background: #ffffff25;
  transition:all .2s ease
}
.searchbar-opener:hover{
  background: #00000026!important;
  transition:all .2s ease;}
.searchbar-opener:active{
  background: #00000026!important;
  transition:all .2s ease;
}
}
.searchbar-input{
  width:calc(70vw - 90px);
  max-width: calc(500px - 90px);
  height:100%;
  background: none;
  border: none;
  cursor:text;
}
.searchbar-input::placeholder{
  color:var(--inactive-color);

}
.searchbar-icon{
  height:100%;
  padding:0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color:var(--inactive-color);
}

.searchbar-wrap{
  width:100vw;
  height:100vh;
  position:fixed;
  top:0;
  left:0;
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  pointer-events:auto;
  overflow: scroll!important;
}
.searchbar-mask{
  position: absolute;
  width: 100vw;
  height: 100vh;
  /* background: #000; */
}
.searchbar-box{
  box-sizing: border-box;
  /* border: 0.5px solid #00000022; */
  margin: 10px 0;
  background: var(--elem-color);
  /* backdrop-filter: blur(50px); */
  width:500px;
  height:auto;
  box-shadow: 0 4px 80px 1px #00000024;
  border-radius: 10px;
  overflow: hidden;
  z-index: 100;
}
.searchbar-container{
  display: flex;
  width:70vw;
  max-width:500px;
  height:50px;
  pointer-events:auto;
  height:40px;
  color: var(--main-color);
  border-bottom: 1px solid #00000013;
}
/* @media screen and (prefers-color-scheme: dark) {
  .searchbar-container{
  color: #ffffff;
  }
} */
.srarchbar-wrap-items{
  width:100%;
  flex-shrink: 0;
}
.searchbar-suggestions{
  /* margin-top:90px; */
  height: 200px;
}
.searchbar-engines{
  display: flex;
  padding: 5px 0;
  overflow: scroll;
}

.searchbar-engines-item{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6px;
  border-radius: 8px;
}
.searchbar-engines-item:nth-child(1){
  margin-left: 5px;
}
.searchbar-engines-item:hover{
  transform: scale(1.05);
  background: var(--main-color-opa);
  cursor: pointer;
  /* margin-right: 10px; */
}
.searchbar-engines-item,.searchbar-engines-item:hover{
  transition: all .2s ease;
}
.searchbar-engines-item:active{
  transform: scale(.98);
  transition: all .2s ease;
}

.searchbar-engines-item-icon{
  width: 50px;
  height: 50px;
  background: var(--main-color-opa);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 20px 1px #00000024;
}
.searchbar-engines-item-icon div{
  display: flex;
  justify-content: center;
  align-items: center;
}
.searchbar-engines-item-icon img{
  width:90%;
  height:90%;
}
.searchbar-engines-item-title{
  display: flex;
  flex-direction: row;
  justify-content: center;
  color:var(--main-color);
  width: 55px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space:nowrap;
  height: 17px;
  font-size: 14px;
}
.searchbar-engines-item-title-active{
  color:var(--main-color);

}
.searchbar-recommends{
  height:500px;
}

@media screen and (max-width: 600px){
  #searchbar{
    width:100%;
  }
  .searchbar-container,.srarchbar-wrap-items{
    width:95%;
  }
}
</style>