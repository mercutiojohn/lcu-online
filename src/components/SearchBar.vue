<template>
  <div id="searchbar">
    <transition name="fade">
      <div class="searchbar-wrap" v-show="searchWrapDisplay">
        <ul class="searchbar-engines srarchbar-wrap-items">
              <li class="searchbar-engines-item" v-for="(item,index) in targetUrl" :key="index" @click="changeEngine(index)">
                <div class="searchbar-engines-item-icon"></div>
                <!-- <span :class="'searchbar-engines-item-title' + (currUrl==index)?' searchbar-engines-item-title-active':''">{{item.title}}</span> -->
                <span :class="'searchbar-engines-item-title'">{{item.title}}</span>
              </li>
        </ul>
        <div class="searchbar-suggestions srarchbar-wrap-items" v-if="suggestions"></div>
        <!-- <div class="searchbar-recommends srarchbar-wrap-items" v-for="i in 100" :key="i"></div> -->
        
      </div>
    </transition>
    <div :class="'searchbar-container'+handleChangeBarColor()" v-on:click="changeWrapState('display')">
      <i :class="'el-icon-search searchbar-icon'+handleChangeBarIconColor()"></i>
      <form target="_blank" autocomplete="off" :action="targetUrl[currUrl].url">
        <input :class="'searchbar-input'+handleChangeBarFontColor()" type="text" autocomplete="off" :name="targetUrl[currUrl].queryWord" :placeholder="targetUrl[currUrl].placeholder">
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
      suggestions: false
    }
  },
  methods:{
    getList() {
      var searchEngines = require("@/assets/data/searchEngines.json");
      this.currUrl = searchEngines.currUrl;
      this.targetUrl = searchEngines.targetUrl;
    },
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
.searchbar-container{

  display: flex;
  width:70vw;
  max-width:500px;
  height:50px;
  background: #ffffff35;
  backdrop-filter: blur(30px) saturate(180%);
  border-radius: 25px;
  transition:all .2s ease;
  margin-top: 20px;
  pointer-events:auto;

}
.searchbar-container-bgon{
  background: #00000015;
  /* backdrop-filter: none; */
  transition:all .2s ease;
  color: #000000;
  height:40px;
  margin-top: 10px;

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
  width:calc(70vw - 90px);
  max-width: calc(500px - 90px);
  height:100%;
  background: none;
  color:white;
}
.searchbar-input-bgon{
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
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  pointer-events:auto;
  overflow: scroll!important;
}
.srarchbar-wrap-items{
  width:70vw;
  max-width:500px;
  /* height: 100px; */
  border-radius: 20px;
  background: #ffffff23;
  margin-bottom:10px;
  flex-shrink: 0;
}
.searchbar-suggestions{
  /* margin-top:90px; */
  height: 200px;
}
.searchbar-engines{
  display: flex;
  margin-top:90px;
  padding: 5px 0;
  overflow: scroll;
}

.searchbar-engines-item{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6px;
  border-radius: 15px;
}
.searchbar-engines-item:nth-child(1){
  margin-left: 5px;
}
.searchbar-engines-item:hover{
  transform: scale(1.05);
  background: #ffffff45;
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
  background: #ffffff56;
  border-radius: 10px;
}
.searchbar-engines-item-title{
  display: flex;
  flex-direction: row;
  justify-content: center;
  color:#ffffff78;
  width: 55px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space:nowrap;
  height: 17px;
  font-size: 14px;
}
.searchbar-engines-item-title-active{
  color:white;
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