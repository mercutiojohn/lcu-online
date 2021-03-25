<template>
  <div class="hitokoto">
    <div class="hitokoto-box">
      <span class="hitokoto-content">{{ data.hitokoto }}</span>
      <span class="hitokoto-from">——{{ data.from }}</span>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "Hitokoto",
  data() {
    return {
      data: {
        id: 5244,
        uuid: "da22aded-e58b-4b9d-8e2d-55d302ea95ed",
        hitokoto: "最困难的事，是在黑夜里找光。",
        type: "k",
        from: "Mercutio.",
        from_who: null,
        creator: "a632079",
        creator_uid: 1044,
        reviewer: 1,
        commit_from: "web",
        created_at: "1583784351",
        length: 26,
      },
      hitoKind:"k"
        // a	动画
        // b	漫画
        // c	游戏
        // d	文学
        // e	原创
        // f	来自网络
        // g	其他
        // h	影视
        // i	诗词
        // j	网易云
        // k	哲学
        // l	抖机灵
        // 其他	作为 动画 类型处理
    };
  },

  methods: {
    getHitokoto() {
      axios
        .get("https://v1.hitokoto.cn?c="+this.hitoKind)
        .then(({ data }) => {
          this.data = data;
        })
        .catch(console.error);
    },
  },
  created() {},
  mounted() {
    this.getHitokoto();
  },
};
</script>

<style>
.hitokoto-box{
  width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.hitokoto-content {
  text-shadow: 0 0 20px #00000094;
  width: 100%;
  color: #fff;
  display: flex;
  justify-content: flex-start;
  font-size: 20px;
  font-weight: 600;
}
.hitokoto-from {
    margin-top: 20px;
    width: 100%;
  color: #fff;
  display: flex;
justify-content: flex-start;
    font-size: 10px;
}
</style>