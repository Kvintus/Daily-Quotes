import pick from 'lodash.pick'
import { db } from '@/main'
import firebase from 'firebase'

// var config = {
//     apiKey: "AIzaSyAFiEXWGCwqexkQs7oll2GDhk0VAUyQsb4",
//     authDomain: "daily-quotes-33683.firebaseapp.com",
//     databaseURL: "https://daily-quotes-33683.firebaseio.com",
//     projectId: "daily-quotes-33683",
//     storageBucket: "daily-quotes-33683.appspot.com",
//     messagingSenderId: "1049725847136"
//   };

// if (!firebase.apps.length) {
//     firebase.initializeApp(config);
// }

async function checkIfUserExistsInUserCollection(userId) {
    let userRef = db.collection('users').doc(userId)
    let doc = await userRef.get()
    return doc.exists
}

async function addUserWithDefaultName(user) {
    await db.collection('users').doc(user.uid).set({
        nick: user.displayName
    })
}

async function getUserNick(userId) {
    let doc = await db.collection('users').doc(userId).get()
    return doc.data().nick
}

export default {
    state: {
        user: {},
        token: null,
        nick: ""
    },
    mutations: {
        setUser: (state, user) => state.user = user,
        setToken: (state, token) => state.token = token,
        setNick: (state, nick) => state.nick = nick,
        setUserFromFirestoreObject: (state, user) => state.user = pick(user, ['uid', 'photoUrl', 'email', 'displayName'])
    },
    actions: {
        async logUserIn({commit, dispatch}) {
            var provider = new firebase.auth.GoogleAuthProvider();
            return firebase.auth().signInWithRedirect(provider)
        },
        async getAndSetUserNick({commit}, userId) {
            let nick = await getUserNick(userId);
            commit('setNick', nick)
        },
        async signUserOut({commit}) {
            await firebase.auth().signOut()
        },
        async clearUser({commit}) {
            commit('setUser', {})
            commit('setToken', null)
            commit('setNick', null)
        },
        async updateUser({commit, state}, payload) {
            await db.collection('users').doc(state.user.uid).set(payload)
            // No error so successfull
            let updated = await db.collection('users').doc(state.user.uid).get()
            console.log('updated: ', updated);
            
        }
    },
    getters: {
        isLoggedIn: (state) => Object.keys(state.user).length > 0,
        userNick: state => state.nick,
        loggedInUser: state => state.user
    }
}