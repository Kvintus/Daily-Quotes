<template>
    <div class="wrapper">
        <Heading text="Settings"/>
        <v-layout row wrap>
            <v-flex xs12>
                <v-text-field solo v-model="nick" label="Your nick"/>
            </v-flex>
            <v-flex xs12 class="actions">
                <v-btn outline @click="signOut" color="white">
                    <v-icon left>mdi-google</v-icon>Sign Out
                </v-btn>
                <div class="spacer"></div>
                <v-btn outline :loading="saving" @click="save" dark color="light-blue">Save</v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import Heading from "@/components/Misc/Heading";

export default {
    name: "Settings",
    components: { Heading },
    data() {
        return {
            nick: null,
            saving: false
        };
    },
    methods: {
        signOut() {
            this.$router.push("/");
            this.$store.dispatch("signUserOut");
        },
        async save() {
            this.saving = true;
            await this.$store.dispatch("updateUser", { nick: this.nick });
            this.saving = false;
            this.$router.push("/");
        }
    },
    mounted() {
        if (this.vuexNick) {
            this.nick = this.vuexNick;
        }
    },
    watch: {
        vuexNick: function(val) {
            this.nick = this.vuexNick;
        }
    },
    computed: {
        vuexNick() {
            return this.$store.getters.userNick;
        }
    }
};
</script>

<style lang="scss" scoped>
h1 {
    margin-bottom: 1rem;
}
.spacer {
    display: flex;
    flex: 1 1 auto;
}
.actions {
    display: flex;
}
</style>

