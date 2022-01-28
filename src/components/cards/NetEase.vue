<template>
  <div class="netease">
    <div class="netease-list">
      <!-- <div class="item" v-for="(item, index) in songs" :key="index">
            <p>{{item.name}}</p>
            <p><span v-for="(item2, index) in item.artists" :key="index">{{item2.name}}</span></p>
            <p>{{item.album.name}}</p>
            <hr>
        </div> -->
      <div class="logs" hidden>
        <button @click="getMyPlaylists()">获取歌单</button>
        <button @click="getLoginStatus()">获取状态信息</button>
        <p>登陆状态:{{ loginStatus }}</p>
        <p>UID:{{ uid }}</p>
        <p>{{ loginInfo }}</p>
        <p>{{ playlists }}</p>
      </div>
      <div class="login" v-if="!loginStatus">
        <span>{{ message }}</span>
        <img :src="loginQR" alt="" srcset="" />
      </div>
      <div class="main-area" v-if="loginStatus">
        <div class="profile">
          <img
            class="cover"
            :src="loginInfo.profile.avatarUrl"
            alt=""
            srcset=""
          />
          <p>{{ loginInfo.profile.nickname }}</p>
        </div>
        <div class="list">
          <div
            class="list-item"
            v-for="(item, index) in playlists"
            :key="index"
          >
            <img class="cover" :src="item.coverImgUrl" alt="" srcset="" />
            <p>{{ item.name }}</p>
          </div>
        </div>
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
      base_url: "http://api.mercutio.club:3000",
      songs: "",
      albums: "",
      loginQR: "",
      timer: "",
      key: "",
      loginStatus: false,
      loginInfo: "",
      message: "登录",
      playlists: "",
      uid: "",
      cookie: "",
    };
  },
  computed: {},
  watch: {
    cookie(newCookie) {
      localStorage.netEaseCookie = newCookie;
    },
  },
  methods: {
    async login() {
      let timer;
      let timestamp = Date.now();
      this.loginStatus = await this.getLoginStatus();

      if (this.loginStatus) {
        await this.getMyPlaylists();
      } else {
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
            this.login();
          }
          if (statusRes.code === 803) {
            console.log(statusRes.cookie);
            var n = statusRes.cookie.split(";;");
            n.forEach((element) => {
              // console.log(element);
              document.cookie = element;
              this.cookie = element;
            });
            // document.cookie = statusRes.cookie;
            // this.key = "";
            this.loginQR = "";
            // 这一步会返回cookie
            clearInterval(timer);
            this.message = "授权登录成功";
            await this.getLoginStatus();
            await this.getMyPlaylists();
          }
        }, 3000);
      }
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
        method: "POST",
        // url: `${this.base_url}/login/status?timerstamp=${Date.now()}&cookie=${this.cookie}`,
        url: `${this.base_url}/login/status`,
        data: {
          timerstamp: Date.now(),
          cookie: this.cookie,
        },
        withCredentials: true, //关键
      });
      console.log(res);
      this.loginInfo = res.data.data;
      if (res.data.data.account !== null) {
        this.loginStatus = true;
        this.uid = res.data.data.account.id;
        return true;
      } else {
        this.loginStatus = false;
        return false;
      }
    },
    async getMyPlaylists() {
      const res = await this.$axios({
        method: "POST",
        // url: `${this.base_url}/user/playlist?uid=${this.loginInfo.account.id}&cookie=${this.cookie}`,
        url: `${this.base_url}/user/playlist`,
        withCredentials: true, //关键
        data: {
          uid: this.loginInfo.account.id,
          timerstamp: Date.now(),
          cookie: this.cookie,
        },
      });
      this.playlists = res.data.playlist;
    },
  },
  created() {},
  mounted() {
    this.cookie = localStorage.netEaseCookie;
    this.login();
  },
  beforeDestroy() {},
};
</script>

<style scoped>
.cover {
  width: 50px;
}
.avatar {
  width: 70px;
}
.logs {
  max-height: 150px;
  overflow: scroll;
}
.profile {
  display: flex;
}
.list {
  max-height: 500px;
  overflow: scroll;
  margin:10px;
}
.list-item {
  display: flex;
  padding: 5px;
  cursor: pointer;
  transition: all .2s ease;
  user-select: none;
  border-radius: 6px;
}
.list-item:hover {
  background: var(--first-assist-color);
}
.list-item > img{
  border-radius: 5px;
}
.list-item > p{
  margin-left:10px;
  overflow:hidden; 
  text-overflow:ellipsis; 
  white-space:nowrap;
  color:var(--main-color);
}
</style>