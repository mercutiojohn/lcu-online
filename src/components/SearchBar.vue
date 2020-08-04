<template>
  <div id="searchbar">
    <div class="searchbar-container">
      <i class="el-icon-search"></i>
      <form :action="targetUrl.url" target="_blank" autocomplete="off">
        <input
          autocomplete="off"
          class="searchbar-input"
          type="text"
          :name="targetUrl.queryWord"
          id
          :placeholder="targetUrl.title"
          v-on:click="searchWrapDisplay = true"
        />
      </form>
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

</style>