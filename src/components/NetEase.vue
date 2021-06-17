<template>
  <div class="netease">
    <div class="netease-list">
      <!-- <div class="item" v-for="(item, index) in songs" :key="index">
            <p>{{item.name}}</p>
            <p><span v-for="(item2, index) in item.artists" :key="index">{{item2.name}}</span></p>
            <p>{{item.album.name}}</p>
            <hr>
        </div> -->
      网易云音乐
      <div class="login">
        {{ message }}
        <button @click="getMyPlaylists()">获取歌单</button>
        <button @click="getLoginStatus()">获取状态信息</button>
        <img :src="this.loginQR" alt="" srcset="" />
        <p>{{ loginStatus }}</p>
        <p>{{ loginInfo }}</p>
        <p>{{playlists}}</p>
      </div>
      <!-- <div class="item" v-for="(item, index) in albums" :key="index">
            <img :src="item.picUrl+'?param=140y140'" alt="" srcset="">
            <p>{{item.name}}</p>
            <p><span v-for="(item2, index) in item.artists" :key="index">{{item2.name}}</span></p>
            <hr>
        </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "netease",
  components: {},
  data() {
    return {
      base_url: "http://119.3.239.13:3000",
      songs: "",
      albums: "",
      loginQR: "",
      timer: "",
      key: "",
      loginStatus: "",
      loginInfo: "",
      message: "登录",
      playlists:''
    };
  },
  computed: {},
  watch: {},
  methods: {
    async login() {
      let timer;
      let timestamp = Date.now();
      this.getLoginStatus();
      const res = await this.$axios({
        url: `${this.base_url}/login/qr/key?timerstamp=${Date.now()}`,
        withCredentials: true, //关键
      });
      const key = res.data.data.unikey;
      const res2 = await this.$axios({
        url: `${
          this.base_url
        }/login/qr/create?key=${key}&qrimg=true&timerstamp=${Date.now()}`,
        withCredentials: true, //关键
      });
      this.message = "请扫描二维码";

      this.loginQR = res2.data.data.qrimg;

      timer = setInterval(async () => {
        const statusRes = await this.checkStatus(key);
        if (statusRes.code === 800) {
          clearInterval(timer);
          login();
        }
        if (statusRes.code === 803) {
          console.log(statusRes.cookie);
          var n = statusRes.cookie.split(";;");
          n.forEach((element) => {
            console.log(element);
            document.cookie = element;
          });
          // document.cookie = statusRes.cookie;
          // this.key = "";
          this.loginQR = "";
          // 这一步会返回cookie
          clearInterval(timer);
          this.message = "授权登录成功";
          await this.getLoginStatus();
        }
      }, 3000);
    },
    async checkStatus(key) {
      const res = await this.$axios({
        url: `${
          this.base_url
        }/login/qr/check?key=${key}&timerstamp=${Date.now()}`,
        withCredentials: true, //关键
      });
      return res.data;
    },
    async getLoginStatus() {
      const res = await this.$axios({
        url: `${this.base_url}/login/status?timerstamp=${Date.now()}`,
        withCredentials: true, //关键
      });
      this.loginInfo = res.data;
      // this.loginInfo = JSON.stringify(
      //   res.data,
      //   null,
      //   2
      // );
      // this.uid = res.data.account.id;
    },
    async getMyPlaylists() {
      const res = await this.$axios({
        url: `${this.base_url}/user/playlist?uid=${this.uid}`,
        withCredentials: true, //关键
      });
      this.playlists = res;
    },
  },
  created() {},
  mounted() {
    this.login();
  },
  beforeDestroy() {},
};
</script>

<style>
</style>