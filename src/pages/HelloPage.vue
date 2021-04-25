<template>
  <div class="hello-page">
    <el-dialog
      title="U+账号登录"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :label-position="labelPosition" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="login.uname" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="login.pwd" placeholder="请输入内容" show-password>
          </el-input>
        </el-form-item>
        <el-form-item label="平台">
          <el-radio-group v-model="login.radio">
            <el-radio-button label="lcu" disabled>U+聊城大学</el-radio-button>
            <el-radio-button label="qst">U+新工科智慧云</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="记住密码">
          <el-switch
          v-model="login.savePwd"
          inactive-color="#eee"
          disabled>
        </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <div id="hello-background"></div> -->
    <div id="hello-content">
      <div id="left-info">
        <div class="left-info-content">
          <Countdown />
        </div>
        <div class="left-info-content"><iframe
            class="left-info-iframe"
            allow="autoplay *; encrypted-media *; geolocation; microphone; camera"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
            src="https://www.dida365.com/webapp/#q/all/today"
            frameborder="0"
            scrolling="auto"
          ></iframe></div>
        <div class="left-info-content">
          <Homeworks @makeGlobalDialogVisible="dialogVisible = true" :vals="this.login"/>
        </div>
        <!-- <div class="left-info-content"><Player /></div> -->
        
        <div class="about">
          <span class="about-text">鲁ICP备20018544号</span>
          <a href="http://mercutio.club"
            ><span class="about-text">莫阿白的博客</span></a>
          <a
            href="https://github.com/mercutiojohn/lcu-online/projects/1?fullscreen=true"
            ><span class="about-text" style="font-size: 10px">迭代路线</span></a
          >
          <a href="https://github.com/mercutiojohn/lcu-online/issues"
            ><span class="about-text" style="font-size: 10px">提意见</span></a
          >
        </div>
      </div>
      <div class="home-wrap">
        <DynamicMainContent />
        <Navigation
          v-for="(item, index) in list"
          :title="item.title"
          :sites="item.list"
          :key="index"
          :noIcon="item.noIcon ? true : false"
          :noColor="item.noColor ? true : false"
        >
        </Navigation>
      </div>
    </div>
  </div>
</template>

<script>
import Player from "@/components/Player";
import CalendarBox from "@/components/CalendarBox";
import Navigation from "@/components/Navigation";
import Hitokoto from "@/components/Hitokoto";
import DynamicMainContent from "@/components/DynamicMainContent";
import Homeworks from "@/components/Homeworks";
import Countdown from "@/components/Countdown";

export default {
  name: "HelloPage",
  components: {
    CalendarBox,
    Navigation,
    Hitokoto,
    DynamicMainContent,
    Player,
    Homeworks,
    Countdown
  },
  data() {
    return {
      dialogVisible: false,
      login: {
        uname: "",
        pwd: "",
        radio: "qst",
        savePwd:'false'
      },
      labelPosition:'right'
    };
  },
  methods: {
    linktab() {
      let goUrl = this.isMobile();
      if (goUrl === 1) {
        //移动端地址
        // location = "http://127.0.0.1:8043";
        // alert("hello");
        location = "#/mobile";
      } else {
        //PC地址
      }
    },
    isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      let goUrl = flag ? 1 : 0;
      return goUrl;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleSubmit() {
      this.$emit('getLogin', this.login)
      this.dialogVisible = false;
    },
    getList() {
      this.list = require("@/assets/data/navList.json");
    },
  },
  created() {
    this.linktab();
    this.getList();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
:root {
  --left-bar-width: 300px;
}
.hello-page {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0 100px 0;
}
.hello-page::before{
    transition:all .2s ease;
  
}
@media screen and (max-width: 1030px) {
  .hello-page::before{
    display: flex;
    align-items: center;
    justify-content: center;
    content:"暂不支持过窄宽度";
    color: #fff;
    position: fixed;
    top:calc(50% - 100px);
    left: calc(50% - 100px);
    z-index: 10000;
    background: #00000094;
    backdrop-filter: blur(50px);
    width: 200px;
    height: 200px;
    border-radius: 10px;
    box-sizing: border-box;
  }
  /* body::after{
    z-index: 1000;
    display: flex;
    position: fixed;
    top:0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #00000023;
    content: "";
  } */
}
#hello-background {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -2;
  /* background: url(https://source.unsplash.com/random/1920x1080) no-repeat fixed center/cover; */
}

#hello-content {
  box-sizing: border-box;
  width: var(--box-width);
  display: flex;
  position: relative;
  max-width: 1300px;
}

#left-info {
  height: calc(100vh - 115px);
  box-sizing: border-box;
  position: fixed;
  bottom: 50px;
  padding: 0 10px 80px 10px;
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  overflow-y: scroll;
  /* overflow-x: hidden; */
  user-select: none;
}
#left-info .left-info-content {
  margin: 10px 0;
  background: var(--elem-color);
  border-radius: 5px;
  box-shadow: 0 2px 6px 1px #00000014;
  /* background: #ffffff75;
  backdrop-filter: blur(30px) saturate(180%);
  border-radius: 10px;
  box-shadow: 0 5px 8px 3px #00000014; */
  overflow: hidden;
  flex-shrink: 0 ;
}
#left-info .left-info-content .left-info-iframe{
  width: 100%;
  height:500px;
}
.home-wrap {
  padding-left: calc(350px + 20px);
  display: flex;
  flex: 1;
  width: calc(1300px - (350px + 20px));
  /* overflow: scroll; */
  flex-direction: column;
  /* height:calc(100vh - 150px); */
  user-select: none;
}
@media screen and (max-width: 600px) {
  #hello-content {
    flex-direction: column;
    margin: 0;
    width: calc(100% - 20px * 2);
  }
  #left-info {
    position: relative;
    display: none;
    /* top:0px; */
  }
  .home-wrap {
    width: 100%;
  }
}
.about {
  position: fixed;
  bottom: 22px;
  /* left: 25px; */
  width: 100%;
  /* margin: 0 auto 20px; */
  display: flex;
  align-items: center;
  /* flex-direction: row; */
  /* justify-content: space-evenly; */
  font-size: 12px;
}
.about a {
  /* text-decoration: underline; */
  cursor: pointer;
  color: #000;
}

.about-text,
.about a {
  color: var(--main-color);
  padding: 2px;
  transition: all 0.2s ease;
}
.about-text-course {
  color: var(--main-color);
  padding-left: 12px;
  font-size: 10px;
}
.about a:hover {
  /* color: #ffffff!important; */
  background: var(--main-color-opa);
  border-radius: 5px;
  /* text-decoration: underline; */
  cursor: pointer;
  transition: all 0.35s ease;
}
</style>
