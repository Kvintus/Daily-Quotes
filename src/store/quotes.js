import { db } from '@/main'
import firebase from 'firebase'

export default {
    state: {
        allQuotes: [],
        authorQuotes: {
            authorId: null,
            authorNick: null,
            quotes: []
        }
    },
    mutations: {
        setAuthorQuotes: (state, payload) => {
            state.authorQuotes.quotes = payload.quotes
            state.authorQuotes.authorId = payload.authorId
            state.authorQuotes.nick = payload.nick
        },
        removeQuoteFromAuthorQuotes: (state, quoteId) => {
            state.authorQuotes.quotes = state.authorQuotes.quotes.filter(quote => quote.id != quoteId)
        },
        setAllQuotes: (state, quotes) => state.allQuotes = quotes
    },
    actions: {
        async createQuote({commit}, quote) {
            await db.collection('quotes').doc().set(quote)
        },
        async deleteQuote({commit}, quoteId) {
            await db.collection('quotes').doc(quoteId).delete()
            commit('removeQuoteFromAuthorQuotes', quoteId)
        },
        async likeQuote({rootGetters}, {quoteId, positive}) {
            let currentUserId = rootGetters.loggedInUser.uid
            let likeSnapshot = await db.collection('hearts').where('userId', '==', currentUserId).where('quoteId', '==', quoteId).get()
            
            if (likeSnapshot.size) {
                likeSnapshot.forEach(like => {
                    if (like.data().positive === positive) {
                        like.ref.delete()
                    }
                    like.ref.update({positive})
                })
            } else {
                await db.collection('hearts').doc().set({
                    userId: currentUserId,
                    quoteId,
                    positive, 
                })
            }
        },
        async fetchAuthorQuotes({commit}, authorId) {
            let quotesSnapshot = await db.collection('quotes').where('userId', '==', authorId).get()
            let nick = (await db.collection('users').doc(authorId).get()).data().nick
            let quotes = []
            quotesSnapshot.forEach(quote => {
                quotes.push({...quote.data(), id: quote.id})
            })
            commit('setAuthorQuotes', {quotes, authorId, nick})
        },
        async fetchAllQuotes({commit}) {
            let quotesSnap = await db.collection('quotes').get()
            let quotes = []
            console.log(quotesSnap.size);
            for (let quoteDoc of quotesSnap.docs) {
                let user = await db.collection('users').doc(quoteDoc.data().userId).get()
                let toPush = {...quoteDoc.data(), id: quoteDoc.id, authorNick: user.data().nick}
                quotes.push(toPush)
            }
            
            commit('setAllQuotes', quotes)
        }
    },
    getters: {
        authorQuotes: state => state.authorQuotes,
        allQuotes: state => state.allQuotes
    },
}