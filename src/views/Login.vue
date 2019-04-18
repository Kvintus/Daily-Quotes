<template>
    <div class="cst-wrapper">
        <div v-if="!isLoggingUserIn" class="pls">
            <h1>In order to perform this action please Sign In...</h1>
            <v-btn @click="signIn">
                <v-icon left>mdi-google</v-icon>Sign In
            </v-btn>
        </div>
        <v-progress-circular v-else :size="70" :width="7" color="white" indeterminate></v-progress-circular>
    </div>
</template>

<script>
import firebase from "firebase";
export default {
    watch: {
        userIsSignedIn: function(is) {
            if (is) this.$router.push({ name: "home" });
        }
    },
    methods: {
        signIn() {
            this.$store.dispatch("logUserIn");
        }
    },
    mounted() {
        // Show loader while not sure about user state
        if (this.userIsSignedIn) {
            this.$router.push({ name: "home" });
        }
    },
    computed: {
        isLoggingUserIn() {
            return this.$store.getters.isLoggingUserIn
        },
        userIsSignedIn: function() {
            return this.$store.getters.isLoggedIn;
        }
    }
};
</script>

<style lang="scss" scoped>
.cst-wrapper {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    .pls {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
    }
    h1 {
        text-align: center;
        padding-bottom: 2rem;
    }
}
</style>
