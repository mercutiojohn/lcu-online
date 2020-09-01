<template>
  <div id="searchbar">
    <div class="searchbar-container">
      <i class="el-icon-search searchbar-icon"></i>
      <form target="_blank" autocomplete="off" action="http://www.baidu.com/s">
        <input class="searchbar-input" type="text" autocomplete="off" name="wd" placeholder="百度一下，你就知道" v-on:click="searchWrapDisplay = true">
      </form>
      <!-- <form :action="targetUrl.url" target="_blank" autocomplete="off">
        <input
          autocomplete="off"
          class="searchbar-input"
          type="text"
          :name="targetUrl.queryWord"
          :placeholder="targetUrl.title"
          v-on:click="searchWrapDisplay = true"
        />
      </form> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "SearchBar",
  data: {
    targetUrl: {
      title: "百度一下，你就知道",
      url: "http://www.baidu.com/s",
      queryWord: "wd",
    },
    searchWrapDisplay:false
  },
};
</script>

<style>
#searchbar{
  width:100%;
  max-width:500px;

}
.searchbar-container{
  display: flex;
  width:100%;
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
</style>