import VueRouter from 'vue-router'

import Course from '@/pages/Course'
import HelloPage from '@/pages/HelloPage'
import Fanya from '@/pages/Fanya'
import Utilities from '@/pages/Utilities'
import MobileHome from '@/pages/MobileHome'

const Test = {
    template: '<div style="display:flex;color:#000;font-size:40px;height:calc(100vh - 64px);width:100vw;align-items:center;justify-content:center;background:#ffffff56"><span>暂未开放</span></div>'
}

const routes = [{
        path: '/course',
        component: Course
    },
    {
        path: '/test',
        component: Test
    },
    {
        path: '/utils',
        component: Utilities
    },
    {
        path: '/',
        component: HelloPage
    }, {
        path: '/fanya',
        component: Fanya
    }, {
        path: '/mobile',
        component: MobileHome
    }
]


export default new VueRouter({
    routes
})