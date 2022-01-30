import VueRouter from 'vue-router'

import Course from '@/pages/Course'
import HelloPage from '@/pages/HelloPage'
import Fanya from '@/pages/Fanya'
import Utilities from '@/pages/Utilities'
import MobileHome from '@/pages/MobileHome'
import Detail from '@/pages/Detail'

import NotFound from '@/pages/NotFound'

import NetEase from '@/pages/detail_pages/NetEase'
import BiliBili from '@/pages/detail_pages/BiliBili'

const Test = {
    template: '<div style="display:flex;color:#000;font-size:40px;height:calc(100vh - 64px);width:100vw;align-items:center;justify-content:center;background:#ffffff56"><span>暂未开放</span></div>'
}

const routes = [{
        name: 'Course',
        path: '/course',
        component: Course
    },
    {
        name: 'Test',
        path: '/test',
        component: Test
    },
    {
        name: 'Utilities',
        path: '/utils',
        component: Utilities
    },
    {
        name: 'Home',
        path: '/',
        component: HelloPage
    }, {
        path: '/fanya',
        component: Fanya
    }, {
        path: '/mobile',
        component: MobileHome
    }, {
        name: 'Detail',
        path: '/c',
        component: Detail,
        children: [{
                name: 'NetEase',
                path: 'netease',
                component: NetEase
            }, {
                name: 'BiliBili',
                path: 'bilibili',
                component: BiliBili
            },

        ]
    }, {
        path: '*',
        component: NotFound
    }
]


export default new VueRouter({
    mode: 'history',
    routes
})