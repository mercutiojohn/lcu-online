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
        <p>登陆状态: {{ JSON.stringify(loginStatus, null, 2) }}</p>
        <p>UID: {{ uid }}</p>
        <p>Cookie: {{ cookie }}</p>
        <p>登录信息: {{ JSON.stringify(loginInfo, null, 2) }}</p>
        <p>播放列表: {{ JSON.stringify(playlists, null, 2) }}</p>
      </div>
      <div class="ne-loading" v-if="loading">
        正在加载
      </div>
      <div class="login" v-if="!loginStatus&&!loading">
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
          <div class="error" v-if="statusType === 'Failed'">
            <button @click="permitQR()">重新扫码</button>
          </div>
        </div>
      </div>
      <div class="main-area" v-if="loginStatus&&!loading">
        <div class="scroll-area">
          <div class="list favourite-songs">
            <div class="list-header">
              <span>{{favourites.name}}</span>
              <router-link
              :to="{
                name: 'NetEase',
                query: {
                  type:'song',
                  songid: favourites.tracks[0].id,
                  listid: favouriteListId
                },
              }"
            ><button class="">播放</button></router-link>
              <router-link
              :to="{
                name: 'NetEase',
                query: {
                  type:'list',
                  listid: favouriteListId
                },
              }"
            ><button class="">详情</button></router-link>
            </div>
            <router-link
              class="list-item"
              v-for="(item, index) in favourites.tracks.slice(0,5)"
              :key="index"
              :to="{
                name: 'NetEase',
                query: {
                  type:'song',
                  songid: item.id,
                  listid: favouriteListId
                },
              }"
            >
              <img class="cover" :src="item.al.picUrl" alt="" srcset="" />
              <div class="song-info">
                <p class="title">{{ item.name }}</p>
                <p class="detail">{{ item.al.name }} - {{item.ar[0].name}}</p>
              </div>
            </router-link>
          </div>
          <div class="list playlists">
            <div class="list-header">
              <span>歌单列表</span>
              <router-link
              :to="{
                name: 'NetEase',
                query: {
                  type:'list_all'
                },
              }"
            ><button class="">全部</button></router-link>
            </div>
            <router-link
              class="list-item"
              v-for="(item, index) in playlists.slice(1,7)"
              :key="index"
              :to="{
                name: 'NetEase',
                query: {
                  type:'list',
                  listid: item.id,
                },
              }"
            >
              <img class="cover" :src="item.coverImgUrl" alt="" srcset="" />
              <p>{{ item.name }}</p>
            </router-link>
          </div>
        </div>
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
  name: "BiliMy",
  components: {},
  data() {
    return {
      base_url: `${this.$store.state.apiPath}:3000`,
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
      favouriteListId:'',
      favourites:'',
      loading:true
    };
  },
  computed: {},
  watch: {
    cookie(newCookie) {
      localStorage.netEaseCookie = newCookie;
    },
    loginStatus(newStatus) {
      if(newStatus == true){
        if(status){
          this.getMyPlaylists();
          this.getFavourites();
        }
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
        await this.getMyPlaylists();
        await this.getFavourites();
      }
      this.loading = false;
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
          this.loginQR = "";
          clearInterval(timer);
          this.message = "二维码已过期,请重新获取";
          this.statusType = "Failed";
          
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
          await this.getMyPlaylists();
          await this.getFavourites();
        }
      }, 3000);
    },
    async checkStatus(key) {
      const res = await this.$axios({
        method: "POST",
        url: `${
          this.base_url
        }/login/qr/check?key=${key}&timerstamp=${Date.now()}`,
        withCredentials: true, //关键
      });
      return res.data;
    },
    async getLoginStatus() {
      // console.log(this.cookie);
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
          // limit:10,
          // offset:1
        },
      });
      this.playlists = res.data.playlist;
      this.favouriteListId = res.data.playlist[0].id
    },
    async getFavourites() {
      console.log('歌单id',this.favouriteListId);
      const res = await this.$axios({
        // method: "POST",
        // url: `${this.base_url}/user/playlist?uid=${this.loginInfo.account.id}&cookie=${this.cookie}`,
        url: `${this.base_url}/playlist/detail?id=${this.favouriteListId}&cookie=${this.cookie}`,
        withCredentials: true, //关键
        // data: {
          // id: this.loginInfo.account.id,
          // timerstamp: Date.now(),
          // cookie: this.cookie,
          // limit:10,
          // offset:1
        // },
      });
      console.log('歌单详情',res.data);
      this.favourites = res.data.playlist;
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
  border-top: 1px solid var(--first-assist-color);
  padding: 0 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}
.profile > p{
  color:var(--main-color)
}
.list {
  padding: 15px 10px;
  border-bottom: 1px solid var(--first-assist-color);
}
.list-item {
  display: flex;
  align-items: center;
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
.login-ask,.login-qr,.ne-loading{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin:10px;
  color:var(--main-color);
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
.song-info{
  margin-left: 10px;
  color:var(--main-color);
  display: flex;
  flex-direction: column;
}
.song-info .title{
  font-size: 14px;
}
.song-info .detail{
  font-size: 12px;
}
.song-info p{
  margin:0;
  display: -webkit-box; 
  -webkit-box-orient: vertical; 
  -webkit-line-clamp: 1; 
  overflow: hidden;
}
.list-header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 5px;
  padding-bottom: 5px;
}
.list-header span{
  font-size: 17px;
  font-weight: 700;
}
.scroll-area{
  max-height: 500px;
  overflow: scroll;
}
.list-header>span{
  color:var(--main-color)
}
button{
  border:none;
  border-radius: 20px;
  background: var(--first-assist-color);
  cursor: pointer;
  transition: all .2s ease;
  padding:8px 14px;
}
button:hover{
  background: var(--accent-color);
  color:#fff;
}
button:active{

}
</style>