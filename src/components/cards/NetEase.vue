<template>
  <div class="netease">
    <div class="netease-list">
      <!-- <div class="item" v-for="(item, index) in songs" :key="index">
            <p>{{item.name}}</p>
            <p><span v-for="(item2, index) in item.artists" :key="index">{{item2.name}}</span></p>
            <p>{{item.album.name}}</p>
            <hr>
        </div> -->
      <div class="logs" v-if="debug">
        <button @click="getMyPlaylists()">获取歌单</button>
        <button @click="getLoginStatus()">获取状态信息</button>
        <button @click="clearCookie()">登出</button>
        <button @click="loginWithQR()">登录</button>
        <p>登陆状态: {{ loginStatus }}</p>
        <p>UID: {{ uid }}</p>
        <p>Cookie: {{ cookie }}</p>
        <p>登录信息: {{ loginInfo }}</p>
        <p>播放列表: {{ playlists }}</p>
      </div>
      <div class="login" v-if="!loginStatus">
        <div class="login-ask" v-if="!loginQRPermitted">
          <button @click="permitQR()">点击登录网易云音乐</button>
        </div>
        <div class="login-qr" v-else>
          <span class="tip">{{ message }}</span>
          <img :src="loginQR" alt="" srcset="" />
          <div class="error" v-if="statusType === 'Success'">
            未跳转?
            <button @click="permitQR()">重新扫码</button>
            <button @click="getLoginStatus()">刷新</button>
          </div>
        </div>
      </div>
      <div class="main-area" v-if="loginStatus">
        <div class="profile">
          <img
            class="avatar"
            :src="loginInfo.profile.avatarUrl"
            alt=""
            srcset=""
          />
          <p>{{ loginInfo.profile.nickname }}</p>
          <button @click="clearCookie()">登出</button>

        </div>
        <div class="list">
          <router-link
            class="list-item"
            v-for="(item, index) in playlists"
            :key="index"
            :to="{
              name: 'NetEase',
              query: {
                listid: item.id,
              },
            }"
          >
            <img class="cover" :src="item.coverImgUrl" alt="" srcset="" />
            <p>{{ item.name }}</p>
          </router-link>
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
      // base_url: "http://cloud-music.pl-fe.cn",
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
      loginQRPermitted: false,
      successType:'',
      debug:false,
    };
  },
  computed: {},
  watch: {
    cookie(newCookie) {
      localStorage.netEaseCookie = newCookie;
    },
    loginStatus(newStatus) {
      if(newStatus == true){
        if(status)
          this.getMyPlaylists();
      }
    }
  },
  methods: {
    clearCookie() {
      this.cookie = "";
      localStorage.netEaseCookie = '';
      this.loginInfo = "";
      this.loginStatus = false;
      this.uid = "";
      this.playlists = '';
      this.loginWithQR();
    },
    async login() {
      this.loginStatus = await this.getLoginStatus();
      if (this.loginStatus) {
        this.loginQRPermitted = true;
        this.getMyPlaylists();
      }
    },
    permitQR() {
      this.successType = '';
      this.loginQRPermitted = true;
      this.loginWithQR();
    },
    async loginWithQR() {
      let timer;
      let timestamp = Date.now();
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
          this.loginWithQR();
        }
        if (statusRes.code === 803) {
          // console.log('Res-cookie',statusRes.cookie);
          var n = statusRes.cookie.split(";;");
          n.forEach((element) => {
            document.cookie = element;
            this.cookie = element;
          });
          // document.cookie = statusRes.cookie;
          this.key = "";
          this.loginQR = "";
          // 这一步会返回cookie
          clearInterval(timer);
          this.message = "授权登录成功";
          this.statusType = "Success";
          await this.getLoginStatus();
          this.getMyPlaylists();
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
      console.log(this.cookie);
      const res = await this.$axios({
        method: "GET",
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
      if (res.data.data.account!==null) {
        // console.log('account!',res.data.data.account);
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
.netease{
}
.cover {
  width: 50px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 30px;
}
.logs {
  max-height: 500px;
  overflow: scroll;
}
.profile {
  padding: 0 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--first-assist-color);
  box-sizing: border-box;
}
.list {
  margin: 0 10px;
  max-height: 500px;
  overflow: scroll;
}
.list-item {
  display: flex;
  padding: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
  border-radius: 6px;
}
.list-item:hover {
  background: var(--first-assist-color);
}
.list-item > img {
  border-radius: 5px;
}
.list-item > p {
  margin-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--main-color);
}
.tip{
  color:var(--main-color);
}
.login-ask{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin:10px;
}
.login-qr{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin:10px;
}
.error{
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color:var(--main-color);
  font-size: 7px;
}

</style>