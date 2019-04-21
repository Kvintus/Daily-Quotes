<template>
    <div>
        <Heading :text="currentUsersQuotes ? 'My Quotes' : authorQuotes.nick"/>
        <div class="quotes">
            <QuoteItem
                v-for="quote in authorQuotes.quotes" :key="quote.id"
                :author="{nick: authorQuotes.nick, id: authorQuotes.authorId}"
                :text="quote.text"
                :id="quote.id"
                :date="quote.createdAt"
            />
        </div>
    </div>
</template>

<script>
import QuoteItem from '@/components/QuoteListItem'
import Heading from "@/components/Misc/Heading";
import store from '@/store'
export default {
    name: "AuthorQuotes",
    components: {
        QuoteItem,
        Heading
    },
    data() {
        return {}
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
