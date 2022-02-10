<template>
<div class="NetEase">
    <div class="logs">
    netease
    {{listid}}
    </div>
</div>
</template>

<script>
export default {
name: "NetEase",
components: {},
data() {
return {
    listid:''
};
},
computed: {},
watch: {},
methods: {
    
},
created(){},
mounted(){
    this.listid = this.$route.query.listid

},
beforeDestroy(){}
};
</script>

<style>
</style>