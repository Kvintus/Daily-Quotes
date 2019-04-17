<template>
    <v-app>
        <div class="bg"></div>
        <v-container>
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
}
.bg {
    background-image: url('/backgrounds/stars-bluelight.jpg');
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    z-index: 0;
    position: absolute;
}

.container {
    padding-bottom: 0;
}
</style>
