<template>
  <div class="box">
    <div class="header">
      <header>
        <div class="logo">
          <el-icon>
            <ShoppingCart />
          </el-icon>
          <span>我的购物车</span>
        </div>
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快下单</span>
      </header>
    </div>
    <div class="container">
      <ul class="content">
        <li class="header">
          <div class="pro-check">
            <el-checkbox v-model="isAllChecked" @change="changeAllChecked">全选</el-checkbox>
          </div>
          <div class="pro-img"></div>
          <div class="pro-name">商品名称</div>
          <div class="pro-price">单价</div>
          <div class="pro-num">数量</div>
          <div class="pro-total">小计</div>
          <div class="pro-action">操作</div>
        </li>
        <!-- 商品列表 -->
        <li class="product-list" v-for="item in cartBar" :key="item.id">
          <div class="pro-check">
            <el-checkbox v-model="item.checked"></el-checkbox>
          </div>
          <div class="pro-img">
            <img :src="'/api' + item.product.product_picture[0].pic_url">
          </div>
          <div class="pro-name" @click="router.push({path: '/goodsdetail',query: {id: item.product.id}})">
            <span>{{item.product.name}}</span>
          </div>
          <div class="pro-price">{{item.product.selling_price}}元</div>
          <div class="pro-num">
            <div style="width: 130px;">
              <el-input-number v-model="item.num" :min="1" :max="10" @change="handleChange(item)"  />
            </div>
          </div>
          <div class="pro-total">
            <span>{{item.product.selling_price * item.num}}元</span>
          </div>
          <div class="pro-action">
            <el-icon @click="removeShop(item)">
              <CircleCloseFilled />
            </el-icon>
          </div>
        </li>
      </ul>
      <div class="cart-bar">
        <div class="cart-bar-left">
          <span>
            <router-link to="/goods">继续购物</router-link>
          </span>
          <span>共<span class="cart-totla-num"> {{ getTotalCartNum }} </span>件商品，已选择<span class="cart-totla-num"> {{getCartNum}}
            </span>件</span>
        </div>
        <div class="cart-bar-right">
          <span>
            合计: <span class="total-price">{{ getTotalPrice }}</span>
          </span>
          <a @click="goToConfirmOrder">
            <div :class="[getCartNum > 0 ? 'ischeck' : 'uncheck']">去结算</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed, onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { CheckboxValueType } from 'element-plus'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const router = useRouter()
const authStore = useAuthStore()
const { shopCart } = storeToRefs(authStore)

onBeforeMount(async () => {
  await authStore.getShopCart()
  cartBar.value = shopCart.value.map(item => {
    (item as any).checked = false
    return item
  })
})

const cartBar = ref<Array<any>>([]);
// 计算全选框的状态
const isAllChecked = computed(() => {
  return cartBar.value.every(item => item.checked === true)
})  
// 点击全选框进行修改状态
const changeAllChecked = async (value: CheckboxValueType) => {
  if (!value) {
    cartBar.value.forEach(item => {
      item.checked = false
    })
  } else {
    cartBar.value.forEach(item => {
      item.checked = true
    })
  }
}
// 点击加减栏，修改商品的 checked 属性
const handleChange = (item: any) => {
  item.checked = true
  authStore.changeShopNum(item.id, item.num)
}
// 计算总的商品数量
const getTotalCartNum = computed(() => {
  return cartBar.value.reduce((prev: number, next: any) => {
    return prev + next.num
  }, 0)
})
// 计算当前已经选择的商品的数量
const getCartNum = computed(() => {
  return cartBar.value.reduce((prev: number,next: any) => {
    if(next.checked) {
      return prev = prev + next.num
    }
    return prev
  }, 0)
})
// 获取总价格
const getTotalPrice = computed(() => {
  return cartBar.value.reduce((prev: number, next: any) => {
    if (next.checked) {
      prev += next.product.selling_price * next.num
    }
    return prev
  }, 0)
})
// 判断商品是否被选上，选择上了就进行路由跳转
const goToConfirmOrder = () => {
  let result = [...cartBar.value.filter(item => item.checked)]
  authStore.getCheckedShop(result)
  if (getCartNum.value > 0) {
    router.push('/confirmOrder')
  }
}

// 移除购物车中的商品
const removeShop = async ({ id }: any) => {
  await authStore.removeFromShopCart(id)
  await authStore.getShopCart()
}


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
          font-size: 30px;
        }
      }

      &>span {
        margin: 22px 10px 0;
        font-size: 12px;
        color: rgb(117, 117, 117);
      }
    }
  }

  .container {
    width: 100vw;
    background-color: #f5f5f5;

    .content {
      width: 1225px;
      margin: 20px auto;
      background-color: white;

      li {
        width: 100%;
        display: flex;
        align-items: center;

        &.header {
          height: 85px;
        }

        &.product-list {
          height: 116px;
          padding: 15px 0;
          border-top: 1px solid #ccc;
        }

        div {
          // height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;

          &.pro-check {
            width: 110px;
          }

          &.pro-img {
            width: 120px;

            img {
              width: 80px;
              height: 80px;
              cursor: pointer;
            }
          }

          &.pro-name {
            justify-content: flex-start;
            width: 380px;

            span {
              cursor: pointer;
              transition: .3s;

              &:hover {
                color: @color;
              }
            }
          }

          &.pro-price {
            flex: 1;
          }

          &.pro-num {
            width: 150px;
          }

          &.pro-total {
            width: 200px;

            span {
              color: @color;
            }
          }

          &.pro-action {
            margin-right: 20px;
            width: 80px;

            .el-icon {
              font-size: 20px;
              cursor: pointer;
              transition: .3s;

              &:hover {
                color: @color;
              }
            }
          }
        }
      }
    }

    .cart-bar {
      margin: 0 auto 20px;
      width: 1225px;
      background-color: white;
      height: 50px;
      display: flex;
      justify-content: space-between;

      .cart-bar-left {
        margin-left: 20px;
        height: 100%;
        display: flex;
        align-items: center;

        &>span {
          padding: 0 20px;

          &:first-child {
            border-right: 1px solid #ccc;

            a {
              color: #000;
              &:hover {
                color: @color;
              }
            }
          }
          &>span {
            color: @color;
          }
        }
      }

      .cart-bar-right {
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

        a {
          cursor: pointer;
          div {
            width: 200px;
            height: 50px;
            font-size: 18px;
            text-align: center;
            line-height: 50px;
            transition: .3s;
           
            &.ischeck {
              color: white;
              background-color: @color;
              &:hover {
              background-color: #f25807;
            }
            }
            &.uncheck {
              background-color: #e0e0e0;
              color: #b0b0b0;
            }
          }
        }
      }
    }
  }

}

</style>