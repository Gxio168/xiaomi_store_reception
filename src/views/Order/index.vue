<template>
  <div class="box">
    <div class="header">
      <header>
        <div class="logo">
          <el-icon>
            <List />
          </el-icon>
          <span>我的订单</span>
        </div>
      </header>
    </div>
    <div class="container">
      <orderCard v-for="item in (orderList as any)" :key="item.id" :orders="item"></orderCard>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { onMounted, reactive } from 'vue'
import orderCard from '@/views/Order/orderCard.vue'

const authStore = useAuthStore()
const { orders } = storeToRefs(authStore)
let orderList = reactive([])

onMounted(async () => {
  await authStore.getOrder()
  let set = new Set()
  for (let i = 0, len = orders.value.length; i < len; i++) {
    if (set.has(orders.value[i].order_id)) {
      (orderList[orderList.length - 1] as any).push(orders.value[i])
    } else {
      set.add(orders.value[i].order_id)
      orderList.push([orders.value[i]])
    }
  }
})

</script>
<style scoped lang='less'>
@color: #ff6700;

.box {
  min-width: 1206px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &>.header {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
    border-bottom: 2px solid @color;

    header {
      width: 1206px;
      display: flex;

      .logo {
        display: flex;
        align-items: center;

        .el-icon {
          color: @color;
          font-size: 28px;
          margin-right: 5px;
        }

        span {
          font-size: 28px;
        }
      }

      &>span {
        margin: 22px 10px 0;
        font-size: 12px;
        color: rgb(117, 117, 117);
      }
    }
  }

  &>.container {
    width: 100vw;
    background-color: #f5f5f5;

   
  }
}
</style>