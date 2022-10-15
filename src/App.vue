<template>
  <Header v-if="route.meta.isShow"></Header>
  <router-view></router-view>
  <Toolbar v-if="route.meta.isShow"></Toolbar>
  <Footer v-if="route.meta.isShow"></Footer>
</template>

<script setup lang='ts'>
import { useRoute, } from 'vue-router'
import Header from '@/components/Header.vue'
import Toolbar from '@/components/Toolbar.vue'
import Footer from '@/components/Footer.vue'

let route = useRoute();


</script>
<style scoped lang='less'>

</style>