<template>
  <div id="course">
    <div id="course-catgory-list">
      <ul>
        <li v-for="(item,index) in list">{{item.title}}</li>
      </ul>
    </div>
    <!-- <span>{{data.title}}</span> -->
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
      list:""
    };
  },
  methods:{
    getCourseData(){
      this.list=require('@/assets/data/courseData.json')
    },
    getList(){
      this.list=require('@/assets/data/list.json')
    },
    getListData(id){
      path='@/assets/data/list/'+id+'.json';
      // this.listData=require(path)
    }
  },
  created() {
    this.getCourseData();
    this.getList();
  },
};
</script>

<style>
</style>