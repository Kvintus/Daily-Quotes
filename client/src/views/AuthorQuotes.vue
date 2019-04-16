<template>
    <v-container>
        <h1>{{currentUsersQuotes ? "My Quotes" : authorQuotes.nick}}</h1>
        <div class="quotes">
            <QuoteItem
                v-for="quote in authorQuotes.quotes" :key="quote.id"
                :author="{nick: authorQuotes.nick, id: authorQuotes.authorId}"
                :text="quote.text"
                :id="quote.id"
            />
        </div>
    </v-container>
</template>

<script>
import QuoteItem from '@/components/AuthorQuotes/QuoteListItem'
import store from '@/store'
export default {
    name: "AuthorQuotes",
    components: {
        QuoteItem,
    },
    data() {
        return {
        }
    },
    beforeRouteEnter (to, from, next) {
        store.dispatch('fetchAuthorQuotes', to.params.authorId).then(() => next())
    },
    // created() {
    //     this.$store.dispatch('fetchAuthorQuotes', this.$route.params.authorId)
    // }
    computed: {
        authorQuotes(){ return this.$store.getters.authorQuotes },
        currentUsersQuotes() {return this.$store.getters.loggedInUser.uid === this.$route.params.authorId}
    }
}
</script>

<style lang="scss" scoped>
.quotes {
    .quote {
        margin-top: 1.2rem;
    }
}
</style>
