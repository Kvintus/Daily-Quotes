import Vue from 'vue'
import Vuex from 'vuex'
import UserModule from './user'
import QuotesModule from './quotes'
import TagModule from './tags'

const uuid4 = require('uuid/v4')

Vue.use(Vuex)

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
    }
})