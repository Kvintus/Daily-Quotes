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
        setNick: (state, nick) => state.nick = nick
    },
    actions: {
        async logUserIn({commit, dispatch}) {
            var provider = new firebase.auth.GoogleAuthProvider();
            return firebase.auth().signInWithPopup(provider).then(function(result) {
               
                let user = pick(result.user, ['uid', 'photoUrl', 'email', 'displayName'])
                commit('setToken', result.credential.accessToken)
                commit('setUser', user)
                checkIfUserExistsInUserCollection(user.uid).then(exists => {
                    if (!exists) {
                        addUserWithDefaultName(user)
                    } else {
                        getUserNick(user.uid).then(nick => commit('setNick', nick))
                    }
                })

                // Set Auth chagne callback
                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                      // User is signed in.
                    } else {
                        dispatch('clearUser')
                    }
                  });
              }).catch(function(error) {
                //TODO: Handle error
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
        },
        async logUserOut({commit}) {
            await firebase.auth().signOut()
        },
        async clearUser({commit}) {
            commit('setUser', {})
            commit('setToken', null)
        },
        retrieveAndSetCurrentUser({commit}) {
            var user = firebase.auth().currentUser;
            console.log(user);
        }
    },
    getters: {
        isLoggedIn: (state) => state.token != undefined
    }
}