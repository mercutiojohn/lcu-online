<template>
  <div class="homeworks">
    <div class="homeworks-header">
      <span class="homeworks-title">作业通知</span>
      <div class="left-info-icon-area" @click="makeGlobalDialogVisible">
        <i class="iconfont icon-user left-info-icon"></i>
        登录
      </div>
      <div class="left-info-icon-area" @click="changeWrapState">
        <i class="iconfont icon-chevron-down left-info-icon"></i>
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
        {{error}}
      </div>
    </div>
  </div>
</template>
<script>
const axios = require("axios");
export default {
  name: "Homeworks",
  data() {
    return {
      hmwkListWrapDisplay: true,
      login: {
        uname: "LCU2018205700",
        pwd: "gyc123456",
      },
      hmwkList: [],
      error:""
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
      axios
        .get("http://api.mercutio.club/fuck_qst/"+this.login.uname+'/'+this.login.pwd, {
          method: "GET",
          timeout: 50000,
          withCredentials: true,
          transformRequest: [
            function (data, headers) {
              return data;
            },
          ],
        })
        .then(({ data }) => {
          console.log(data);
          this.hmwkList = data.content;
          print("");
        })
        .catch((error)=>{
          this.hmwkListDisplay = false;
          this.error = error;
        });
    },
  },
  created() {
    this.getContent();
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
  width: 100%;
  justify-content: center;
  padding: 10px;
  font-size: small;
  color: var(--inactive-color);
}
</style>