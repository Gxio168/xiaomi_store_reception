<template>
  <div class="card">
    <img :src="url" alt="">
  </div>
</template>

<script setup lang='ts'>
const url:string = '../../../public/images/主页横幅框/图片1.webp'
</script>
<style scoped lang='less'>
.card {
  cursor: pointer;
  width: 1226px;
  margin: 20px auto;
  height: 120px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>