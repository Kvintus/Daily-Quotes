<template>
  <div>
    <v-layout class="actions-wrapper">
      <v-flex xs6>
        <v-btn fab small color="white">
          <v-icon dark>add</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs6>
        <v-speed-dial
          class="speed-dial-custom"
          v-model="speedDialOpen"
          direction="top"
          transition="slide-y-reverse-transition"
        >
          <template v-slot:activator>
            <v-btn fab small color="white">
              <v-icon dark>dehaze</v-icon>
              <v-icon>close</v-icon>
            </v-btn>
          </template>
          <v-btn fab small color="white">
            <v-icon>format_quote</v-icon>
          </v-btn>

          <v-btn fab small color="white">
            <v-icon>file_copy</v-icon>
          </v-btn>

          <v-btn fab small color="white">
            <v-icon>favorite</v-icon>
          </v-btn>

          <v-btn fab small color="white">
            <v-icon>supervisor_account</v-icon>
          </v-btn>

          <v-btn fab small color="white">
            <v-icon>settings</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-flex>
    </v-layout>
    <div v-if="speedDialOpen" class="shady"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      speedDialOpen: null
    };
  }
};
</script>


<style lang="scss" scoped>
.actions-wrapper {
  // margin: 0 10px 0 25px;
  z-index: 100;
  .flex {
    z-index: 100;
  }
}

.shady {
  position: fixed;
  top: 0px;
  z-index: 50;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(4, 0, 66, 0.568);
}
.speed-dial-custom {
  margin-right: 10px;
}
</style>

