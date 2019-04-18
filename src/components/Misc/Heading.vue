<template>
    <div class="holder">
        <h1>{{text}}</h1>
        <v-icon dark @click="navigateHome">mdi-home</v-icon>
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: ""
        }
    },
    methods: {
        navigateHome() {
            this.$router.push({name: 'home'})
        }
    }
}
</script>

<style lang="scss" scoped>
.holder {
    display: flex;
    h1 {
        display: flex;
        flex: 1;
    }
}
</style>

