<template>
    <div class="wrapper">
        <Heading :text="tagHeading"/>
        <v-text-field v-model="searchTerm" dark color="white" :append-icon="'search'"></v-text-field>
        <QuoteItem
            class="quote"
            v-for="quote in quotesToDisplay"
            :key="quote.id"
            :author="{nick: quote.userNick, id: quote.userId}"
            :text="quote.text"
            :id="quote.id"
        />
    </div>
</template>
<script>
import store from "@/store";
import QuoteItem from "@/components/QuoteListItem";
import Heading from "@/components/Misc/Heading";

export default {
    components: { QuoteItem, Heading },
    data() {
        return {
            searchTerm: "",
            quotes: []
        };
    },
    mounted() {
        store
            .dispatch("fetchAllTagQutoes", this.$route.params.tagValue)
            .then(quotes => {
                this.quotes = quotes;
            });
    },
    beforeRouteEnter(to, from, next) {
        store.dispatch("fetchAllTagQutoes", to.params.tagValue).then(quotes => {
            next(vm => {
                vm.quotes = quotes;
            });
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
        tagValue() {
            return this.$route.params.tagValue;
        },
        tagHeading() {return `Tag: ${this.tagValue}`}
    }
};
</script>


<style lang="scss" scoped>
.quote {
    margin-top: 1.2rem;
}
.wrapper {
    height: 100vh;
}
</style>
