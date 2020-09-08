<template>
  <div class="hello-page">
    <div id="hello-background"></div>
    <div id="hello-content">
      <div id="top-info">
        <CalendarBox />
      </div>
      <div class="navigation">
        <Navigation title="常用网站" :sites="sites"/>
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
    Navigation
  },
  data() {
    return {
      sites: [
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
          title: "传智播客",
          color: "#ffffff",
          icon: "ityxb.png",
          url: "http://stu.ityxb.com/Classroom/course/learning",
        },
        {
          title: "学习通课堂",
          color: "#309fff",
          icon: "chaoxing.png",
          url: "https://mooc2-ans.chaoxing.com/visit/interaction",
        },
        {
          title: "学习通",
          color: "#b52831",
          icon: "chaoxing.png",
          url: "https://i.chaoxing.com/base",
        },
        {
          title: "有道精品课",
          color: "#fb4a3e",
          icon: "youdao.png",
          url: "https://ke.youdao.com/",
        },
        {
          title: "批改网",
          color: "#28aae1",
          icon: "pigai.png",
          url: "http://www.pigai.org/index.php?c=write&a=myclass&f2=login",
        },
        {
          title: "中国大学MOOC",
          color: "#ffffff",
          icon: "mooc.png",
          url: "https://www.icourse163.org/",
        },
        {
          title: "优学院",
          color: "#ea5145",
          icon: "youxy.png",
          url: "https://www.ulearning.cn/",
        },
        {
          title: "易班优课",
          color: "#ffffff",
          icon: "yooc.png",
          url: "http://yooc.me/",
        },
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
        },
        {
          title: "腾讯云控制台",
          color: "#ffffff",
          icon: "txy.svg",
          url: "https://console.cloud.tencent.com/",
        },
        {
          title: "GitHub Stars",
          color: "#24292e",
          icon: "github.svg",
          url: "https://github.com/mercutiojohn?tab=stars",
        },
      ]
    };
  },
  methods: {},
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
  z-index: -1;
  background: url(https://bing.rthe.net/wallpaper) no-repeat fixed center/cover;
}
#hello-content {
  background: #ffffff23;
  width: calc(100% - 80px);
  min-height: calc(100vh - 150px);
  padding: 20px;
  border-radius: 20px;
  margin: 0 20px 20px;
  display: flex;
}

</style>
