<template>
    <div class="fanya">
      <div class="fanya-top-bar">返回</div>
        <!-- <iframe class="fanya-view" src="https://mooc2-ans.chaoxing.com/visit/interaction" frameborder="0"></iframe> -->
        <!-- <iframe class="fanya-view" src="https://mooc2-ans.chaoxing.com/visit/interaction" frameborder="0"></iframe> -->
        <iframe class="fanya-view" src="http://one.lcu.edu.cn/tp_up" frameborder="0"></iframe>
    </div>
</template>
<script>
export default {
  name: "Fanya",
  data() {
    return {};
  },
  methods: {

  }
};
</script>
<style>
.fanya{
    width:100vw;
    height:100vh;
    position: fixed;
    top:0;
    left: 0;
}
.fanya-view{
    width:100vw;
    height:90%;
    background: #ffffff00;
}
.fanya-top-bar{
  height:10%;
  background: #000;
}
</style>
