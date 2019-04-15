<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-textarea
                    v-model="quote.text"
                    solo
                    label="The quote..."
                />
                <v-textarea
                    label="Comma-separated tags: love, relationships, happiness"
                    v-model="quote.tags"
                    solo
                >
                </v-textarea>
                <h2>{{tagArray.length}}</h2>
                <v-select
                    class="cst-select"
                    :items="languages"
                    v-model="quote.language"
                    solo
                ></v-select>
            </v-flex>
        </v-layout>
        <div class="publish">
            <v-btn :loading="publishing" dark color="blue" @click="publish" class="publish">Publish Quote</v-btn>
        </div>
    </v-container>
</template>

<script>
export default {
    name: "CreateQuote",
    data() {
        return {
            quote: {
                text: null,
                language: 'en',
                tags: null
            },
            languages: [
                { value: 'en', text: 'English' },
                { value: 'sk', text: 'Slovak' }
            ],
            publishing: false
        }
    },
    methods: {
        publish() {
            this.$store.dispatch('createQuote', {...this.quote, tags: this.tagArray, userId: this.loggedInUser.uid, createdAt: new Date().getTime()})
        }
    },
    computed: {
        tagArray() {
            return this.quote.tags ? this.quote.tags.split(', ').filter(e => e != "") : []
        },
        loggedInUser() {
            return this.$store.getters.loggedInUser
        }
    },
}
</script>

<style>
.v-list__tile__title {
    color: black;
}
.cst-select div {
    color: black;
}
</style>

<style lang="scss" scoped>
h2 {
    text-align: right;
    margin-top: -10px;
    margin-bottom: 1rem;
}
</style>

<style lang="scss" scoped>
.publish {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    .v-btn {
        padding: 10px;
        width: 100%;
        margin: 0;
    }
}
</style>
