<template>
  <div class="hitokoto">
    <transition name="fade">
    <div class="hitokoto-box" v-if="display&&!loading" @click="getHitokoto()">
      <span class="hitokoto-content">{{ data.hitokoto }}</span>
      <span class="hitokoto-from">——{{ data.from }}</span>
    </div>
    </transition>
  </div>
</template>

<script>

export default {
  name: "Hitokoto",
  // props:{
  //   display: {
  //     type: Boolean,
  //     default: true
  //   },
  // },
  data() {
    return {
      data: {
        id: 5244,
        uuid: "da22aded-e58b-4b9d-8e2d-55d302ea95ed",
        hitokoto: "",
        type: "k",
        from: "Mercutio",
        from_who: null,
        creator: "a632079",
        creator_uid: 1044,
        reviewer: 1,
        commit_from: "web",
        created_at: "1583784351",
        length: 26,
        
      },
      // display:true,
      loading:true,
      // hitoKind:"a&c=b&c=c&c=d&c=e&c=f&c=g&c=h&c=i&c=j&c=k"
      hitoKind:""
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
      this.loading = true;
      this.$axios
        .get("https://v1.hitokoto.cn?c="+this.hitoKind)
        .then(({ data }) => {
          this.data = data;
          this.loading = false;
        })
        .catch(console.error);
    },
  },
  computed:{
    display:function(){
      return this.$store.state.settings.showHitokoto;
    }
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
justify-content: flex-end;
    font-size: 10px;
}
</style>