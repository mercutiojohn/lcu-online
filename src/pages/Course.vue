<template>
  <div id="course">
    <div id="course-background"></div>
    <div id="course-box">
      <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->
      <!-- <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog> -->
      <!-- <el-tabs v-model="activeName" @tab-click="handleClick" class="course-tab">
        <el-tab-pane label="用户管理" name="first">
          <div class="course-blank">用户管理</div>
          </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">
          配置管理
          </el-tab-pane>
        <el-tab-pane label="角色管理" name="third">
          角色管理
          </el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">
          定时任务补偿
          </el-tab-pane>
      </el-tabs> -->
       <div id="course-category-list-box">
        <ul class="course-video-list">
          <li v-for="(item,index) in list" :key="index" :class="'course-video-item' + (currentList == index ? ' course-video-item-active':'')" @click="changeCurrList(index)">
              <span class="course-video-item-title">{{item.title}}</span>
            </li>
        </ul>
      </div>
      <div id="course-video-list-box">
        <ul class="course-video-list">
          <li v-for="(item,index) in list[currentList].list" :key="index" :class="'course-video-item' + (currentVideoIndex == index ? ' course-video-item-active':'')" @click="changeCurrBV(item.bvid,index)">
              <span class="course-video-item-title">{{item.title}}</span>
              <span class="course-video-item-desc">BV{{item.bvid}} · 共{{item.pages}}P · 来自{{item.type}}</span>
              
                <ul class="course-video-page-list" v-if="currentBV == item.bvid">
                  <li  v-for="page in item.pages" :key="page" :class="'course-video-page-item' + (currentPage == page ? ' course-video-page-item-active':'')" @click="changeCurrPage(page)">{{page}}</li>
                </ul>
              
            </li>
        </ul>
      </div>
     
      <div id="course-study">
        <a :href="videoUrl" target="_blank"><button class="player-open-in-window">新窗口打开</button></a>
        <button class="player-switch" @click="switchPlayer()">切换播放器</button>
        <iframe id="course-study-video" :src="videoUrl" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
      </div>
      <!-- <span>{{data.title}}</span> -->
    </div>
  </div>
</template>

<script>
// import courseData from "@/assets/data/courseData.json";
// import list from "@/assets/data/list.json"

