<template>
  <div id="course">
    <div id="course-box">
      <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <el-tabs v-model="activeName" @tab-click="handleClick" class="course-tab">
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
      </el-tabs>
      <div id="course-catgory-list">
        <ul>
          <li v-for="(item,index) in list" :key="index">{{item.title}}</li>
        </ul>
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
      activeName: "second",
      dialogVisible: false,
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
    getCourseData() {
      this.list = require("@/assets/data/courseData.json");
    },
    getList() {
      this.list = require("@/assets/data/list.json");
    },
    getListData(id) {
      path = "@/assets/data/list/" + id + ".json";
      // this.listData=require(path)
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  created() {
    this.getCourseData();
    this.getList();
  },
};
</script>

<style>
#all {
  /* background: url(https://bing.rthe.net/wallpaper) no-repeat fixed center/cover; */
}
.course-blank{
  height: 1000px;
  width: 10px;
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
  width:calc(100% - 80px);
  min-height:calc(100vh - 150px);
  padding:20px;
  border-radius: 20px;
  margin: 0 20px 20px;
}
</style>