<template>
    <div>
        <v-layout class="actions-wrapper">
            <v-flex xs6>
                <v-btn :disabled="!isUserSignedIn" @click="navigateTo('/create-quote')" fab small color="white">
                    <v-icon dark>add</v-icon>
                </v-btn>
            </v-flex>
            <v-flex xs6>
                <v-speed-dial
                    class="speed-dial-custom"
                    v-model="speedDialOpen"
                    direction="top"
                    transition="slide-y-reverse-transition"
                >
                    <template v-slot:activator>
                        <v-btn fab small color="white">
                            <v-icon dark>mdi-menu</v-icon>
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </template>

                    <v-btn @click="navigateTo('/all-quotes')" round small color="white">
                        <v-icon>format_quote</v-icon>All Quotes
                    </v-btn>

                    <v-btn
                        v-if="isUserSignedIn"
                        @click="navigateTo(`author-quotes/${currentUserId}`)"
                        round
                        small
                        color="white"
                    >
                        <v-icon>file_copy</v-icon>My Quotes
                    </v-btn>

                    <v-btn v-if="isUserSignedIn" @click="navigateTo('/favourite-quotes')" round small color="white">
                        <v-icon>favorite</v-icon>Favourite Quotes
                    </v-btn>

                    <v-btn @click="navigateTo('/authors')" round small color="white">
                        <v-icon>supervisor_account</v-icon>Authors
                    </v-btn>

                    <v-btn v-if="isUserSignedIn" @click="navigateTo('/settings')" round small color="white">
                        <v-icon>settings</v-icon>Settings
                    </v-btn>

                    <v-btn v-if="!isUserSignedIn" :disabled="!isOnline" @click="navigateTo('/login')" round small color="white">
                        <v-icon>mdi-login</v-icon>Sign In
                    </v-btn>
                </v-speed-dial>
            </v-flex>
        </v-layout>
        <div v-if="speedDialOpen" class="shady"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            speedDialOpen: null
        };
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route);
        }
    },
    computed: {
        currentUserId() {
            return this.$store.getters.loggedInUser.uid;
        },
        isUserSignedIn() {return this.$store.getters.isLoggedIn}
    }
};
</script>

<style>
.shady {
    position: fixed;
    top: 0px;
    z-index: 50;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(7, 7, 7, 0.644);
    transform: scale(1.5)
}
.blur-svg {
    display: none;
}
</style>

<style lang="scss" scoped>
.actions-wrapper {
    // margin: 0 10px 0 25px;
    z-index: 100;
    .flex {
        z-index: 100;
    }
}


.speed-dial-custom {
    margin-right: 10px;
}
.speed-dial-custom {
}
</style>

<style lang="scss">
.v-speed-dial__list {
    display: flex;
    align-items: flex-end;
    .v-btn {
        height: 32px;
        padding: 0 15px;
        display: flex;
        flex-flow: row;
        i {
            height: 25px !important;
            width: 25px !important;
            color: black;
            margin-left: -5px;
            margin-right: 5px;
            padding: 2px;
        }
    }
}
</style>

