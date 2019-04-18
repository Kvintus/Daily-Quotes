<template>
    <div class="like-dislike">
        <v-icon :size="fontSize" :disabled="!isUserLoggedIn" @click="likeQuote" :color="currentUserLikedThisQuote ? 'red' : 'white'">mdi-heart</v-icon><span>{{positiveLikes.length}}</span>
        <span class="divider">/</span> 
        <v-icon :size="fontSize" :disabled="!isUserLoggedIn" @click="dislikeQuote" :color="currentUserDislikedThisQuote ? 'red' : 'white'">mdi-thumb-down</v-icon><span>{{negativeLikes.length}}</span>
    </div>
</template>


<script>
import { db } from '@/main'
export default {
    props: {
        author: {
            type: Object,
            required: true,
        },
        id: {
            type: String,
            required: true
        },
        fontSize: {
            type: String,
            default: "1rem"
        }
    },
    data() {
        return {
            positiveLikes: [],
            negativeLikes: [],
        }
    },
    methods: {
        async likeQuote() {
            if (this.positiveLikes.includes(this.currentUserId)) {
                await this.deleteLike()
                this.removeCurrentUserFromPositiveLikes()
            } else {
                await this.$store.dispatch('likeQuote', {quoteId: this.id, authorId: this.author.id, positive: true})
                this.removeCurrentUserFromNegativeLikes()
                this.positiveLikes.push(this.currentUserId)
            }
        },
        async dislikeQuote() {
            if (this.negativeLikes.includes(this.currentUserId)) {
                await this.deleteLike()
                this.removeCurrentUserFromNegativeLikes()
            } else {
                await this.$store.dispatch('likeQuote', {quoteId: this.id, authorId: this.author.id, positive: false})
                this.removeCurrentUserFromPositiveLikes()
                this.negativeLikes.push(this.currentUserId)
            }
        },
        async deleteLike() {
            let likeSnap = await db.collection('hearts').where('userId', '==', this.author.id).where('quoteId', '==', this.id).get()
            likeSnap.forEach(likeDoc => likeDoc.ref.delete())
        },
        removeCurrentUserFromPositiveLikes() {
            this.positiveLikes = this.positiveLikes.filter(userId => userId !== this.currentUserId)
        },
        removeCurrentUserFromNegativeLikes() {
            this.negativeLikes = this.negativeLikes.filter(userId => userId !== this.currentUserId)
        }
    },
    async mounted() {
        let likes = await db.collection('hearts').where('userId', '==', this.author.id).where('quoteId', '==', this.id).get()
        likes.forEach(likeDoc => {
            let likeData = likeDoc.data()
            if (likeData.positive) {
                this.positiveLikes.push(likeData.userId)
            } else {
                this.negativeLikes.push(likeData.userId)
            }
        })
    },
    computed: {
        currentUserLikedThisQuote() {
            return this.positiveLikes.includes(this.$store.getters.loggedInUser.uid)
        },
        currentUserDislikedThisQuote() {
            return this.negativeLikes.includes(this.$store.getters.loggedInUser.uid)
        },
        currentUserId() {
            return this.$store.getters.loggedInUser.uid
        },
        isUserLoggedIn() {
            return this.$store.getters.isLoggedIn
        },
        iconSizeClass() {
            return {
                'font-size': this.fontSize,
                'color': 'black'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.like-dislike {
    display: flex;
    align-items: center;
    span {
        margin-left: 3px;
        margin-right: 3px;
    }
    .divider {
        margin-left: 5px;
        margin-right: 5px;
    }
}
.red {
    color: red !important;
}
</style>
