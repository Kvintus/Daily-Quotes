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
        }
    },
    actions: {
        async createQuote({commit}, quote) {
            await db.collection('quotes').doc().set(quote)
        },
        async deleteQuote({}, quoteId) {
            await db.collection('quotes').doc(quoteId).delete()
        },
        async likeQuote({rootGetters}, {quoteId, positive}) {
            // Check if not liked already
            console.log(`quoteID: ${quoteId}`);
            
            let currentUserId = rootGetters.loggedInUser.uid
            let likeSnapshot = await db.collection('hearts').where('userId', '==', currentUserId).where('quoteId', '==', quoteId).get()
            console.log(positive);
            
            if (likeSnapshot.size) {
                likeSnapshot.forEach(like => {
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
        }
    },
    getters: {
        authorQuotes: state => state.authorQuotes
    },
}