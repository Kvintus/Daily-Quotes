<template>
    <v-app>
        <div :class="{'bg': true, 'blurry': shouldBlur}"></div>
        <v-container class="main-container">
            <!-- <transition name="fade"> -->
                <router-view></router-view>
            <!-- </transition> -->
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
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
