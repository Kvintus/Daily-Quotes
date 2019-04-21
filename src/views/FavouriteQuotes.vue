<template>
    <div v-if="$store.getters.isLoggedIn">
        <Heading text="Favourite Qutoes"/>
        <v-text-field v-model="searchTerm" dark color="white" :append-icon="'search'"></v-text-field>
        <QuoteItem
            class="quote"
            v-for="quote in quotesToDisplay"
            :key="quote.id"
            :author="{nick: quote.userNick, id: quote.userId}"
            :text="quote.text"
            :id="quote.id"
            @positiveLikeDeleted="removeQuote(quote.id)"
        />
    </div>
</template>

<script>
import Heading from "@/components/Misc/Heading";
import store from '@/store'
import QuoteItem from "@/components/QuoteListItem";
export default {
    components: {Heading, QuoteItem},
    data() {
        return {
            searchTerm: "",
            quotes: []
        }
    },
    methods: {
        removeQuote(id) {
            this.quotes = this.quotes.filter(quote => quote.id !== id)
        }
    },
    mounted() {
        store.dispatch("fetchAllFavouriteQutoes").then(quotes => {
            this.quotes = quotes
        });
    },
    computed: {
        quotesToDisplay() {
            return this.quotes.filter(
                quote =>
                    this.searchTerm === "" ||
                    quote.text.indexOf(this.searchTerm) > -1
            );
        },
    }
}
</script>

<style lang="scss" scoped>
.quote {
    margin-top: 1.2rem;
}
</style>
