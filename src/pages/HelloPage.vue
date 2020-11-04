<template>
  <div class="hello-page">
    <div id="hello-background"></div>
    <div id="hello-background-mask"></div>
    <div id="hello-content">
      <div id="top-info">
        <CalendarBox />
        <div class="about">
          <span class="about-text">鲁ICP备20018544号</span>
          <a href="http://mercutio.club"><span class="about-text">莫阿白的博客</span></a>
          <!-- <a href="http://bing.com"><span class="about-text" style="font-size:10px;">壁纸来自Unsplash</span></a> -->
        </div>
      </div>
      <div class="navigation">
        <Navigation title="我的课程" :sites="myCourses" noIcon="true" noColor="true"/>
        <span class="about-text-course" style="font-size:10px;margin-bottom:20px;">现处预览测试阶段，无法自定义课程</span>
        <!-- <Navigation title="正在进行" noIcon="true" noColor="true" :sites="special" /> -->
        <Navigation title="校园事务" :sites="schoolAffairs" />
        <Navigation title="校园学习" :sites="learn" />
        <Navigation title="在线文档" :sites="documents" />
        <Navigation title="自我提升" :sites="selfUpper" />
        <Navigation title="新媒体" :sites="newMedia" />
        <Navigation title="编程开发" :sites="dev" />
      </div>
    </div>
  </div>
</template>

<script>
import CalendarBox from "@/components/CalendarBox";
import Navigation from "@/components/Navigation";