export default {
  name: "Course",
  data() {
    return {
      courseData: "",
      list: "",
      player: 0,
      activeName: "second",
      dialogVisible: false,
      currentBV: "1",
      currentPage: 1,
      currentList:0,
      currentVideoIndex:0,
      videoData:{}
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    // getCourseData() {
    //   this.list = require("@/assets/data/courseData.json");
    // },
    getList() {
      this.list = require("@/assets/data/list.json");
      // for (let index = 0; index < this.list.length; index++) {
      //   this.videoData[index].title = this.list[index].title;
      //   for(let j = 0; j < this.list[index].list.length; j++){
      //     e = require("http://api.bilibili.com/x/web-interface/view?bvid=BV"+this.list[index].list[j].bvid);
      //     this.videoData[index].list[j] = e.data;
      //   }
        
      // }
    },
    getListData(id) {
      // const path = "@/assets/data/list/" + id + ".json";
      // this.listData=require(path)
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    changeCurrBV(bvid,index){
      this.currentBV = bvid;
      this.currentVideoIndex = index;
      // this.currentPage = 1; //todo remember
    },
    changeCurrPage(page){
      this.currentPage = page;

    },
    initializeVideoBox(){
      this.currentBV = this.list[0].bvid;
      this.currentPage = this.list[0].page;
    },
    changeCurrList(list){
      this.currentList = list;
      this.currentVideoIndex = 0;
      this.currentBV = this.list[list].list[0].bvid;
    },
    switchPlayer(){
      if(this.player == 1){
        this.player = 0;
      }else{
        this.player = 1;
      }
    }
  },
  created() {
    // this.getCourseData();
    this.getList();
    this.initializeVideoBox();
  },
  computed: {
    videoUrl: function() {
      if(this.player == 1){
        return "https://www.bilibili.com/blackboard/newplayer.html?playlist=true&playlist_order=sequential&musth5=1&noEndPanel=0&crossDomain=1&autoplay=1&bvid="+this.currentBV+"&page="+this.currentPage;
      }else{
        return "https://player.bilibili.com/player.html?bvid=BV"+this.currentBV+"&page="+this.currentPage;
      }
      return null;
    }
  }
};
</script>

<style>
:root{
  --accent-color:rgb(17, 148, 235);
  /* --course-box-height:calc(100vh - 90px); */
  --course-box-height:calc(100vh - 56px);
  --course-box-width:100%;
}
#course-background {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -2;
  background: url(https://bing.rthe.net/wallpaper) no-repeat fixed center/cover var(--accent-color);
}

.course-blank{
  /* height: 1000px; */
  /* width: 10px; */
}
.course-tab {
  position: relative;
}
.course-tab .el-tabs__header {
  /* height: 1000px; */
  position: sticky;
  top: 70px;
  background: #fff;
  z-index:999;
}
#course {
  min-height: 100%;
  display: flex;
  /* align-items: center; */
  justify-content: center;
}
#course-box{
  background: #fff;
  width:var(--course-box-width);

  height:var(--course-box-height);
  /* padding:20px; */
  overflow: hidden;
  /* border-radius: 10px; */
  /* margin: 0 10px 10px; */
  display: flex;
}
#course-video-list-box{
  width: 20%;
  height: 100%;
  overflow: scroll;
  background: #eee;
  border-right: 1px solid #ddd;
}
#course-category-list-box{
  width: 15%;
}1
#course-category-list-box,#course-video-list-box{
  height: 100%;
  border-right: 1px solid #ddd;
  overflow: scroll;
  background: #eee;

}
#course-study{
  width: 65%;
  height: 100%;
  /* background: #000; */
}
#course-study-video{
  width: 100%;
  height: 100%;
  /* background: #000; */

}
.course-video-list{
  padding-top: 10px;
  /* height: 100%; */
  /* overflow: scroll; */
  /* color: #fff; */
}
.course-video-item{
  border-bottom: 1px solid #ddd;
  display:flex;
  flex-direction: column;
  padding:5px 10px;
  background: #fff;
  
}
.course-video-item,.course-video-item:hover,.course-video-page-item:hover,.course-video-page-item{
  transition: background-color .2s;
}
.course-video-item:hover{
  background: #eee;
  color:#000;
  cursor: pointer;
}
.course-video-item:active{
  background: #fff;
  color:#000;
}
.course-video-item-active{
  background: var(--accent-color);
  color:#fff;
  cursor: context-menu;
}
.course-video-item-active:hover{
  background: var(--accent-color);
  color:#fff;
  cursor: context-menu;
}
.course-video-item-active:active{
  background: var(--accent-color);
  color:#fff;
  cursor: context-menu;
}
.course-video-page-list{
  display: flex;
  overflow: scroll;
  flex-wrap: nowrap;
}
.course-video-page-item{
  display: block;
  flex-shrink: 0;
  padding: 5px 10px;
  margin: 3px;
  border-radius: 5px;
  border: 1px solid rgba(253, 253, 253, 0.671);
}
.course-video-page-item:hover{
  cursor: pointer;
  background: #ffffff34;
}
.course-video-page-item:active{
  background: #ffffff64;
}
.course-video-page-item-active, .course-video-page-item-active:hover{
  background: #ffffff;
  color:var(--accent-color);
}
.course-video-item-title{
  font-size: 15px;
}
.course-video-item-desc{
  font-size: 12px;
  opacity: .5;
}
.player-switch{
  position:absolute;
  right:20px;
  bottom: 20px;
  opacity: 0.2;
}
.player-open-in-window{
  position:absolute;
  right:20px;
  bottom: 50px;
  opacity: 0.2;
}
.player-switch:hover{
  opacity: 1;
}
.player-open-in-window:hover{
  opacity: 1;
}
</style>