<template>
  <div id="utils">
    <div class="tools-list">
      <div
        class="tools-category"
        v-for="(sublist, index) in toolsList"
        :key="index"
      >
        <span class="tools-category-title">{{ sublist.title }}</span>
        <div class="tools-category-list">
          <div
            class="tool-item"
            v-for="(item, index) in sublist.items"
            :key="index"
          >
            <!-- <i></i> -->
            <span>{{ item.title }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="tool-page"></div>
  </div>
</template>

<script>
export default {
  name: "Utilities",
  data() {
    return {
      toolsList: [
        {
          title: "常用工具",
          items: [
            {
              title: "Base64 编解码",
              path: "",
            },
            {
              title: "URL 编解码",
              path: "",
            },
          ],
        },
        {
          title: "转换工具",
          items: [
            {
              title: "图片与 Data URL 互转",
              path: "",
            }
          ],
        },
      ],
    };
  },
  methods: {},
  mounted() {},
  created() {},
};
</script>

<style>
:root {
  --accent-color: rgb(17, 148, 235);
}
#utils {
  display: flex;
}
.tools-list {
  box-sizing: border-box;
  padding: 20px;
  height: calc(100vh - 64px);
  width: 300px;
  /* background: #fff; */
  position: sticky;
  top: 64px;
  overflow-y: scroll;
}
.tool-page {
  width: calc(100vw - 300px);
  background: #fff;
  border-radius: 10px 0 0 0;
}
.tools-category{
  margin-bottom: 10px;
}
.tools-category-title {
  display: flex;
  padding: 10px 0;
}
.tools-category-list {
  border-radius: 10px;
  background: #fff;
  overflow: hidden;
}
.tool-item {
  /* border-radius: 10px; */
  padding: 10px 8px;
  border-bottom: 1px solid #00000012;
  transition: all 0.2s ease;
  cursor: pointer;
}
.tool-item:last-child {
  border-bottom: none;
}
.tool-item:hover {
  background: var(--accent-color);
  color: #fff;
}
.tool-item:active {
  filter: saturate(280%);
}
.tool-item .active {
  background: var(--accent-color);
  color: #fff;
}
</style>