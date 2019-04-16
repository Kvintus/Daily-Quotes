<template>
    <div class="tag">
        <span>{{name}}</span>
        <div class="spacer"></div>
        <div class="stats">
            <v-icon dark>mdi-format-quote-close</v-icon><span>{{numOfQuotes}}</span>
            <v-icon dark class="heart">mdi-heart</v-icon><span>{{numOfLikes}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        numOfQuotes: {
            type: Number,
            required: true,
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
}
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
</style>
