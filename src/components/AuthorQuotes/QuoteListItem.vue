<template>
<div class="quote">
    <v-layout row wrap class="quote-holder">
        <v-flex xs12><span class="quote-text">{{text}}</span></v-flex>
    </v-layout>
    <v-layout row wrap>
        <v-flex xs4>{{author.nick}}</v-flex>
        <v-flex xs4>{{formattedDate}}</v-flex>
        <v-flex xs4 class="actions">
            <LikeDislike :author="author" :id="id"/>
            <v-icon v-if="quoteBelongsToCurrentUser" @click="deleteQuote" class="delete" color="white">mdi-delete</v-icon>
        </v-flex>
    </v-layout>
</div>
</template>


<script>
import moment from 'moment'
import { db } from '@/main'
import LikeDislike from '@/components/LikeDislike'
export default {
    components: {
        LikeDislike
    },
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
           
        }
    },
    methods: {
        async deleteQuote() {
            await this.$store.dispatch('deleteQuote', this.id)
        },
    },
    computed: {
        formattedDate() {
            return  moment(this.date).format("DD.MM.YYYY");
        },
        currentUserId() {
            return this.$store.getters.loggedInUser.uid
        },
        quoteBelongsToCurrentUser() {return this.currentUserId === this.author.id}
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

