<template>
    <div class="wrapper cst-wrapper" v-if="currentQuote">
        <div class="top-counter">{{currentQuoteIndex+1}}/{{quotes.length}}</div>
        <div class="main" @click="nextQuote">
            <Quote
                :style="{opacity: quoteOpacity}"
                class="quote-animation"
                :quote="currentQuote.text"
                :author="currentQuote.userNick"
            />
        </div>
        <BottomMenu
            class="bottom-menu"
            @likesLoaded="likesLoaded=true"
            :id="currentQuote.id"
            :author="{id: currentQuote.userId}"
            :date="currentQuote.createdAt"
        />
    </div>
</template>

<script>
import Quote from "@/components/Quote";
import BottomMenu from "@/components/BottomMenu/index";
import store from "@/store";
import { setTimeout } from 'timers';

export default {
    name: 'Home',
    components: {
        Quote,
        BottomMenu
    },
    data() {
        return {
            currentQuoteIndex: 0,
            likesLoaded: false,
            quoteOpacity: 1,
            quotes: []
        };
    },
    methods: {
        nextQuote() {
            this.quoteOpacity = 0;
            setTimeout(() => {
                this.quoteOpacity = 1
                if (this.currentQuoteIndex + 1 === this.quotes.length) {
                    this.currentQuoteIndex = 0;
                } else {
                    this.currentQuoteIndex += 1;
                }
            }, 500)
        }
    },
    beforeRouteEnter(to, from, next) {
        store.dispatch("fetchAllQuotes").then(() => next());
    },
    computed: {
        currentQuote() {
            return this.quotes[this.currentQuoteIndex];
        }
    },
    async created() {
        setInterval(() => {
            this.nextQuote();
        }, 7500);
        let storageValue = localStorage.getItem('landing')
        let shouldDisplay = storageValue ? storageValue : 'last'
        console.log(shouldDisplay)
        switch (shouldDisplay) {
            case 'last':
                this.quotes = await store.dispatch("fetchAllQuotes")
                break;
            case 'favourite': 
                this.quotes = await store.dispatch("fetchAllFavouriteQutoes")
                break;
            default:
                break;
        }
        
    }
};
</script>

<style lang="scss" scoped>
.quote-animation {
    transition: ease-in-out 300ms;
}
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
.top-counter,
.bottom-menu {
    height: 52px;
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

