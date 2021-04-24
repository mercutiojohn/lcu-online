<template>
  <div class="homeworks">
    <div class="homeworks-header">
      <span class="homeworks-title">U+ 作业通知</span>
      <!-- <div class="left-info-icon-area" @click="makeGlobalDialogVisible">
        <i class="iconfont icon-user left-info-icon"></i>
      </div> -->
      <div class="left-info-icon-area" @click="changeWrapState">
        <i :class="{'iconfont':true,'icon-chevron-up':hmwkListWrapDisplay, 'icon-chevron-down':!hmwkListWrapDisplay,'left-info-icon':true} "></i>
      </div>
    </div>
    <div class="homework-expanded"  v-show="hmwkListWrapDisplay">
      <div class="homeworks-list" v-if="hmwkListDisplay">
        <a v-for="(item, key) in data" :key="key" :href="item.url">
          <div class="homework-card">
            <div class="card-title">
              <span class="homework-type">{{ item.type }}</span>
              <span class="homework-title">{{ item.title }}</span>
            </div>
            <div class="card-details">
              <span class="homework-countdown">{{ item.countdown_string }}</span>
              <span class="homework-course-name">{{ item.course_name }}</span>
            </div>
          </div>
        </a>
      </div>
      <div class="homeworks-list-placeholder" v-else>
        <lottie :options="defaultOptions" :height="200" :width="200" v-on:animCreated="handleAnimation"/>
        <!-- <div>
           
            <p>Speed: x{{animationSpeed}}</p>
            <input type="range" value="1" min="0" max="3" step="0.5"
                   v-on:change="onSpeedChange" v-model="animationSpeed">
        </div>
        <button v-on:click="stop">stop</button>
        <button v-on:click="pause">pause</button>
        <button v-on:click="play">play</button> -->
        {{error}}
      </div>
    </div>
  </div>
</template>
<script>
import Lottie from '@/components/lottie'
import * as animationData from '@/assets/img/lottie/relax.json';
const axios = require("axios");
export default {
  name: "Homeworks",
  components:{
      lottie: Lottie
  },
  props:{
    vals: Object,
  },
  data() {
    return {
      hmwkListWrapDisplay: true,
      hmwkListDisplay: false,
      login: {
        uname: "",
        pwd: "",
      },
      hmwkList: [],
      error:"U+平台升级，API失效，暂停服务",
      defaultOptions: {
        animationData: animationData,
        loop:false
      },
      animationSpeed: 0.25
    };
  },
  methods: {
    makeGlobalDialogVisible(){
      this.$emit("makeGlobalDialogVisible");
    },
    changeWrapState() {
        if (this.hmwkListWrapDisplay == true) {
          this.hmwkListWrapDisplay = false;
        } else {
          this.hmwkListWrapDisplay = true;
        }
    },
    getContent() {
      this.$jsonp
        ("http://api.mercutio.club/json_qst/"+this.login.uname+'/'+this.login.pwd, {
          output: 'jsonp'
        })
        .then((res) => {
          console.log(res);
          this.hmwkList = res.content
        })
        .catch((error)=>{
          this.hmwkListDisplay = false;
          this.error = error;
          console.log(error);
        });
    },
    handleAnimation: function (anim) {
      this.anim = anim;
    },

    stop: function () {
      this.anim.stop();
    },

    play: function () {
      this.anim.play();
    },

    pause: function () {
      this.anim.pause();
    },

    onSpeedChange: function () {
      this.anim.setSpeed(this.animationSpeed);
    }
  },
  watch:{
    vals: {
      handler(newValue,oldValue){
      console.log(newValue);
      this.login = newValue
      this.getContent();

    },
    deep:true,
    immediate:false
    }
  },
  created() {
    // this.$on("getLogin",function(res){
    //   console.log(res);
    //   this.login.uname = res.uname;
    //   this.login.pwd = res.pwd;
    //   this.getContent();
    // })
  },
  mounted() {
    // this.getContent();
  },
};
</script>
<style>
.homework-card {
  padding: 10px 20px;
  border-bottom: 1px solid var(--main-color-opa);
  /* border-radius: 10px; */
}
.homework-card:hover {
  background: #00000023;
  transition: all 0.2s ease;
}
.homeworks-list{
  border-top: 5px solid #92929213;
}
.homeworks-header {
  color: var(--main-color);
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.homeworks-title{
  flex:1;
}
.card-title {
  display: flex;
  align-items: center;
  font-size: 15px;
  margin-bottom: 2px;
  color: var(--main-color);
}
.homework-type {
  padding: 1px 4px;
  border-radius: 2px;
  background: var(--first-assist-color);
  margin-right: 5px;
}
.card-details {
  font-size: 12px;
  color: var(--main-color-assist);
}
.homework-countdown {
  font-weight: 800;
  color: var(--main-color);
}
.homeworks a {
  text-decoration: none;
  color: var(--main-color);
}
.left-info-icon{
  font-size: 22px;
}
.left-info-icon-area{
  padding: 3px;
  border-radius: 5px;
  margin: 0 0 0 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.left-info-icon-area:hover{
  background: var(--first-assist-color);
}
.left-info-icon-area:active{
  background: var(--first-assist-color);
}
.homeworks-list-placeholder{
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;
  padding: 10px;
  font-size: small;
  color: var(--inactive-color);
}
</style>