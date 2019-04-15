import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import firebase from 'firebase';
import pick from 'lodash.pick'

Vue.config.productionTip = false

var config = {
  apiKey: "AIzaSyAFiEXWGCwqexkQs7oll2GDhk0VAUyQsb4",
  authDomain: "daily-quotes-33683.firebaseapp.com",
  databaseURL: "https://daily-quotes-33683.firebaseio.com",
  projectId: "daily-quotes-33683",
  storageBucket: "daily-quotes-33683.appspot.com",
  messagingSenderId: "1049725847136"
};
firebase.initializeApp(config);
// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

// Set the user upon App start
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('user is logged');
    store.commit('setUser', pick(user, ['uid', 'photoUrl', 'email', 'displayName']))
    store.dispatch('getAndSetUserNick', user.uid)
  } else {
    console.log('user logged out');
    store.dispatch('clearUser')
  }
})

export const auth = firebase.auth()
export const db = firebase.firestore()

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    this.$store.dispatch('initializeAppId')
  }
}).$mount('#app')
