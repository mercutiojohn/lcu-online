// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'

import VueRouter from 'vue-router'

import Vant from 'vant'
import 'vant/lib/index.css'
import 'vant/lib/icon/local.css'
import '@vant/touch-emulator'

Vue.use(VueRouter)

Vue.use(ElementUI)

// Vue.use(Vant) 

Vue.config.productionTip = false

import Course from '@/pages/Course'
import HelloPage from '@/pages/HelloPage'
import Classic from '@/pages/Classic'
import Fanya from '@/pages/Fanya'
// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
const Test = {
  template: '<div style="display:flex;color:#fff;font-size:40px;height:100%;width:100vw;align-items:center;justify-content:center;background:#ffffff56"><span>暂未开放</span></div>'
}

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [{
    path: '/course',
    component: Course
  },
  {
    path: '/test',
    component: Test
  },
    {
      path: '/classic',
      component: Classic
    },
  {
    path: '/',
    component: HelloPage
  }, {
    path: '/fanya',
    component:Fanya
  }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能

// 现在，应用已经启动了！
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
