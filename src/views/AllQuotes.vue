<template>
    <div>All Quotes</div>
</template>

<script>
import store from "@/store";
export default {
    async beforeRouteEnter(to, from, next) {
        await store.dispatch('fetchAllTags')
    }
};
</script>