export default {
  name: "HelloPage",
  components: {
    CalendarBox,
    Navigation,
  },
  data() {
    return {
      special:[
        {
          title: "数学建模国赛",
          // color: "#1e83ca",
          // icon: "uplus.png",
          url: "https://cumcm.cnki.net/cumcm/",
        },
      ],
      myCourses:[
        {
          title: "计算机网络",
          // color: "#1e83ca",
          // icon: "uplus.png",
          url: "https://mooc2-ans.chaoxing.com/mycourse/stu?courseid=214249544&clazzid=31805518&enc=fce609af3fffc4fd165abdcaa725862c&cpi=111705708&pageHeader=0p",
        },
        {
          title: "编译原理",
          // color: "#1e83ca",
          // icon: "uplus.png",
          url: "http://ee-c.lcu.edu.cn/u/ordCou/fb017e8c6f7b40d5016ff4282ed137b8/teachClassStudent",
        },
        {
          title: "软件测试",
          // color: "#1e83ca",
          // icon: "uplus.png",
          url: "http://ee-c.lcu.edu.cn/u/ordCou/8a7d8a9573c84c42017462a6758f571f/teachClassStudent",
        },
        {
          title: "软件设计与体系结构",
          // color: "#1e83ca",
          // icon: "uplus.png",
          url: "http://ee-c.lcu.edu.cn/u/ordCou/8a7d8a9573c84c4201745448465c520a/teachClassStudent",
        },
        {
          title: "算法分析与设计",
          // color: "#1e83ca",
          // icon: "uplus.png",
          url: "http://ee-c.lcu.edu.cn/u/ordCou/8a7d8a9573c84c42017491a71fc30ec9/teachClassStudent",
        },
        {
          title: "软件工程经济学",
          // color: "#1e83ca",
          // icon: "uplus.png",
          url: "http://ee-c.lcu.edu.cn/u/ordCou/8a7d8a9573c84c420174ed844b0757d5/1/teachClassStudent"
        },
        {
          title: "软件需求分析",
          // color: "#1e83ca",
          // icon: "uplus.png",
          url: "https://mooc2-ans.chaoxing.com/mycourse/stu?courseid=214167272&clazzid=33545350&cpi=111705708&enc=8c814025620430e64fe111b777e8fc98&t=1603009694245&pageHeader=0"
        }
      ],
      learn: [
        {
          title: "U+新工科智慧云",
          color: "#1e83ca",
          icon: "uplus.png",
          url: "http://ee-c.lcu.edu.cn/si/student/group",
        },
        {
          title: "Unipus",
          color: "#289cfb",
          icon: "unipus.png",
          url: "http://210.44.112.108",
        },
        {
          title: "批改网",
          color: "#28aae1",
          icon: "pigai.png",
          url: "http://www.pigai.org/index.php?c=write&a=myclass&f2=login",
        },
        {
          title: "学习通",
          // color: "#309fff",
          color: "#b52831",
          icon: "chaoxing.png",
          url: "https://mooc2-ans.chaoxing.com/visit/interaction",
        },
        // {
        //   title: "学习通",
        //   color: "#b52831",
        //   icon: "chaoxing.png",
        //   url: "https://i.chaoxing.com/base",
        // },
        {
          title: "优学院",
          color: "#ea5145",
          icon: "youxy.png",
          url: "https://courseweb.ulearning.cn/ulearning/index.html#/index/courseList",
        },
        {
          title: "易班优课",
          color: "#ffffff",
          icon: "yooc.png",
          url: "https://www.yooc.me/dashboard/mygroup",
        },
      ],
      newMedia: [
        {
          title: "MAKA",
          color: "#ffffff",
          icon: "maka.png",
          url: "https://www.maka.im/workspace/works",
        },
        {
          title: "创客贴",
          color: "#005ffe",
          icon: "ckt.svg",
          url: "https://www.chuangkit.com/designtools/startdesign",
        },{
          title: "麦克表单",
          color: "#1e3035",
          icon: "mikecrm.png",
          url: "https://www.mikecrm.com/form.php",
        }
      ],
      dev: [
        {
          title: "腾讯云控制台",
          color: "#ffffff",
          icon: "txy.svg",
          url: "https://console.cloud.tencent.com/",
        },
        {
          title: "GitHub",
          color: "#24292e",
          icon: "github.svg",
          url: "https://github.com/",
        },{
          title: "华为云",
          color: "#f83a43",
          icon: "huawei.svg",
          url: "https://console.huaweicloud.com/ecm/",
        },{
          title: "gitee",
          color: "#ffffff",
          icon: "gitee.svg",
          url: "https://gitee.com",
        },{
          title: "CODING",
          color: "#ffffff",
          icon: "coding.png",
          url: "https://e.coding.net/login",
        },
      ],
      schoolAffairs: [
        {
          title: "数字聊大",
          color: "#059490",
          icon: "lcu.svg",
          url: "http://one.lcu.edu.cn/tp_up",
        },
        {
          title: "教务系统",
          color: "#0483d4",
          icon: "jwxt.png",
          url: "http://jwcweb.lcu.edu.cn/jwglxt/xtgl/login_slogin.html?language=zh_CN",
        },{
          title: "图书馆",
          color: "#059490",
          icon: "tsg.gif",
          url: "http://www-lib.lcu.edu.cn/",
        },{
          title: "校园网",
          color: "#fca40a",
          icon: "xyw.svg",
          url: "http://172.30.2.2:8088/eportal/success.jsp",
        }
      ],
      selfUpper:[
        {
          title: "传智播客",
          color: "#ffffff",
          icon: "ityxb.png",
          url: "http://stu.ityxb.com/Classroom/course/learning",
        },{
          title: "中国大学MOOC",
          color: "#ffffff",
          icon: "mooc.png",
          url: "https://www.icourse163.org/home.htm",
        },{
          title: "有道精品课",
          color: "#fb4a3e",
          icon: "youdao.png",
          url: "https://ke.youdao.com/user/mycourse",
        },{
          title: "知网研学",
          color: "#3474d9",
          icon: "cnki.png",
          url: "https://x.cnki.net/psmc#/MyStudy",
        },{
          title: "学堂在线",
          icon:"xuetang.png",
          color: "#ffffff",
          url:"https://next.xuetangx.com/my-courses/current"
        },{
          title:"Coursera",
          color: "#ffffff",
          icon: "coursera.svg",
          url:"https://www.coursera.org/in-progress"
        }
      ],
      documents:[
        {
          title: "麦克表单",
          color: "#1e3035",
          icon: "mikecrm.png",
          url: "https://www.mikecrm.com/form.php",
        },{
          title: "腾讯文档",
          color: "#ffffff",
          icon: "txdoc.png",
          url: "https://docs.qq.com/",
        }
      ]

    };
  },
  methods: {
    getList() {
      this.list = require("@/assets/data/navList.json");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#hello-background {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -2;
  background: url(https://source.unsplash.com/random/1920x1080) no-repeat fixed center/cover;
}
#hello-background-mask{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  background-image: radial-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%), radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.3) 166%),linear-gradient(180deg, rgba(0, 0, 0, 0) 0%,rgba(0, 0, 0, 0) 0% 75%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%);
}
#hello-content {
  background: #ffffff23;
  width: calc(100% - 20px * 2 - 20 * 2);
  /* backdrop-filter: blur(50px) saturate(180%); */
  /*height:calc(100vh - 150px);*/
  min-height: calc(100vh - 150px);
  padding: 20px;
  border-radius: 20px;
  margin: 0 20px 20px;
  display: flex;
  overflow-y: scroll;
  position: relative;
}

#top-info{
  position: sticky;
  top:0px;
}

.navigation {
  display: flex;
  width: 70%;
  /* overflow: scroll; */
  flex-direction: column;
}
@media screen and (max-width: 600px){
  #hello-content {
    flex-direction: column;
    margin: 0;
    width:calc(100% - 20px * 2);
  }
  #top-info{
  position: relative;
  display: none;
  /* top:0px; */
  }
  .navigation {
  width: 100%;
  }
}
.about{
  display: flex;
  flex-direction: column;
  margin: 10px 30px;
  color: #ffffff;
}
.about a{
  color: #ffffff;
  /* text-decoration: underline; */
  cursor: pointer;
}
.about-text-course{
    color: #ffffff;
    margin-left: 15px;
}
</style>
