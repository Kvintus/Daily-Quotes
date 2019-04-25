<template>
    <v-app>
        <SplashScreen v-if="!userStatusDetermined"/>
        <div v-else>
            <v-container class="main-container">
                <transition :name="transitionName">
                    <router-view></router-view>
                </transition>
            </v-container>
        </div>
    </v-app>
</template>

<script>
import SplashScreen from "@/views/SplashScreen";
import Swal from 'sweetalert2'
const DEFAULT_TRANSITION = "fade";
export default {
    name: "App",
    components: { SplashScreen },
    data() {
        return {
            transitionName: DEFAULT_TRANSITION
        };
    },
    computed: {
        shouldBlur() {
            return this.$route.name !== "home";
        },
        userStatusDetermined() {
            return this.$store.getters.userStatusDetermined;
        },
        quotesRetrieved() {
            return this.$store.getters.allQuotes
        }
    },
    watch: {
        isOnline(val) {
            console.log('online value changed', val);
            if (!val) {
                Swal.fire({
                    title: "Online status changed",
                    html: "<p style='color: black;'>You are now offline, not all of the features of the app will not work as expected</p>",
                    type: "info"
                })
            }
        }
    },
    created() {
        this.$router.beforeEach((to, from, next) => {
            let transitionName =
                to.meta.transitionName || from.meta.transitionName;

            const toDepth = to.path.split("/").filter(part => part !== "").length;
            const fromDepth = from.path.split("/").filter(part => part !== "").length;
            transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";

            this.transitionName = transitionName || DEFAULT_TRANSITION;
            next();
        });
    }
};
</script>

<style lang="scss">
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
    transition-duration: 0.5s;
    transition-property: height, opacity, transform;
    transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
    overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
    opacity: 0;
    transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
    opacity: 0;
    transform: translate(-2em, 0);
}
.main-container {
    max-height: 100vh;
    height: 100vh;
}
.wrapper {
    height: 100vh !important;
    padding-bottom: 2rem;
}
</style>
