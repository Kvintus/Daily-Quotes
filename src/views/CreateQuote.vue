<template>
    <div>
        <Heading text="Create Quote"/>
        <v-layout row wrap>
            <v-flex xs12>
                <v-textarea v-model="quote.text" color="white" dark label="The quote..."/>
                <v-textarea
                    label="Comma-separated tags: love, relationships, happiness"
                    v-model="quote.tags"
                    color="white"
                    dark
                ></v-textarea>
                <h2>{{tagArray.length}}</h2>
                <v-select
                    class="cst-select"
                    :items="languages"
                    v-model="quote.language"
                    color="white"
                    dark
                ></v-select>
            </v-flex>
            <v-btn
                large
                outline
                border
                :loading="publishing"
                dark
                @click="publish"
                color="white"
                class="publish"
            >Publish Quote</v-btn>
        </v-layout>
    </div>
</template>

<script>
import Heading from "@/components/Misc/Heading";
export default {
    components: { Heading },
    name: "CreateQuote",
    data() {
        return {
            quote: {
                text: null,
                language: "en",
                tags: null
            },
            languages: [
                { value: "en", text: "English" },
                { value: "sk", text: "Slovak" }
            ],
            publishing: false
        };
    },
    methods: {
        async publish() {
            await this.$store.dispatch("createQuote", {
                ...this.quote,
                tags: this.tagArray,
                userId: this.loggedInUser.uid,
                createdAt: new Date().getTime()
            });
            this.$router.push(`/author-quotes/${this.loggedInUser.uid}`);
        }
    },
    computed: {
        tagArray() {
            return this.quote.tags
                ? this.quote.tags.split(", ").filter(e => e != "")
                : [];
        },
        loggedInUser() {
            return this.$store.getters.loggedInUser;
        }
    }
};
</script>

<style>
.v-list__tile__title {
    color: black;
}
/* .cst-select div {
    color: black;
}  */
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
    margin: 0;
    display: flex;
    align-self: flex-end;
}
.layout {
    height: 100%;
}
</style>
