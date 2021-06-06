<template>
  <div class="weather">
    <transition name="fade" type="out-in">
      <div class="change-city" v-if="citySelect">
        <span class="title">切换城市</span>
        <input type="text" v-model="cityTemp" />
        <div class="options">
          <button @click="changeSelect">确定</button>
          <button @click="cancelSelect">取消</button>
        </div>
      </div>
    </transition>
    <!-- <transition name="fade" type="out-in">
      <div class="warning-details" v-if="warningLookup">
        <div class="header" :style="{ 'background-color': aqiLevelColorTrans(airInfo.level) }">
          <span class="title">{{ item.typeName }}{{item.level}}</span>
          <button @click="warningLookup = false">确定</button>
        </div>
        <span class="content"></span>
      </div>
    </transition> -->
    <transition name="fade" type="out-in">
      <div class="weather-content" v-if="!citySelect">
        <span class="city" @click="changeSelect">{{ city }}</span>
        <div class="weather-loading" v-if="loading">
          <span>天气加载中</span>
        </div>
        <div class="tmp-n-brief" v-if="!loading">
          <span class="temprature">{{ tmpNew }}°</span>
          <span class="brief">{{ briefNew }}</span>
        </div>
        <div
          class="air-info"
          v-if="!loading"
          :style="{ 'background-color': aqiLevelColorTrans(airInfo.level) }"
        >
          <span class="aqi">{{ airInfo.aqi }}</span>
          <span class="level">{{ airInfo.category }}</span>
        </div>
        <div class="warning-info" v-if="!loading">
          <div class="info-item" v-for="(item, index) in warning" :key="index">
            <div
              class="label"
              :style="{ 'background-color': warningColorTrans(item.level) }"
            >
              <span class="type">{{ item.typeName }}</span>
              <span class="level">{{ item.level }}</span>
              <span>预警</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "weather",
  components: {},
  data() {
    return {
      loading: true,
      city: "北京",
      tmpNew: "0",
      briefNew: "加载中",
      tmpOld: "",
      briefOld: "",
      resOld: "",
      resWeatherContent: "",
      airInfo: {
        pubTime: "2021-05-13T11:00+08:00",
        aqi: "0",
        level: "1",
        category: "加载中",
        primary: "NA",
        pm10: "22",
        pm2p5: "10",
        no2: "11",
        so2: "8",
        co: "0.4",
        o3: "95",
      },
      resGeo: "",
      citySelect: false,
      cityTemp: "",
      aqi: "",
      aqiLevel: "",
      warning: [
        // {
        //   id: "1010601202006202220000501",
        //   pubTime: "2020-06-20T22:20+08:00",
        //   title: "吉林省长春市气象台发布大风蓝色预警",
        //   startTime: "",
        //   endTime: "",
        //   status: "预警中",
        //   level: "蓝色",
        //   type: "大风",
        //   text:
        //     "长春市气象台2020年6月20日22时20分发布大风蓝色预警信号:预计未来24小时内，我市有5-6级西南风，瞬间风力可达7-8级，市应急管理局、市气象局联合提醒，注意做好防范。（预警信息来源：国家预警信息发布中心）",
        // },
        // {
        //   id: "1010601202006202220000501",
        //   pubTime: "2020-06-20T22:20+08:00",
        //   title: "吉林省长春市气象台发布大风蓝色预警",
        //   startTime: "",
        //   endTime: "",
        //   status: "预警中",
        //   level: "红色",
        //   type: "暴雨",
        //   text:
        //     "长春市气象台2020年6月20日22时20分发布大风蓝色预警信号:预计未来24小时内，我市有5-6级西南风，瞬间风力可达7-8级，市应急管理局、市气象局联合提醒，注意做好防范。（预警信息来源：国家预警信息发布中心）",
        // },
      ],
      warningLookup: false,
      timer:''
    };
  },
  computed: {},
  watch: {
    city(newCity){
      localStorage.weather_city = newCity;
    }
  },
  methods: {
    searchWeather: async function () {
      this.loading = true;
      //注意：这里有 async 用来完成异步操作
      //由于调用api是异步操作
      //在请求的时候需要用async+await让它同步，否则数据不好取出
      //如果没有await返回的是一个Promise 对象，我学术短浅，暂时没学到，不会取

      let key = "0ae07031c52c4d448cb26af87903d648"; //引号中放入前面保存的key

      //方法一：老的API
      //老的api
      //这里的引号是tab键上面的引号，主要作用是方便数据拼接
      // let httpUrlOld = `https://free-api.heweather.net/s6/weather/now?location=${this.city}&key=${key}`;
      // let resOld = await fetch(httpUrlOld); //请求数据
      // let resultOld = await resOld.json(); //将请求的数据转换为json数据类型
      // let nowOld = resultOld.HeWeather6[0].now; //获取到json数据中的实况天气
      // console.log(nowOld);
      // this.tmpOld = nowOld.tmp; //获取到当前温度
      // this.briefOld = nowOld.cond_txt; //获取到当前天气
      // this.resOld = resultOld;

      //方法二：新的API
      //获取城市的ID
      let locUrl = `https://geoapi.qweather.com/v2/city/lookup?location=${this.city}&key=${key}`;
      let locRes = await fetch(locUrl);
      let locResult = await locRes.json();
      // console.log(locResult);
      let id = locResult.location[0].id;
      this.resGeo = locResult;
      //根据城市id获取具体的天气
      let httpUrl1 = `https://devapi.qweather.com/v7/weather/now?location=${id}&key=${key}`;
      let weatherRes = await fetch(httpUrl1);
      let weatherResult = await weatherRes.json();
      // console.log(weatherResult);
      this.resWeatherContent = weatherResult.now;

      let nowWeather = weatherResult.now;
      this.tmpNew = nowWeather.temp;
      this.briefNew = nowWeather.text;
      //根据城市id获取空气指数
      let airUrl = `https://devapi.qweather.com/v7/air/now?location=${id}&key=${key}`;
      let airRes = await fetch(airUrl);
      let airResult = await airRes.json();
      // console.log(airResult);
      this.airInfo = airResult.now;

      let nowAir = airResult.now;
      this.aqi = nowAir.aqi;
      this.aqiLevel = nowAir.category;
      //根据城市id获取预警信息
      let warnUrl = `https://devapi.qweather.com/v7/warning/now?location=${id}&key=${key}`;
      let warnRes = await fetch(warnUrl);
      let warnResult = await warnRes.json();
      // console.log(warnResult);
      this.warning = warnResult.warning;
      this.loading = false;
    },
    changeSelect() {
      this.citySelect
        ? ((this.city = this.cityTemp),
          this.searchWeather(),
          (this.citySelect = false))
        : ((this.cityTemp = this.city), (this.citySelect = true));
    },
    cancelSelect() {
      this.citySelect = false;
    },
    warningColorTrans(colorName) {
      switch (colorName) {
        case "蓝色":
          return "#00b7ff";
        case "黄色":
          return "#f78d02";
        case "橙色":
          return "#e95500";
        case "红色":
          return "#d61857";
        default:
          return "#6e6e6e";
      }
    },
    aqiLevelColorTrans(level) {
      switch (level) {
        case "1":
          return "#00be7f";
        case "2":
          return "#00b7ff";
        case "3":
          return "#f1ba02";
        case "4":
          return "#e95500";
        case "5":
          return "#d61857";
        case "6":
          return "#430091";
        default:
          return "#6e6e6e";
      }
    },
  },
  created() {},
  mounted() {
    if (localStorage.weather_city)
      this.city = localStorage.weather_city;
    this.searchWeather();
    let _this = this;
    this.timer = setInterval(()=>{
      _this.searchWeather();
    },3600000);
  },
  beforeDestroy() {},
};
</script>

