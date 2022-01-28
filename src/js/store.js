import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
    // import { storage } from './storage'

//     pageYOffset:function(){
// return this.$store.state.pageYOffset;
// }
// _this.$store.commit("update", ["clockBoxStat", newStat]);

const store = new Vuex.Store({
    state: {
        clockBoxStat: false,
        pageYOffset: 0,
        windowHeight: 0,
        // apiPath: "http://api.mercutio.club",
        apiPath: "http://127.0.0.1:5000",
        settings: {
            clock: {
                showSeconds: false,
                twelveFormat: true,
            },
            showHitokoto: true,
            background: 'unsplash', //unsplash custom
            contents: 'half',
            blur: true,
            sideBar: {
                showDida: false,
                expand: {
                    weather: true,
                    dida: true,
                    weibo: true,
                },
                arrangement: [{
                        component: "Countdown",
                    },
                    {
                        component: "Weather",
                    },
                    {
                        component: "Weibo",
                    },
                ]
            },
            mediaCenter: {
                arrangement: [{
                        component: "Player",
                    },
                    {
                        component: "Television",
                    }
                ]
            },
            navigation: {

            },
            schoolLinks: {

            }

        },
        netEaseCokies: ''
    },
    mutations: {
        update(state, [key, value]) {
            state[key] = value;
            // console.log(key)
        },
        dida(state) {
            state.settings.sideBar.expand.dida == true ? state.settings.sideBar.expand.dida = false : state.settings.sideBar.expand.dida = true;
        }
    }
})

export default store