<template>
    <div class="fanya">
      <div class="fanya-top-bar"></div>
        <!-- <iframe class="fanya-view" src="https://mooc2-ans.chaoxing.com/visit/interaction" frameborder="0"></iframe> -->
        <iframe class="fanya-view" :src="currUrl" frameborder="0"></iframe>
        <!-- <iframe class="fanya-view" src="http://one.lcu.edu.cn/tp_up" frameborder="0"></iframe> -->
    </div>
</template>
<script>
export default {
  name: "Fanya",
  data() {
    return {
      fanyaUrl:["http://mooc1-1.chaoxing.com/visit/interaction","https://mooc2-ans.chaoxing.com/visit/interaction"],
      currUrl: "http://mooc1-1.chaoxing.com/visit/interaction",
      currIndex:0
    };
  },
  methods: {
    getUrl(){
      this.currUrl = this.fanyaUrl[currIndex];
      return this.fanyaUrl[currIndex];
    }
  }
};
</script>
<style>
.fanya{
    width:100vw;
    height:100vh;
    position: absolute;
    top:0;
    left: 0;
}
.fanya-view{
    width:100vw;
    /* height:90%; */
    height:calc(100vh - 80px + 40px);
    /* background: #ffffff00; */
    /* background: #f2f4f7; */
}
.fanya-top-bar{
  height:80px;
  /* background: #f2f4f7; */
}
::-webkit-scrollbar{
  display: none!important;

}
</style>
