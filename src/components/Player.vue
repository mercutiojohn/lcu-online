<template>
  <div id="player">

    <div class="player-wrap">
        <div class="player-cover">
          <video
            id="myVideo"
            class="player-media video-js vjs-default-skin vjs-big-play-centered"
            x-webkit-airplay="true"
            x5-video-player-fullscreen="true"
            preload="auto"
            playsinline="true"
            webkit-playsinline
            x5-video-player-typ="h5"
          >
            <source :type="audioType" :src="audioSrc" />
          </video>
          <img class="player-cover-image" :src="cover" :alt="title" srcset="" />
      </div>
          <div class="player-info">
            <span class="player-info-title">{{ audioTitle }}</span>
            <span class="player-info-artist">{{ artist }}</span>
          </div>
          <div class="player-control-area">
            <!-- <i
        class="player-control-btn-medium iconfont icon-chevron-left"
        @click="audioChange('pre')"
      >
      </i> -->
            <div @click="audioControl" class="player-control-btn-playpause">
              <i
                v-if="audioStatus"
                class="player-control-btn-large iconfont icon-pause1"
              >
              </i>
              <i
                v-else
                class="player-control-btn-large iconfont icon-play1"
              ></i>
            </div>
            <i
              class="player-control-btn-medium iconfont icon-chevron-right"
              @click="audioChange('next')"
            ></i>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Player",
  data() {
    return {
      playerWrapDisplay: false,
      audioId: 0,
      audioSrc: "http://sk.cri.cn/887.m3u8",
      cover:
        "https://tse1-mm.cn.bing.net/th/id/OIP.Fpc8QMrHr12cQ9n_ed5iKAHaHa?pid=ImgDet&rs=1",
      audioTitle: "CRI Hit FM",
      audioType: "application/x-mpegURL",
      artist: "中央人民广播电台",
      audioStatus: "",
      mediaList: [
        {
          id: 0,
          url: "http://sk.cri.cn/887.m3u8",
          cover: "assets/img/cover.jpg",
          title: "CRI Hit FM",
          artist: "中央人民广播电台",
        },
      ],
      audioObj: "",
    };
  },
  methods: {
    getMediaSource() {
      // this.mediaList = require("@/assets/data/mediaList.json")
    },
    audioControl() {
      if (this.audioStatus == "playing") {
        this.audioObj.pause();
        this.audioStatus = "";
      } else {
        this.audioObj.play();
        this.audioStatus = "playing";
      }
    },
    audioChange(changeType) {
      let index = this.audioId;
      if (index >= 0 && index <= this.mediaList.length) {
        //上一首
        if (changeType == "pre" && index > 0) {
          index = index - 1;
        } else if (changeType == "next" && index < this.mediaList.length) {
          index = index + 1;
        } else {
          return;
        }
        this.audioId = this.mediaList[index].id;
        this.title = this.mediaList[index].title;
        this.artist = this.mediaList[index].artists[0].name;
        this.audioSrc = this.mediaList[index].src;
      }
    },
    initVideo() {
      //初始化视频方法
      this.audioObj = this.$video("myVideo", {
        //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        controls: true,
        autoplay: false
        // poster: this.cover
      });
    },
  },
  created() {
    // this.getMediaSource();
  },
  mounted() {
    this.initVideo();
  },
};
</script>

<style>
/* @keyframes bounce-in{
  0% {
    transform: scaleX(0);
  }
  30% {
    transform: scaleX(1.03);
  }
  100% {
    transform: scaleX(1);
  }
}
@keyframes bounce-out{
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
}
.fade-in-out-enter-active {
  transform-origin: left center;
  animation:bounce-in .5s ease;
}
.fade-in-out-leave-active {
  transform-origin: left center;
  animation:bounce-out .1s ease-out;
} */
:root {
  --audio-player-width: 400px;
  --audio-player-height: 60px;
  --audio-content-height: calc(var(--audio-player-height) - 6px * 2);
}
#player {
  display: flex;
}
/* .player-entry {
  width: 45px;
  height: max-content;
  min-height: var(--audio-content-width);
  height: 45px;
  background: #000;
  border-radius: 5px;
  overflow: hidden;
} */
.player-entry-cover-image {
  position: relative;
  width: 100%;
  z-index: 1000;
}
.player-wrap {
  width:100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 0 10px 10px 0;
  padding: 6px;
  /* padding-left: 15px; */
  /* background: #79797943; */
  /* backdrop-filter: blur(100px); */
  /* box-shadow: 0 5px 10px 2px #00000043; */
  transition: all .2s ease;
  /* position: fixed;
  bottom: 50px;
  left: 0;
  z-index: 1000; */
}
.player-cover {
  width: var(--audio-content-height);
  /* height: max-content; */
  /* min-height: var(--audio-content-width); */
  height: var(--audio-content-height);
  background: #000;
  border-radius: 5px;
  overflow: hidden;
  transition: all .2s ease;
  cursor: pointer;

}
.player-cover-image {
  position: relative;
  /* bottom: calc(var(--audio-content-height)); */
  width: 100%;
  z-index: 1000;

}
.player-cover:hover{
    transform: scale(1.05);
    transition: all .2s ease;
}
.player-cover:active{
    transform: scale(0.95);
    transition: all .2s ease;

}
.player-expanded-content{
    display: flex;
    align-items: center;
    justify-content: center;
}
.player-info {
  color: var(--main-color);
  /* width: var(--audio-content-width); */
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  flex: 1;
}
.player-control-area {
  width: var(--audio-content-width);
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.player-control-btn-large,
.player-control-btn-medium,
.player-control-btn-small {
  color: var(--main-color);
  border-radius: 50%;
  flex-shrink: none;
  /* background: #000; */
  transition: all 0.2s ease;
  cursor: pointer;
}

.player-control-btn-large {
  font-size: 35px !important;
}
.player-control-btn-medium {
  font-size: 35px !important;
  padding:0 1px;
  margin: 0 5px;
}
.player-control-btn-playpause {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--main-color-opa);

  border-radius: 50%;
  transition: all 0.2s ease;
}

.player-control-btn-playpause:hover,
.player-control-btn-medium:hover,
.player-control-btn-small:hover {
  background: #ffffff78;
  transform: scale(1.1);
  box-shadow: 0 5px 10px 2px #00000023;
  transition: all 0.2s ease;
}
.player-control-btn-playpause:active,
.player-control-btn-medium:active,
.player-control-btn-small:active {
  transform: scale(0.96);
  box-shadow: 0 3px 8px 1px #00000023;
}
.player-media {
    display: none!important;
    width: 0;
    height: 0;
    overflow: hidden;
  position: relative;
  top: 0;
  width: 100%;
  height: var(--audio-content-height);
}
.player-info-title {
  font-size: 15px;
  line-height: 18px;
}
.player-info-artist {
  font-size: 12px;
}
</style>