<template>
    <v-app>
        <SplashScreen v-if="!userStatusDetermined"/>
        <div v-else>
            <v-container class="main-container">
                <!-- <transition name="fade"> -->
                <router-view></router-view>
                <!-- </transition> -->
            </v-container>
        </div>
    </v-app>
</template>

<script>
import SplashScreen from "@/views/SplashScreen";
export default {
    name: "App",
    components: { SplashScreen },
    data() {
        return {
            //
        };
    },
    computed: {
        shouldBlur() {
            return this.$route.name !== "home";
        },
        userStatusDetermined() {
            return this.$store.getters.userStatusDetermined;
        }
    }
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}

.main-container {
    max-height: 100vh;
    height: 100vh;
}
</style>
