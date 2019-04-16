<template>
<div class="quote">
    <v-layout row wrap class="quote-holder">
        <v-flex xs12><span class="quote-text">{{text}}</span></v-flex>
    </v-layout>
    <v-layout row wrap>
        <v-flex xs4>{{author.nick}}</v-flex>
        <v-flex xs4>{{formattedDate}}</v-flex>
        <v-flex xs4 class="actions">
            <v-icon @click="likeQuote" :color="currentUserLikedThisQuote ? 'red' : 'white'">mdi-heart</v-icon>
            / 
            <v-icon @click="dislikeQuote" :color="currentUserDislikedThisQuote ? 'red' : 'white'">mdi-thumb-down</v-icon>
            <span class="ratio">{{likeDislikeRatio}}</span>
            <v-icon @click="deleteQuote" class="delete" color="white">mdi-delete</v-icon>
        </v-flex>
    </v-layout>
</div>
</template>


<script>
import moment from 'moment'
import { db } from '@/main'
export default {
    props: {
        author: {
            type: Object,
            required: true,
        },
        text: {
            type: String,
            require: true,
        },
        id: {
            type: String,
            required: true
        },
        date: {
            type: Number,
            require: true,
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
            await this.$store.dispatch('likeQuote', {quoteId: this.id, authorId: this.author.id, positive: true})
            this.negativeLikes = this.negativeLikes.filter(userId => userId !== this.currentUserId)
            this.positiveLikes.push(this.currentUserId)
        },
        dislikeQuote() {
            this.$store.dispatch('likeQuote', {quoteId: this.id, authorId: this.author.id, positive: false})
            this.positiveLikes = this.positiveLikes.filter(userId => userId !== this.currentUserId)
            this.negativeLikes.push(this.currentUserId)
        },
        deleteQuote() {
            this.$store.dispatch('deleteQuote', this.id)
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
        formattedDate() {
            return  moment(this.date).format("DD.MM.YYYY");
        },
        likeDislikeRatio() {
            return `${this.positiveLikes.length}/${this.negativeLikes.length}`
        },
        currentUserLikedThisQuote() {
            return this.positiveLikes.includes(this.$store.getters.loggedInUser.uid)
        },
        currentUserDislikedThisQuote() {
            return this.negativeLikes.includes(this.$store.getters.loggedInUser.uid)
        },
        currentUserId() {
            return this.$store.getters.loggedInUser.uid
        }
    }
}
</script>

<style lang="scss" scoped>
.quote {
    border: 1px solid white;
    border-radius: 5px;
    padding: 10px;
    div {
        text-align: center;
    }
}
.quote-text {
    margin-bottom: 1rem;
    font-size: 1.6rem;
}
.quote-holder {
    margin-bottom: 1rem;
}
.actions {
    display: flex;
    justify-content: center;
}
.ratio {
    padding-left: 0.6rem;
}
.delete {
    padding-left: 0.6rem;
}
.red {
    color: red !important;
}
</style>

