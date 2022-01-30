<template>
<div class="not-found">
    <span class="title">404</span>
    <span class="content">页面未找到</span>
</div>
</template>

<script>
export default {
name: "NotFound",
components: {},
data() {
return {

};
},
computed: {},
watch: {},
methods: {},
created(){},
mounted(){},
beforeDestroy(){}
};
</script>

<style>
.not-found{
    /* background:#eee; */
    display:flex;
    height:calc(100vh - 64px);
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.title{
    color:var(--main-color);
    font-size: 100px;
}
.content{
    color:var(--main-color);
    font-size: 30px;
}
</style>