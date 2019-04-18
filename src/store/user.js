import pick from 'lodash.pick'
import { db } from '@/main'
import firebase from 'firebase'
import quotes, {getNumberOfQuoteLikes} from './quotes'


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

export async function getUserNick(userId) {
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
            
        },
        async fetchAllAuthors() {
            let authorsSnap = await db.collection('users').get()
            return await Promise.all(authorsSnap.docs.map(async (authorDoc) => {
                // Fetch all author quotes
                let quoteStatisticsPromArray = []
                let quotesOfAuthorSnap = await db.collection('quotes').where('userId', '==', authorDoc.id).get()
                for (let quoteDoc of quotesOfAuthorSnap.docs) {
                    quoteStatisticsPromArray.push(getNumberOfQuoteLikes(quoteDoc.id, true))
                }
                let quotesLikes = await Promise.all(quoteStatisticsPromArray)
                // Fetch statistics to to quotes
                return {
                    id: authorDoc.id,
                    numOfPositiveLikes: quotesLikes.reduce((a, b) => a + b),
                    numOfQuotes: quotesOfAuthorSnap.docs.length,
                    nick: await getUserNick(authorDoc.id)
                }
            }))
        }
    },
    getters: {
        isLoggedIn: (state) => Object.keys(state.user).length > 0,
        userNick: state => state.nick,
        loggedInUser: state => state.user
    }
}