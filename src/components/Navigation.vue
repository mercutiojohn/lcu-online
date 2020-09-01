<template>
  <div class="navigation">
      <div class="nav-block" v-for="(item,index) in sites" :key="index">
          <img class="nav-block-icon" :src="item.icon" alt="">
          <span class="nav-block-title">{{item.title}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      sites: [
        {
          title: "U+新工科智慧云",
          color: "#1e83ca",
          icon: "plus.png",
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
          title: "学习通",
          color: "#b52831",
          icon: "chaoxing.png",
          url: "http://i.chaoxing.com/base",
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
          color: "",
          icon: "",
          url: "http://yooc.me/",
        },
        // {
        //   title: "千锋",
        //   color: "",
        //   icon: "",
        //   url: "http://nz.1000phone.com/studentIndex"
        // },
        // {
        //   title: "B站",
        //   color: "#00b5e5",
        //   icon: "bilibili.png",
        //   url: "https://space.bilibili.com/4325844/favlist"
        // }
      ],
    };
  },
  methods: {},
};
</script>

<style>
</style>