import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        clockBoxStat: false,
        apiPath: "http://api.mercutio.club"
    },
    mutations: {
        update(state, [key, value]) {
            state[key] = value;
        },
    }
})

export default store