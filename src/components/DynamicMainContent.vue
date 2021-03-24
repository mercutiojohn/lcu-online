<template>
    <div id="dynamic-main-content">
        <div class="dynamic-left">
            <div class="dynamic-left-background">
                <CalendarBox />
            </div>
        </div>
        <div class="dynamic-right">
        </div>
    </div>
</template>
<script>
import CalendarBox from "@/components/CalendarBox";

export default {
    name:'DynamicMainContent',
    components:{
        CalendarBox
    },
    data() {
        return {

        }
    },
    methods:{

    }
}
</script>
<style>
:root{
    --dynamic-border-radius:5px;
}
#dynamic-main-content{
    box-sizing: border-box;
    height: 300px;
    display: flex;
}
.dynamic-left{
    /* width: 60%; */
    flex:1;
    height: 100%;
    background: #000;
    border-radius: var(--dynamic-border-radius);
    margin-right: 10px;
    overflow: hidden;
}
.dynamic-right{
    width: 300px;
    height: 100%;
    background: #ccc;
    border-radius: var(--dynamic-border-radius);
}
.dynamic-left-background{
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 0;
  background: url(https://source.unsplash.com/random/1920x1080) no-repeat fixed
    center/cover #444;
}
</style>