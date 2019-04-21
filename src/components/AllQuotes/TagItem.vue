<template>
    <div class="tag ripple">
        <span>{{name}}</span>
        <div class="spacer"></div>
        <div class="stats">
            <v-icon dark>mdi-format-quote-close</v-icon>
            <span>{{numOfQuotes}}</span>
            <v-icon dark class="heart">mdi-heart</v-icon>
            <span>{{numOfLikes}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        numOfQuotes: {
            type: Number,
            required: true
        },
        numOfLikes: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.tag {
    border: 1px solid white;
    border-radius: 5px;
    padding: 10px;
    margin-top: 1rem;
    display: flex;
    align-items: center;
}
.spacer {
    display: flex;
    flex: 1 1 auto;
}
.stats {
    .v-icon {
        margin-left: 10px;
    }
    span {
        font-size: 1.2rem;
        margin-left: 5px;
    }
}
.heart {
    font-size: 1.5rem;
}
.ripple {
    background-position: center;
    transition: background 0.8s;
}
.ripple:hover {
    background: rgba(0, 0, 0, 0) radial-gradient(circle, transparent 1%, rgb(255, 255, 255) 1%) center/15000%;
    * {
        color: white;
    }
}
.ripple:active {
    * {
        color: black;
    }
    background-color: rgb(255, 255, 255);
    background-size: 100%;
    transition: background 0s;
}
</style>
