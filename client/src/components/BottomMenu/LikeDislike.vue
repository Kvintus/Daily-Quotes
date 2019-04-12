<template>
  <v-layout class="like-dislike">
    <v-flex xs6>
      <div :class="{'like-btn': true, 'like': isLiked}">
        <v-icon>favorite</v-icon>
        <span>{{numberOfLikes}}</span>
      </div>
    </v-flex>
    <v-flex xs6>
      <div :class="{'like-btn': true, 'like': isDisliked}">
        <v-icon>thumb_down</v-icon>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      numberOfLikes: 22,
      isLiked: false,
      isDisliked: false,
    }
  }
};
</script>

<style lang="scss" scoped>
.like-dislike {
  padding: 0 10px;
  display: flex;
  div {
    &:first-child {
      margin-right: 20px;
    }
  }
}
.like-btn {
  display: flex;
  align-items: center;
  span {
    font-weight: 500;
    font-size: 18px;
  }
  i {
    color: white;
    padding-right: 5px;
  }
}

.like {
  span {
    color: red;
  }
  i {
    color: red
  }
}
</style>

