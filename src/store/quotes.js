import {
    db
} from '@/main'
import firebase from 'firebase'
import omit from 'lodash.omit'
import {
    getUserNick
} from './user'

async function getTagRef(tagValue) { // Get tag with the value
    let tagSnap = await db.collection('tags').where('value', '==', tagValue).limit(1).get()
    let tagRef = null
    if (!tagSnap.size) {
        // Create new

        tagRef = db.collection('tags').doc()
        await tagRef.set({
            value: tagValue,
            quotes: []
        })
    } else {
        tagRef = db.collection('tags').doc(tagSnap.docs[0].id)
    }
    return tagRef
}

async function getQuotesAssociatedWithTag(tagValue) {
    let tagSnap = await db.collection('tags').where('value', '==', tagValue).get()
    if (tagSnap.docs.length > 0) {
        return tagSnap.docs[0].data().quotes;
    }
    return []
}

async function associateQuoteWithTag(quoteId, tagValue) {
    let tagRef = await getTagRef(tagValue);
    let tagDoc = await db.collection('tags').doc(tagRef.id).get()

    // Create record in m2m table
    await tagRef.update({
        quotes: [...tagDoc.data().quotes, quoteId]
    })
}

async function deleteLikesAssociatedWithQuote(quoteDoc) {
    let likesSnap = await db.collection('hearts').where('quoteId', '==', quoteDoc.id).get()
    for (let heart of likesSnap.docs) {
        heart.ref.delete()
    }
}

async function removeAllAssociationsWithTags(quoteDoc) {
    let tagsSnap = await db.collection('tags').where('quotes', 'array-contains', quoteDoc.id).get()
    tagsSnap.forEach(tag => {
        let quotes = tag.data().quotes.filter(quote => quote != quoteDoc.id)
        tag.ref.update({
            quotes
        })
    })
}

export async function getNumberOfQuoteLikes(quoteId, positive) {
    let likesSnap = null;
    if (positive != null) {
        likesSnap = await db.collection('hearts').where('quoteId', '==', quoteId).where('positive', '==', positive).get()
    } else {
        likesSnap = await db.collection('hearts').where('quoteId', '==', quoteId).get()
    }
    return likesSnap.size
}

export async function getQuoteArrayFromIdArray(arrayOfIds) {
    let quotesPromArr = []
    for (let quoteId of arrayOfIds) {
        quotesPromArr.push((async () => {
            let quote = await db.collection('quotes').doc(quoteId).get()
            let quoteData = quote.data()
            return {
                ...quoteData,
                userNick: await getUserNick(quoteData.userId),
                id: quote.id
            }
        })())
    }
    let quotes = await Promise.all(quotesPromArr)
    return quotes
}

export default {
    state: {
        allQuotes: [],
        authorQuotes: {
            authorId: null,
            userNick: null,
            quotes: []
        },
        tagQuotes: []
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
        async createQuote({
            commit
        }, quote) {
            // Create quote
            console.log(quote);
            
            let newQuoteRef = db.collection('quotes').doc()
            await newQuoteRef.set(omit(quote, ['tags']))

            // Add tags
            for (let tag of quote.tags) {
                associateQuoteWithTag(newQuoteRef.id, tag)
            }
        },
        async deleteQuote({
            commit
        }, quoteId) {
            let quoteDoc = await db.collection('quotes').doc(quoteId)
            let promArr = [
                removeAllAssociationsWithTags(quoteDoc),
                deleteLikesAssociatedWithQuote(quoteDoc)
            ]
            await Promise.all(promArr)
            quoteDoc.delete()
            commit('removeQuoteFromAuthorQuotes', quoteId)
        },
        async likeQuote({
            rootGetters
        }, {
            quoteId,
            positive
        }) {
            let currentUserId = rootGetters.loggedInUser.uid
            let likeSnapshot = await db.collection('hearts').where('userId', '==', currentUserId).where('quoteId', '==', quoteId).get()

            if (likeSnapshot.size) {
                likeSnapshot.forEach(like => {
                    if (like.data().positive === positive) {
                        like.ref.delete()
                    }
                    like.ref.update({
                        positive
                    })
                })
            } else {
                await db.collection('hearts').doc().set({
                    userId: currentUserId,
                    quoteId,
                    positive,
                })
            }
        },
        async fetchAllQuotes({
            commit
        }) {
            // TODO: Could be optimised by Promise.All
            let quotesSnap = await db.collection('quotes').get()
            let quotes = []
            for (let quoteDoc of quotesSnap.docs) {
                let user = await db.collection('users').doc(quoteDoc.data().userId).get()
                let toPush = {
                    ...quoteDoc.data(),
                    id: quoteDoc.id,
                    userNick: user.data().nick
                }
                quotes.push(toPush)
            }
            commit('setAllQuotes', quotes)
            return quotes;
        },
        async fetchAllFavouriteQutoes({
            commit,
            rootGetters
        }) {
            // Fetch all hearts of user
            let heartsSnap = await db.collection('hearts').where('userId', '==', rootGetters.loggedInUser.uid).get();
            // map the ids
            let ids = heartsSnap.docs.map(quoteSnap => quoteSnap.data().quoteId );
            return await getQuoteArrayFromIdArray(ids)
        },
        async fetchAuthorQuotes({
            commit
        }, authorId) {
            let quotesSnapshot = await db.collection('quotes').where('userId', '==', authorId).get()
            let nick = (await db.collection('users').doc(authorId).get()).data().nick
            let quotes = []
            quotesSnapshot.forEach(quote => {
                quotes.push({
                    ...quote.data(),
                    id: quote.id
                })
            })
            commit('setAuthorQuotes', {
                quotes,
                authorId,
                nick
            })
        },
        async fetchAllTagQutoes({
            commit
        }, tagValue) {
            // Get tag
            let quoteIds = await getQuotesAssociatedWithTag(tagValue);
            return await getQuoteArrayFromIdArray(quoteIds)
        }
    },
    getters: {
        authorQuotes: state => state.authorQuotes,
        allQuotes: state => state.allQuotes
    },
}