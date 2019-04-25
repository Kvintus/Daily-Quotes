<template>
  <div >
      <v-layout row wrap class="bottom-menu">
        <v-flex xs4>{{currentDate}}</v-flex>
        <v-flex xs4><LikeDislike fontSize="2rem" :author="author" :id="id" /></v-flex>
        <v-flex xs4><Actions/></v-flex>
      </v-layout>
  </div>
</template>

<script>
import moment from "moment";
import LikeDislike from "@/components/LikeDislike";
import Actions from '@/components/BottomMenu/Actions'

export default {
  props: {
    author: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      require: true
    },
    date: {
      type: Number,
      require: true,
    }
  },
  components: {
    LikeDislike,
    Actions,
  },
  computed: {
    currentDate() {
      return moment(this.date).format("DD.MM.YYYY");
    }
  },
  
};
</script>


<style lang="scss" scoped>
.bottom-menu {
    width: 100%;
  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
    &:first-child {
      justify-content: flex-start;
    }
    &:last-child {
      justify-content: flex-end;
    }
  }
}
</style>
