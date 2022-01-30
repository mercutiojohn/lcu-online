<template>
  <div class="media-center">
    <div class="card-frame" v-for="(item, index) in cardList" :key="index">
      <keep-alive>
        <component v-bind:is="item.component" class="card"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Player from "@/components/Player";
import TVNoise from "@/components/arts/TVNoise";
import Television from "@/components/Television";
import BiliRecommend from "@/components/BiliRecommend";
export default {
  name: "MediaCenter",
  components: {
    Player,
    TVNoise,
    Television,
    BiliRecommend
  },
  data() {
    return {
      cardList: [
        {
          component: "Player",
        },
        {
          component: "Television",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style>
.media-center {
  margin: 0 0 5px;
  overflow: scroll;
}
.card-frame {
  margin: 10px 10px;
  background: var(--elem-color);
  /* border-radius: 5px; */
  border-radius: var(--dynamic-border-radius);
  box-shadow: 0 2px 6px 1px #00000014;
  overflow: hidden;
  flex-shrink: 0;
}
</style>