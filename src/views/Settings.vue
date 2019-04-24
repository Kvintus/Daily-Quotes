<template>
    <div class="wrapper">
        <Heading class="heading" text="Settings"/>
        <v-layout row wrap>
            <v-flex xs12>
                <v-text-field solo v-model="nick" label="Your nick"/>
            </v-flex>
            <v-flex xs12>
                <p>Choose which quotes should be cycled through</p>
                <v-radio-group dark v-model="landing" row>
                    <v-radio label="Favourite" value="favourite"></v-radio>
                    <v-radio label="Last 100" value="last"></v-radio>
                </v-radio-group>
            </v-flex>
            <v-flex xs12>
                <v-switch dark v-model="blur" :label="`Blurred background`"></v-switch>
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
            landing: "favourite",
            saving: false,
            blur: localStorage.getItem("blur") || true // On by default
        };
    },
    created() {
        let storedLanding = localStorage.getItem('landing')
        this.landing = storedLanding ? storedLanding : 'last'
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
        },
        blur: function(val) {
            if (val) {
                document.querySelector(".bg").classList.remove("darken-filter");
                document
                    .querySelector(".bg")
                    .classList.add("darken-blurry-filter");
                localStorage.setItem("blur", true);
            } else {
                document
                    .querySelector(".bg")
                    .classList.remove("darken-blurry-filter");
                document.querySelector(".bg").classList.add("darken-filter");
                localStorage.removeItem("blur");
            }
        },
        landing: function (val) {
            localStorage.setItem('landing', val)
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
.heading {
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

