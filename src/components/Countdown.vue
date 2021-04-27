<template>
  <div id="countdown">

    
    <div class="countdown-header">
      <div :class="{'countdown-closed':true,'countdown-closed-hidden':expand}">
        <div class="countDown-title">{{ year }} 考研</div>
        <div class="countdown-closed-days">
          {{ days }}
        </div>
        <div id="countDown-title">天</div>
      </div>
      <div class="countdown-expand" @click="changeExpand()">
      <i
        :class="{
          iconfont: true,
          'icon-chevron-up': expand,
          'icon-chevron-down': !expand,
          'left-info-icon': true,
        }"
      ></i>
    </div>
    </div>
    <div :class="{'countdown-expanded':true,'countdown-expanded-hidden':!expand}">
      <div class="countDown-title">距离 {{ year }} 考研</div>
      <div class="countdown-days">
        {{ days }}
      </div>
      <div id="countDown-title">天</div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "Countdown",
  data() {
    return {
      year: "",
      expand: true,
    };
  },
  watch: {
    expand(value) {
      if (value) localStorage.kaoyan_status = 1;
      else {
        localStorage.kaoyan_status = 0;
      }
    },
  },
  computed: {
    days: function () {
      var today = new Date(); //当前时间
      var h = today.getHours();
      var m = today.getMinutes();
      var s = today.getSeconds();
      var stopTime = new Date("Dec 22 2021 00:00:00"); //结束时间
      var stopH = stopTime.getHours();
      var stopM = stopTime.getMinutes();
      var stopS = stopTime.getSeconds();
      var shenyu = stopTime.getTime() - today.getTime(); //倒计时毫秒数
      var shengyuD = parseInt(shenyu / (60 * 60 * 24 * 1000)); //转换为天
      var D = parseInt(shenyu) - parseInt(shengyuD * 60 * 60 * 24 * 1000); //除去天的毫秒数
      var shengyuH = parseInt(D / (60 * 60 * 1000)); //除去天的毫秒数转换成小时
      var H = D - shengyuH * 60 * 60 * 1000; //除去天、小时的毫秒数
      var shengyuM = parseInt(H / (60 * 1000)); //除去天的毫秒数转换成分钟
      var M = H - shengyuM * 60 * 1000; //除去天、小时、分的毫秒数
      var S = parseInt(
        (shenyu -
          shengyuD * 60 * 60 * 24 * 1000 -
          shengyuH * 60 * 60 * 1000 -
          shengyuM * 60 * 1000) /
          1000
      ); //除去天、小时、分的毫秒数转化为秒
      return shengyuD;
    },
  },
  methods: {
    changeExpand() {
      if (this.expand == true) {
        this.expand = false;
      } else {
        this.expand = true;
      }
      // window.localStorage.setItem("kaoyan_status",this.expand);
    },
  },
  beforeCreate() {},
  created() {
    this.timer = new Date();
  },
  mounted() {
    if (localStorage.kaoyan_status)
      this.expand = Number(localStorage.kaoyan_status);
    this.year = new Date().getFullYear();
  },
};
</script>

<style>
#countdown {
  color: var(--main-color);
  display: flex;
  flex-direction: column;
  transition: all .2s ease;
}
.countdown-days {
  font-size: 80px;
  font-family: Mitype2018-90, Mitype2018-60, Politica, Palatino, Caecilia,
    Bookerly;
}
.countdown-expand {
  /* position:relative;
  right: 20px;
  top: 20px; */
  padding: 3px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  flex-grow:0;
  /* height: min-content; */
}
.countdown-expand:hover {
  background: var(--first-assist-color);
}
.countdown-expand:active {
  background: var(--first-assist-color);
}
.countdown-header {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  /* flex: 1; */
  padding: 8px 20px;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap-reverse;
}
.countdown-closed{
  width: 100%;
  display: flex;
  flex: 1;
  align-items: center;
  transition: all .5s ease;
}
.countdown-closed-hidden{
  opacity: 0;
}
.countdown-expanded {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 0 25px;
  overflow: hidden;
  max-height: 200px;
  transition: all .3s;
}
.countdown-expanded-hidden{
  max-height: 0;
  padding: 0;
  opacity: 0;
}
.countdown-closed-days {
  font-size: 25px;
  font-family: Mitype2018-90, Politica, Mitype2018-60, Palatino, Caecilia,
    Bookerly;
  margin: 0 5px 5px;
}
</style>