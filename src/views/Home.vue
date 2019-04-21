<template>
    <div class="wrapper cst-wrapper" v-if="currentQuote">
        <div class="top-counter">{{currentQuoteIndex+1}}/{{quotes.length}}</div>
        <div class="main" @click="nextQuote">
            <Quote :quote="currentQuote.text" :author="currentQuote.authorNick"/>
        </div>
        <BottomMenu
            class="bottom-menu"
            @likesLoaded="likesLoaded=true"
            :id="currentQuote.id"
            :author="{id: currentQuote.userId}"
        />
    </div>
</template>

<script>
import Quote from "@/components/Quote";
import BottomMenu from "@/components/BottomMenu/index";
import store from "@/store";

export default {
    components: {
        Quote,
        BottomMenu
    },
    data() {
        return {
            currentQuoteIndex: 0,
            likesLoaded: false
        };
    },
    methods: {
        nextQuote() {
            if (this.currentQuoteIndex + 1 === this.quotes.length) {
                this.currentQuoteIndex = 0;
            } else {
                this.currentQuoteIndex += 1;
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        store.dispatch("fetchAllQuotes").then(() => next());
    },
    computed: {
        quotes() {
            return this.$store.getters.allQuotes;
        },
        currentQuote() {
            return this.quotes[this.currentQuoteIndex];
        }
    }
};
</script>

<style lang="scss" scoped>
.holder {
    .spacer {
        width: 100%;
    }
    display: flex;
}
.main {
    display: flex;
    align-items: center;
    height: 100%;
}
.top-counter {
    font-size: 1.5rem;
    color: rgb(168, 168, 168);
    // position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
}
.cst-wrapper {
    display: flex;
    flex-flow: column;
    .spacer {
        flex: 1 1 auto;
    }
}
</style>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease-out;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>

