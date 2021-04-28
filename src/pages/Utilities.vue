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
            :class="{
              'tool-item': true,
              'tool-item-active': ifCurrTab(index, toolItemIndex),
            }"
            v-for="(item, toolItemIndex) in sublist.items"
            :key="toolItemIndex"
            @click="updateIndex(index, toolItemIndex)"
          >
            <!-- <i></i> -->
            <span>{{ item.title }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="tool-page">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <component v-bind:is="currentTabComponent" class="tab"></component>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import UrlEncode from "@/components/tools/UrlEncode";
import Base64 from "@/components/tools/Base64";
// import Vue from "vue";
// Vue.component("under-construction", {
//   template: "<div style='height:100%;display:flex;align-items:center;justify-content:center;'>正在建设中</div>",
// });
export default {
  name: "Utilities",
  components: {
    // Editor,
    // Player,
    // Dyn,
    Base64,
    UrlEncode
  },
  data() {
    return {
      current: {
        list: 0,
        tab: 0,
      },
      toolsList: [
        {
          title: "编码转换",
          items: [
            {
              title: "Base64 编码",
              component: "Base64",
            },
            {
              title: "URL 编码",
              component: "UrlEncode",
            },
          ],
        },
        // {
        //   title: "类型转换",
        //   items: [
        //     {
        //       title: "图片与 Data URL 互转",
        //       component: "under-construction",
        //     },
        //     {
        //       title: "Unix 时间戳转换",
        //       component: "under-construction",
        //     },
        //   ],
        // },
      ],
    };
  },
  computed: {
    currentTabComponent: function () {
      let a = this.toolsList[this.current.list].items[this.current.tab]
        .component;
      console.log(a);
      return a;
    },
  },
  methods: {
    updateIndex(list, item) {
      this.current.list = list;
      this.current.tab = item;
    },
    ifCurrTab(list, item) {
      if (this.current.list == list && this.current.tab == item) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {},
  created() {},
};
</script>

<style>
#utils {
  color: var(--main-color);
  display: flex;
}
.tools-list {
  box-sizing: border-box;
  padding: 20px;
  height: calc(100vh - 64px);
  width: 300px;
  /* background: var(--elem-color); */
  position: sticky;
  top: 64px;
  overflow-y: scroll;
}
.tool-page {
  width: calc(100vw - 300px);
  background: var(--elem-color);
  border-radius: 10px 0 0 0;
  overflow: hidden;
}
.tools-category {
  margin-bottom: 10px;
}
.tools-category-title {
  display: flex;
  padding: 10px 0;
}
.tools-category-list {
  border-radius: 10px;
  background: var(--elem-color);
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
  background: var(--accent-color-opa);
  color: #fff;
}
.tool-item:active {
  background: var(--accent-color);
  color: #fff;
}
.tool-item-active {
  background: var(--accent-color)!important;
  color: var(--elem-color);
  cursor:unset;
}
</style>