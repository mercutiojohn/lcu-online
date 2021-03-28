<template>
    <div class="fanya">
      <!-- <div id="fanya-background"></div> -->
      <div class="chaoxing-box">
        <!-- <div v-for="(item,index) in chaoxingUrls" :key="index" @click="changeUrl(item.url)">
          {{ item.name }}
        </div> -->
        <iframe class="chaoxing-iframe" :src="currUrl" frameborder="0"></iframe>
      </div>
    </div>
</template>
<script>
export default {
  name: "Fanya",
  data() {
    return {
      fanyaUrl:["http://mooc1-1.chaoxing.com/visit/interaction","https://mooc2-ans.chaoxing.com/visit/interaction","http://pan-yz.chaoxing.com/"],
      chaoxingUrls:[
        {
          "name":"收藏夹",
          "url":"https://app.raindrop.io/my/0"
        },{
          "name":"笔记",
          "url":"https://flomoapp.com/mine"
        },{
          "name":"聊天",
          "url":"https://im.chaoxing.com/webim/me"
        },{
          "name":"课程",
          "url":"http://mooc1-api.chaoxing.com/work/stu-work"
        }
      ],
      currUrl: "https://app.raindrop.io/my/0",
      currIndex:0
    };
  },
  methods: {
    changeUrl(url){
      this.currUrl = url;
    }
  }
};
</script>
<style>
.fanya{
    width:100vw;
    /* height:100vh; */
    /* position: absolute; */
    top:0;
    left: 0;
    /* background: url(https://source.unsplash.com/random/1920x1080) no-repeat fixed center/cover #444; */
}
#fanya-background {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -2;
  background: url(https://source.unsplash.com/random/1920x1080) no-repeat fixed center/cover #444;
}
.chaoxing-box{
  /* position: absolute; */
  width:var(--box-width);
  z-index:100000;
  height: var(--box-height);
  overflow: hidden;
  /* padding:20px; */
  border-radius: var(--box-radius);
  margin: 0 10px 10px;
}
.chaoxing-iframe{
  width: 100%;
  height: 100%;
}
::-webkit-scrollbar{
  display: none!important;

}
</style>
