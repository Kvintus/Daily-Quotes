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
    methods: {
        signIn() {
            this.$store.dispatch('logUserIn')
            .then(() => {
                this.$router.push('/')
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.cst-wrapper {
    height: 100vh;
    width: 100vw;
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
