<template>
    <v-container>
        <h1>Tags</h1>
        <v-text-field v-model="searchTerm" dark color="white" :append-icon="'search'"></v-text-field>
        <TagListItem
            v-for="tag in tagsToDisplay" :key="tag.name"
            :numOfLikes="tag.numOfPositiveLikes"
            :numOfQuotes="tag.numOfQuotes"
            :name="tag.value"
        />
    </v-container>
</template>
<script>
import store from "@/store";
import TagListItem from '@/components/AllQuotes/TagItem'

export default {
    components: {TagListItem},
    data() {
        return {
            searchTerm: ""
        }
    },
    beforeRouteEnter(to, from, next) {
        store.dispatch('fetchAllTags').then(() => {
            console.log('action resolved');
            next()
        })
    },
    computed: {
        tagsToDisplay() {
            return this.tags.filter(tag => this.searchTerm === "" || tag.value.indexOf(this.searchTerm) > -1)
        },
        tags() {return this.$store.getters.getAllTags}
    }
};
</script>
