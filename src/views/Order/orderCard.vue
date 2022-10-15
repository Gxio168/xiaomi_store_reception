<template>
  <div class="content">
    <ul>
      <li class="order-info">
        <div class="order-id">订单编号:{{ orders[0].product.name }}</div>
        <div class="order-time">订单时间: {{new Date( orders[0].order_time).toLocaleString()}}</div>
      </li>
      <li class="header">
        <div class="pro-img"></div>
        <div class="pro-name">商品名称</div>
        <div class="pro-price">单价</div>
        <div class="pro-num">数量</div>
        <div class="pro-total">小计</div>
      </li>
      <li class="product-list" v-for="orderList1 in orders" :key="orderList1.id">
        <div class="pro-img">
          <a @click="router.push({ path: '/goodsdetail', query: { id: orderList1.product_id} })">
            <img :src="'/api' + orderList1.product.product_picture[0].pic_url">
          </a>
        </div>
        <div class="pro-name">
          <a
            @click="router.push({ path: '/goodsdetail', query: { id: orderList1.product_id} })">{{orderList1.product.name}}</a>
        </div>
        <div class="pro-price">{{orderList1.product_price}}元</div>
        <div class="pro-num">{{orderList1.product_num}}</div>
        <div class="pro-total pro-total-in">{{orderList1.product_price * orderList1.product_num}}元</div>
      </li>
    </ul>
    <div class="order-bar">
      <div class="order-bar-left">
        <span>共<span class="order-totla-num"> {{totalNum}} </span>件商品</span>
      </div>
      <div class="order-bar-right">
        <span>
          合计: <span class="total-price">{{totalPrice}}元</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { orders } = defineProps(['orders'])

const totalNum = computed(() => {
  return orders.reduce((prev: number, next: any) => {
    return prev + next.product_num
  }, 0)
})

const totalPrice = computed(() => {
  return orders.reduce((prev: number, next: any) => {
    return prev + next.product_num * next.product_price
  }, 0)
})

</script>
<style scoped lang='less'>
@color: #ff6700;

.content {
  background-color: white;
  width: 1206px;
  margin: 30px auto;

  ul {
    width: 100%;

    .order-info {
      height: 61px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid @color;

      div {
        margin: 0 20px;

        &.order-id {
          color: @color;
        }
      }
    }

    .header,
    .product-list {
      height: 85px;
      display: flex;
      border-bottom: 1px solid #e0e0e0;

      div {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;


        &.pro-img {
          margin-left: 80px;
          width: 120px;

          img {
            width: 80px;
            height: 80px;
          }
        }

        &.pro-name {
          cursor: pointer;
          justify-content: flex-start;
          width: 380px;

          a {
            color: #333;
            transition: .3s;

            &:hover {
              color: @color;
            }
          }
        }

        &.pro-price {
          width: 160px;
        }

        &.pro-num {
          width: 190px;
        }

        &.pro-total {
          width: 240px;
        }

        &.pro-total-in {
          color: @color;
        }
      }
    }

    .product-list {
      margin-top: 10px;
    }
  }

  .order-bar {
    margin: 0 auto 20px;
    width: 1206px;
    background-color: white;
    height: 50px;
    display: flex;
    justify-content: space-between;
    border-top: 2px solid @color;

    .order-bar-left {
      margin-left: 20px;
      height: 100%;
      display: flex;
      align-items: center;

      &>span {
        font-size: 14px;
        color: #757575;
        padding: 0 20px;

        &>span {
          color: @color;
        }
      }
    }

    .order-bar-right {
      height: 100%;
      display: flex;
      align-items: center;

      &>span {
        color: @color;
        margin-right: 20px;

        span {
          font-size: 30px;
        }
      }

    }
  }
}
</style>