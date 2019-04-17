<template>
    <div class="wrapper">
        <h1>Tags</h1>
        <v-text-field v-model="searchTerm" dark color="white" :append-icon="'search'"></v-text-field>
        <TagListItem
            v-for="tag in tagsToDisplay"
            @click.native="navigateToTagQuotes(tag.value)"
            :key="tag.value"
            :numOfLikes="tag.numOfPositiveLikes"
            :numOfQuotes="tag.numOfQuotes"
            :name="tag.value"
        />
    </div>
</template>
<script>
import store from "@/store";
import TagListItem from "@/components/AllQuotes/TagItem";

export default {
    components: { TagListItem },
    data() {
        return {
            searchTerm: ""
        };
    },
    beforeRouteEnter(to, from, next) {
        store.dispatch("fetchAllTags").then(() => {
            console.log("action resolved");
            next();
        });
    },
    methods: {
        navigateToTagQuotes(value) {
            console.log('trying to navigate', value);
            
            this.$router.push({
                name: 'AllQuotesFromTag',
                params: { tagValue: value }
            })
        }
    },
    computed: {
        tagsToDisplay() {
            return this.tags.filter(
                tag =>
                    this.searchTerm === "" ||
                    tag.value.indexOf(this.searchTerm) > -1
            );
        },
        tags() {
            return this.$store.getters.getAllTags;
        }
    }
};
</script>


<style lang="scss" scoped>
.wrapper {
    padding-bottom: 2rem;
    padding-top: 1rem;
}
</style>
