Vue.component('block', {
    props: ['item', 'index'],
    data: function () {
        return {
            // count: 0
        }
    },
    template: `
                        <li>
                            <div :class="'blockHead'">
                                <div>
                                    <el-checkbox v-model="done[index]"></el-checkbox>
                                    <!-- <input type="checkbox" v-model="done[index]"></input> -->
                                    <span>{{item.title}}</span>
                                </div>
                                <transition name="fade">
                                    <span :class="'done'" v-show="done[index]">已完成</span>
                                </transition>
                            </div>
                            <!-- <hr /> -->
                            <div :class="'blockBody'">
                                <a v-for="(link,index) in item.url" :href="link.ref" class="block" target="_blank"
                                    :style="defineColor(platforms[link.title-1])">
                                    <!-- <span>{{index+1}}&nbsp;&nbsp;</span> -->
                                    <img v-if="platforms[link.title-1].img!=0" :class="'icon'"
                                        :src="img_url + platforms[link.title-1].img"
                                        :alt="platforms[link.title-1].title">
                                    <span>{{platforms[link.title-1].title}}</span>
                                </a>
                            </div>
                        </li>
        `
})
Vue.component('blog-post', {
    props: ['title'],
    template: '<h3>{{ title }}</h3>'
})