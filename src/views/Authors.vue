<template>
    <div class="wrapper">
        <h1>Authors</h1>
        <v-text-field v-model="searchTerm" dark color="white" :append-icon="'search'"></v-text-field>
        <TagListItem
            v-for="author in authorsToDisplay"
            @click.native="navigateToUser(author.id)"
            :key="author.id"
            :numOfLikes="author.numOfPositiveLikes"
            :numOfQuotes="author.numOfQuotes"
            :name="author.nick"
        />
    </div>
</template>

<script>
import TagListItem from '@/components/AllQuotes/TagItem'
export default {
    components: {TagListItem},
    data() {
        return {
            searchTerm: '',
            authors: []
        }
    },
    computed: {
        authorsToDisplay() {
            return this.authors.filter(author => {
                return !this.searchTerm || author.nick.indexOf(this.searchTerm) > -1;
            })
        }
    },
    methods: {
        navigateToUser(authorId) {
            this.$router.push({
                name: 'AuthorQuotes',
                params: {
                    authorId 
                }
            })
        }
    },
    async mounted() {
        let authors = await this.$store.dispatch('fetchAllAuthors')
        this.authors = authors
    }
}
</script>
