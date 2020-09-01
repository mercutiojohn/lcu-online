<template>
  <div class="header-bar-container">
    <ul class="header-bar-tablist">
      <router-link to="/">
        <li class="header-bar-tabitem">首页</li>
      </router-link>
      <router-link to="/course">
        <li class="header-bar-tabitem">学习</li>
      </router-link>
      <router-link to="/classic">
        <li class="header-bar-tabitem">经典</li>
      </router-link>
      <router-link to="/test">
        <li class="header-bar-tabitem">测试</li>
      </router-link>
    </ul>
    <SearchBar />
    <ClockBox />
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
    return {};
  },
  methods: {

  }
};
</script>

<style>
.header-bar-container {
  user-select: none;
  padding: 20px 30px 20px 30px;
  position: sticky;
  top: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index:1000;
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