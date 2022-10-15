<template>
  <div class="container">
    <div v-for="arr in contentProducts">
      <HomeBanner></HomeBanner>
      <BrickBox :products="arr"></BrickBox>
    </div>
  </div>
</template>

<script setup lang='ts'>
import HomeBanner from '@/views/Shop/HomeBanner.vue'
import BrickBox from '@/views/Shop/BrickBox.vue';
import { computed } from 'vue'
import { useProductStore } from '@/stores/product'
import { storeToRefs } from 'pinia'

const productStore = useProductStore()
const { products } = storeToRefs(productStore)

const contentProducts = computed(() => {
  const arr = products.value.slice(0, 6);
  const newArr: Array<any> = []
  for (let i = 0, len = arr.length; i < len; i = i + 2) {
    newArr.push([arr[i], arr[i + 1]])
  }
  return newArr
})



</script>
<style scoped lang='less'>
.container {
  min-width: 1200px;
  background-color: #f5f5f5;
}
</style>