import Vue from 'vue'
import Vuex from 'vuex'
import UserModule from './user'
import QuotesModule from './quotes'
import TagModule from './tags'
import VuexPersistence from 'vuex-persist'


const uuid4 = require('uuid/v4')

Vue.use(Vuex)

const vuexUser = new VuexPersistence({
    storage: window.localStorage,
    modules: ['UserModule'], //only save user module
})

export default new Vuex.Store({
    modules: {
        UserModule,
        QuotesModule,
        TagModule
    },
    state: {
        appId: null
    },
    mutations: {
        setAppId: (state, appId) => state.appId = appId
    },
    actions: {
        initializeAppId({
            commit
        }) {
            let appId = window.localStorage.getItem('appId');
            if (appId) {
                commit('setAppId', appId)
            } else {
                let newAppId = uuid4();
                window.localStorage.setItem('appId', newAppId)
                commit('setAppId', newAppId)
            }
        }
    },
    plugins: [vuexUser.plugin]
})