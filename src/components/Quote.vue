<template>
  <div class="quote">
    <div class="text">
      <h1>"{{quote}}"</h1>
    </div>
    <div class="author">
      -
      <span>{{author}}</span>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        author: {
            type: String,
            required: true
        },
        quote: {
            type: String,
            required: true,
        }
    }
};
</script>

<style lang="scss" scoped>
.holder {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quote {
  padding: 35px;
  width: 100%;
  z-index: 1;
  .text {
    text-align: center;
    h1 {
      font-size: 2.5rem;
      font-weight: 300;
    }
  }
  .author {
    text-align: right;
    font-size: 1.5rem;
  }
}
</style>

