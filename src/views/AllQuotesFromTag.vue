<template>
    <div class="wrapper">
        <h1>{{tagValue}}</h1>
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

export default {
    components: { QuoteItem },
    data() {
        return {
            searchTerm: "",
            quotes: []
        };
    },
    beforeRouteEnter(to, from, next) {
        store.dispatch("fetchAllTagQutoes", to.params.tagValue).then((quotes) => {
            next(vm => {
                vm.quotes = quotes
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
        }
    }
};
</script>


<style lang="scss" scoped>
.wrapper {
    padding-bottom: 2rem;
    padding-top: 1rem;
}
.quote {
    margin-top: 1.2rem;
}
</style>
