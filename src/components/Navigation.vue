<template>
  <div class="nav">
    <div class="nav-often">
      <span class="nav-title">常用网站</span>
      <div class="nav-content">
        <a v-for="(item,index) in sites" :key="index" :href="item.url" target="_blank">
          <div class="nav-block" :style="'background-color:'+item.color">
            <img class="nav-block-icon" :src="getIcon(item.icon)" alt />
            <span class="nav-block-title" :style="'color:'+ifWhite(item.color)">{{item.title}}</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      imgUrl: "assets/img/",
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
          color: "#0bb55a",
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
          url: "https://www.maka.im/workspace/works"
        },
        {
          title: "创客贴",
          color: "#005ffe",
          icon: "ckt.svg",
          url: "https://www.chuangkit.com/designtools/startdesign"
        },{
          title: "腾讯云控制台",
          color: "#ffffff",
          icon: "txy.svg",
          url: "https://console.cloud.tencent.com/"
        }
      ],
    };
  },
  methods: {
    ifWhite(color) {
      if (color == "#ffffff") {
        return "#000000";
      } else {
        return "#FFFFFF";
      }
    },
    getIcon(icon) {
      const a = require("@/assets/img/" + icon);
      return a;
    },
  },
};
</script>   

<style>
.nav-content {
  display: flex;
  flex-direction: column;
  /* width: calc((150px + 10px) * 3); */
  height: calc((100px + 10px) * 5);
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: visible;

}
.nav-block {
  width: 150px;
  height: 100px;
  border-radius: 15px;
  background: #ffffff23;
  margin: 0 10px 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: transform 0.5s ease;
}
.nav-block:hover {
  backdrop-filter: blur(50px) saturate(180%);
  background: #ffffff63 !important;
  color: white !important;
  transform: scale(1.04);
  transition: transform,box-shadow,background 0.5s ease-out;
  box-shadow: 0 5px 20px 5px #00000023;
}
.nav-block:active {
  backdrop-filter: blur(50px) saturate(180%);
  background: #00000023 !important;
  color: white !important;
  transform: scale(1);
  transition: transform,background 0.5s ease-out;
}
.nav-block-icon {
  height: 40px;
}
.nav-block-title {
  margin-top: 10px;
}
.nav-title {
  color: #fff;
  font-size: 20px;
  text-shadow: 0 5px 10px #00000083;
  margin-bottom: 20px;
}
.nav{
  display: flex;
  /* overflow-x: scroll; */
  /* overflow-y: hidden; */
}
.nav-often{
  display: flex;
  flex-direction: column;
  width: calc((150px + 10px) * 3);
  overflow: visible;
  padding-left: 10px;
}
</style>