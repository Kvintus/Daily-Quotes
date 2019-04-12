<template>
  <div>
    <div class="top-counter">
      21/500
    </div>
    <div class="holder">
      <Quote quote="test" author="Peter"/>
    </div>
    <BottomMenu/>
  </div>
</template>

<script>
import Quote from '@/components/Quote'
import BottomMenu from '@/components/BottomMenu/index'

export default {
  components: {
    Quote,
    BottomMenu,
  },
}
</script>

<style lang="scss" scoped>
.holder {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.top-counter {
  font-size: 1.5rem;
  color: rgb(168, 168, 168);
  position: absolute;
  top: 0;
  width: 100%;
  text-align: center;
}
</style>

