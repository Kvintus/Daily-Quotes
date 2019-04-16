<template>
    <v-container>
        <h1>Tags</h1>
        
    </v-container>
</template>
<script>
import store from "@/store";
export default {
    beforeRouteEnter(to, from, next) {
        store.dispatch('fetchAllTags').then(() => {
            console.log('action resolved');
            next()
        })
    }
};
</script>
