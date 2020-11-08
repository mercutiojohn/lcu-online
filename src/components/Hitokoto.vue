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
      hitoKind:"a"
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
    background: #ffffff75;
    backdrop-filter: blur(30px) saturate(180%);
    box-shadow: 0 5px 8px 3px #00000014;
    /* height: 100px; */
    width: 250px;
    margin:30px 20px 0;
    padding: 15px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.hitokoto-content {
    width: 100%;
  color: #000;
    display: flex;
justify-content: flex-start;
    font-size: 20px;
    font-weight: 600;
}
.hitokoto-from {
    margin-top: 20px;
    width: 100%;
  color: #000;
  display: flex;
justify-content: flex-end;
    font-size: 10px;
}
</style>