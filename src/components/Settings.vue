<template>
  <div class="settings">
    <el-switch></el-switch>
    <div class="setting-title">时间</div>
    <div class="setting-item-group">
      <div class="setting-item">
        显示秒<input
          type="checkbox"
          name="check"
          id="check"
          v-model="settingDetails.clock.showSeconds"
        />
      </div>
      <div class="setting-item">
        12小时制<input
          type="checkbox"
          name="check"
          id="check"
          v-model="settingDetails.clock.twelveFormat"
        />
      </div>
    </div>
    <div class="setting-title">界面</div>
    <div class="setting-item-group">
      <div class="setting-item">
        显示随机一句和提示<input
          type="checkbox"
          name="check"
          id="check"
          v-model="settingDetails.showHitokoto"
        />
      </div>
      <div class="setting-item">
        背景图片<select name="123" id="" v-model="settingDetails.background">
          <option value="unsplash">来自Unsplash</option>
          <option value="custom">自定义图片...</option>
          <option value="none">关闭</option>
        </select>
      </div>
      <div class="setting-item">
        导航及内容显示方式<select name="456" id="" v-model="settingDetails.contents">
          <option value="full">满屏</option>
          <option value="half">半屏</option>
          <option value="scroll">滚动</option>
          <option value="none">关闭</option>
        </select>
      </div>
      <div class="setting-item">
        毛玻璃效果<input
          type="checkbox"
          name="check"
          id="check"
          v-model="settingDetails.blur"
        />
      </div>
    </div>
    <div class="setting-title">左边栏</div>
    <div class="setting-item-group">
      <div class="setting-item">
        显示滴答清单<input
          type="checkbox"
          name="check"
          id="check"
          v-model="settingDetails.sideBar.showDida"
        />
      </div>
    </div>
    <!-- {{ settingDetails }}1 -->
  </div>
</template>

<script>
import { Button, Select, Switch } from "element-ui";
export default {
  name: "Setttings",
  components: {
    Button,
    Switch,
    Select,
  },
  data() {
    return {};
  },
  computed: {
    settingDetails: function () {
      let tmp = this.$store.state.settings;
      // console.log(encodeURIComponent(JSON.stringify(tmp)));
      localStorage.setItem("settings", encodeURIComponent(JSON.stringify(tmp)));
      return tmp;
    },
  },
  watch: {},
  methods: {},
  created() {},
  mounted() {
  },
  beforeDestroy() {},
};
</script>

<style>
.settings {
  color: var(--main-color);
  box-sizing: border-box;
  padding: 0 20px;
}
.setting-title {
  display: flex;
  padding: 10px 8px;
  color:var(--inactive-color);  
}
.setting-item {
    display: flex;
    justify-content: space-between;
  padding: 10px 8px;
  border-bottom: 1px solid #00000012;
  transition: all 0.2s ease;
  cursor: pointer;
}
.setting-item:last-child {
  border-bottom: none;
}
.setting-item:hover {
  /* background: var(--accent-color-opa); */
  background: var(--first-assist-color);
  /* color: #fff; */
}
.setting-item-group {
  border-radius: 10px;
  background: var(--elem-color);
  overflow: hidden;
}
</style>