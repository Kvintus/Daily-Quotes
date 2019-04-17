<template>
    <v-app>
        <div :class="{'bg': true, 'blurry': shouldBlur}"></div>
        <v-container class="main-container">
            <router-view></router-view>
        </v-container>
    </v-app>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            //
        };
    },
    computed: {
        shouldBlur() {
            return this.$route.name !== 'home'
        }
    }
};
</script>

<style lang="scss">
body,
html {
    height: 100%;
}
* {
    color: white;
    z-index: 1;
}
.blurry {
    filter: blur(4px)
}
.bg {
    background-image: url('/backgrounds/stars-bluelight.jpg');
    height: 100vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    z-index: 0;
    position: fixed;
    transform: scale(1.2);
}

.main-container {
    max-height: 100vh
}
</style>
