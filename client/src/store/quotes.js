import { db } from '@/main'
import firebase from 'firebase'

export default {
    state: {
        quotes: []
    },
    actions: {
        async createQuote({commit}, quote) {
            await db.collection('quotes').doc().set(quote)
        }
    }
}