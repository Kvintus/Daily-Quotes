<template>
    <div class="wrapper">
        <Heading text="Tags"/>
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
import Heading from "@/components/Misc/Heading";

export default {
    components: { TagListItem, Heading },
    data() {
        return {
            searchTerm: ""
        };
    },
    beforeRouteEnter(to, from, next) {
        store.dispatch("fetchAllTags").then(() => {
            next();
        });
    },
    methods: {
        navigateToTagQuotes(value) {
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
}
</style>
