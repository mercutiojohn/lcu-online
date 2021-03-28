<template>
  <div class="homeworks">
    <div class="homeworks-title">
      <span>作业通知</span>
    </div>
    <div class="homeworks-list">
      <a v-for="(item, key) in data" :key="key" :href="item.url">
        <div class="homework-card">
          <div class="card-title">
            <span class="homework-type">{{ item.type }}</span>
            <span class="homework-title">{{ item.title }}</span>
          </div>
          <div class="card-details">
            <span class="homework-countdown">{{ item.countdown_string }}</span>
            <span class="homework-course-name">{{ item.course_name }}</span>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
<script>
const axios = require("axios");
export default {
  name: "Homeworks",
  data() {
    return {
      login: {
        uname: "LCU2018205700",
        pwd: "gyc123456",
      },
      data: [
        {
          countdown_string: "1天1小时49分",
          course_name: "移动应用开发",
          isStopped: 0,
          time: 1616943600.0,
          title: "第六12次作业",
          type: "作业",
          url:
            "https://www.eec-cn.com/workAnswer/4028804277b8a7530177cb1af99d10c2/40288042786ec36d0178718b5b520876/true?isPiYue=noPiYue",
        },
        {
          countdown_string: "1天1小时49分",
          course_name: "移动应用开发",
          isStopped: 0,
          time: 1616943600.0,
          title: "第六12次作业",
          type: "作业",
          url:
            "https://www.eec-cn.com/workAnswer/4028804277b8a7530177cb1af99d10c2/40288042786ec36d0178718b5b520876/true?isPiYue=noPiYue",
        },
        {
          countdown_string: "1天1小时49分",
          course_name: "移动应用开发",
          isStopped: 0,
          time: 1616943600.0,
          title: "第六12次作业",
          type: "作业",
          url:
            "https://www.eec-cn.com/workAnswer/4028804277b8a7530177cb1af99d10c2/40288042786ec36d0178718b5b520876/true?isPiYue=noPiYue",
        },
      ],
    };
  },
  methods: {
    getContent() {
      axios
        .get("http://api.mercutio.club/fuck_qst", {
          method: "GET",
          timeout: 50000,
          withCredentials: true,
          transformRequest: [
            function (data, headers) {
              return data;
            },
          ],
          // 其他请求配置...
        })
        .then(({ data }) => {
          console.log(data);
          this.data = data.content;
          print("");
        })
        .catch(console.error);
    },
  },
  created() {
    this.getContent();
  },
};
</script>
<style>
.homework-card {
  padding: 10px 20px;
  border-bottom: 1px solid var(--main-color-opa);
  /* border-radius: 10px; */
}
.homework-card:hover {
  background: #00000023;
  transition: all 0.2s ease;
}
.homeworks-title {
  padding: 10px 20px;
  border-bottom: 5px solid #00000013;
}
.card-title {
  display: flex;
  align-items: center;
  font-size: 15px;
  margin-bottom: 2px;
}
.homework-type {
  padding: 1px 4px;
  border-radius: 2px;
  background: var(--first-assist-color);
  margin-right: 5px;
}
.card-details {
  font-size: 12px;
  color: var(--main-color-assist);
}
.homework-countdown {
  font-weight: 800;
  color: var(--main-color);
}
.homeworks a {
  text-decoration: none;
  color: var(--main-color);
}
</style>