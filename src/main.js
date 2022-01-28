// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'

// Router
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// Element UI
// import ElementUI from 'element-ui'
// Vue.use(ElementUI)
// import 'element-ui/lib/theme-chalk/index.css'

// Vant
// import Vant from 'vant'
// import 'vant/lib/index.css'
// import 'vant/lib/icon/local.css'
// import '@vant/touch-emulator'
// Vue.use(Vant) 


// Axios
import axios from 'axios'
Vue.prototype.$axios = axios

// Video.js
import Video from 'video.js'
import 'video.js/dist/video-js.css'
Vue.prototype.$video = Video

// iconfont
import '../static/icon/line-icon/iconfont.css'
import '../static/icon/music-controls/iconfont.css'
// jsonp
import { VueJsonp } from 'vue-jsonp'
Vue.use(VueJsonp)
    //swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
Vue.use(VueAwesomeSwiper /* { default options with global component } */ )

import { Swiper as SwiperClass, Pagination, Navigation, Mousewheel, Autoplay } from 'swiper/swiper.esm'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
SwiperClass.use([Pagination, Mousewheel, Navigation, Autoplay])
Vue.use(getAwesomeSwiper(SwiperClass))
const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)

// import JsonpCommon from './js/jsonp-common.js'
// Vue.use(JsonpCommon)

// GeminiScrollBar
import GeminiScrollbar from 'vue-gemini-scrollbar'
Vue.use(GeminiScrollbar)

Vue.config.productionTip = false


import store from './js/store'
Vue.prototype.$store = store

import router from './router'

Vue.prototype.bus = new Vue;


/* eslint-disable no-new */


new Vue({
    router,
    el: '#app',
    render: h => h(App),
    components: {
        App
    },
    template: '<App/>'
})