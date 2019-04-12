<template>
  <div class="bottom-menu">
    <v-container>
      <v-layout row wrap>
        <v-flex xs4>{{currentDate}}</v-flex>
        <v-flex xs4><LikeDislike/></v-flex>
        <v-flex xs4><Actions/></v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import moment from "moment";
import LikeDislike from "@/components/BottomMenu/LikeDislike";
import Actions from '@/components/BottomMenu/Actions'

export default {
  components: {
    LikeDislike,
    Actions,
  },
  computed: {
    currentDate() {
      return moment().format("DD.MM.YYYY");
    }
  }
};
</script>


<style lang="scss" scoped>
.bottom-menu {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