<style>
hello {
  color: #f1ba02;
}
.weather {
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgb(0, 140, 255), rgb(36, 211, 255));
  user-select: none;
  box-sizing: border-box;

}
.weather-content {
  min-height: 100%;
  padding: 20px;
  /* color: var(--main-color); */
  color: #fff;
  box-sizing: border-box;
}
.weather-loading {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.city{
  padding: 3px;
  cursor: pointer;
}
.city:active {
  border-radius: 5px;
  background: #00000034;
}
.tmp-n-brief {
  /* display: flex; */
  /* flex-direction: column; */
}
.tmp-n-brief > .temprature {
  font-size: 80px;
  font-family: Mitype2018,ProximaNova, Politica, Palatino, Caecilia,
    Bookerly;
  font-weight: 900;
  /* padding: 0 0 10px 0; */
}
.tmp-n-brief > .brief {
  font-size: 25px;
}
.change-city {
  /* position: absolute;
  top:0;
  left: 0; */
  width: 100%;
  box-sizing: border-box;
  background: var(--elem-color);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-evenly;
  padding: 20px;
  height: 100%;
}
.change-city > .title {
  /* text-align: center; */
  font-size: 25px;
  font-weight: 800;
  color: var(--main-color);
}
.change-city > input {
  background: var(--first-assist-color);
  transition: all 0.2s ease;
  border: 3px solid transparent;
  padding: 10px 5px;
  font-size: 22px;
  border-radius: 10px;
  color: var(--main-color);
}

.change-city > input:focus {
    background: var(--second-assist-color);

  border-color: var(--accent-color);
}
.change-city > .options {
  display: flex;
  justify-content: center;
}
.options button {
  border: none;
  background: var(--first-assist-color);
  color: var(--main-color);
  height: 50px;
  width: 80px;
  border-radius: 25px;
  transition: all 0.2s ease;
  margin: 0 10px;
  cursor: pointer;
}
.options button:active {
  background: var(--accent-color);
  transform: scale(1.5);
  color: #fff;
}
.air-info {
  display: flex;
  width: max-content;
  background: #6e6e6e;
  border-radius: 5px;
  padding: 2px 5px;
  align-items: center;
  margin: 0 0 5px 0;
  /* justify-content: baseline; */
}
.air-info > .aqi {
  font-family: ProximaNova, Mitype2018-90;
  font-size: 20px;
  padding-right: 5px;
}
.info-item > .label > .level {
}
.info-item > .label {
  display: flex;
  width: max-content;
  background: #6e6e6e;
  border-radius: 5px;
  padding: 2px 5px;
  align-items: center;
  margin: 5px 0;
}
</style>