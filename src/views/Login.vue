<template>
    <div class="cst-wrapper">
        <h1>In order to perform this action please Sign In...</h1>
        <v-btn @click="signIn">
            <v-icon left>mdi-google</v-icon>
            Sign In
        </v-btn>
    </div>
</template>

<script>
export default {
    watch: {
        userIsSignedIn: function (is) {
            if (is) {
                this.$router.push({name: 'home'})
            }
        }
    },
    methods: {
        signIn() {
            this.$store.dispatch('logUserIn')
        }
    },
    computed: {
        userIsSignedIn: function() {
            return this.$store.getters.isLoggedIn
        }
    }
}
</script>

<style lang="scss" scoped>
.cst-wrapper {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    h1 {
        text-align: center;
        padding-bottom: 2rem;
    }
}
</style>
