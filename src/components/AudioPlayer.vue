<template>
  <div id="audio-player">
    <video
      ref="audioPlayer"
      class="player-media video-js vjs-default-skin vjs-big-play-centered"
      x-webkit-airplay="true"
      x5-video-player-fullscreen="true"
      preload="auto"
      playsinline="true"
      webkit-playsinline
      x5-video-player-typ="h5"
    ></video>
  </div>
</template>
<script>
import videojs from "video.js";
import "video.js/dist/video-js.css";
export default {
  name: "AudioPlayer",
  components: {},
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      player: null,
    };
  },
  methods: {
    initAudio() {
      this.player = videojs(
        this.$refs.audioPlayer,
        this.options,
        function onPlayerReady() {
          console.log("onPlayerReady", this);
        }
      );
      this.player.src(this.options.sources.src)
      this.$emit("sendPlayerItem",this.player);
      //初始化视频方法
      //   this.audioObj = this.$video("audio-player", {
      //     //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
      //     controls: true,
      //     autoplay: false,
      //   });
    },
  },
  created() {
    console.log("音频组件加载")
  },
  mounted() {
    this.initAudio();
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>
<style>
</style>
