import {
    db
} from '@/main'

async function getNumberOfQuoteLikes(quoteId, positive) {
    let likesSnap = null;
    if (positive != null) {
        likesSnap = await db.collection('hearts').where('quoteId', '==', quoteId).where('positive', '==', positive).get()
    } else {
        likesSnap = await db.collection('hearts').where('quoteId', '==', quoteId).get()
    }
    return likesSnap.size
}

async function getNumberOfPositiveLikesInATag(tagDoc) {
    let  positiveLikesPromArray = []
    for (let quoteId of tagDoc.data().quotes) {
        positiveLikesPromArray.push(getNumberOfQuoteLikes(quoteId, true))
    }
    let result = await Promise.all(positiveLikesPromArray)
    let likesCombined = result.length ? result.reduce((a,b) => a+b) : 0
    
    return likesCombined
}

export default {
    state: {
        tags: []
    },
    mutations: {
        setAllTags: (state, tags) => state.tags = tags
    },
    actions: {
        async fetchAllTags({commit}) {
            let tagsSnap = await db.collection('tags').get();
            let tags = [];
            for (let tagDoc of tagsSnap.docs) {
                let numOfPositiveLikes = await getNumberOfPositiveLikesInATag(tagDoc)
                let data = tagDoc.data()
                tags.push({
                    numOfPositiveLikes,
                    numOfQuotes: data.quotes.length,
                    value: data.value
                })
            }
            return commit('setAllTags', tags);
        }
    },
    getters: {
        getAllTags: state => state.tags
    }
}