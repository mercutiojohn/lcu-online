import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        clockBoxStat: false,
        pageYOffset: 0,
        windowHeight: 0,
        apiPath: "http://api.mercutio.club"
    },
    mutations: {
        update(state, [key, value]) {
            state[key] = value;
        },
    }
})

export default store