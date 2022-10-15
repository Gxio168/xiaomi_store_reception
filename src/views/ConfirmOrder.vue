<template>
  <div class="box">
    <div class="header">
      <header>
        <div class="logo">
          <el-icon>
            <List />
          </el-icon>
          <span>确认订单</span>
        </div>
      </header>
    </div>
    <div class="container">
      <div class="card">
        <div class="section-address">
          <span>收货地址</span>
          <ul>
            <li>
              <h2>王同学</h2>
              <p>13027233062</p>
              <p class="address">江西省 南昌市 南昌县 紫阳大道 999 号</p>
            </li>
            <li>
              <h2>李同学</h2>
              <p>13027233063</p>
              <p class="address">江西省 南昌市 南昌县 紫阳大道 999 号</p>
            </li>
            <li>
              <div class="add-address">
                <el-icon>
                  <CirclePlus />
                </el-icon>
                <span>添加新地址</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="section-goods">
          <div class="goods-header">商品及优惠券</div>
          <div class="goods-container">
            <ul>
              <li v-for="item in (checkedShop as any)" :key="item.id">
                <img :src="'/api' + item.product.product_picture[0].pic_url">
                <span class="pro-name">{{item.product.name}}</span>
                <span class="pro-price">{{item.product.selling_price}}元 x {{item.num}}</span>
                <span class="pro-status"></span>
                <span class="pro-total">{{item.product.selling_price * item.num}}元</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="section-shipment">
          <p class="title">配送方式</p>
          <p class="shipment">包邮</p>
        </div>
        <div class="section-invoice">
          <p class="title">发票</p>
          <p class="invoice">电子发票</p>
          <p class="invoice">个人</p>
          <p class="invoice">商品明细</p>
        </div>
        <div class="section-count">
          <div class="money-box">
            <ul>
              <li>
                <span class="title">商品件数:</span>
                <span class="value">{{getCartNum}}件</span>
              </li>
              <li>
                <span class="title">商品总价:</span>
                <span class="value">{{getTotalPrice}}元</span>
              </li>
              <li>
                <span class="title">活动优惠:</span>
                <span class="value">-0元</span>
              </li>
              <li>
                <span class="title">优惠券抵扣:</span>
                <span class="value">-0元</span>
              </li>
              <li>
                <span class="title">运费:</span>
                <span class="value">0元</span>
              </li>
              <li class="total">
                <span class="title">应付总额:</span>
                <span class="value"><span style="font-size: 30px;">{{getTotalPrice}}</span>元</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="section-bar">
          <div class="btns">
            <router-link to="/shoppingCart" class="back">返回购物车</router-link>
            <router-link to="/order" class="order">结算</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'

const authStore = useAuthStore();
const { checkedShop } = storeToRefs(authStore)

// 当前商品总数量
const getCartNum = computed(() => {
  return checkedShop.value.reduce((prev: number,next: any) => {
    if(next.checked) {
      return prev = prev + next.num
    }
    return prev
  }, 0)
})

// 总价格
const getTotalPrice = computed(() => {
  return checkedShop.value.reduce((prev: number, next: any) => {
    prev += next.product.selling_price * next.num
    return prev
  }, 0)
})

// 给路由一个导航守卫
onBeforeRouteLeave(async (to, from) => {
  if (to.path === '/order') {
    const result = JSON.parse(JSON.stringify(checkedShop.value))
    if (result.length) {
      await authStore.addToOrder(result)
      await authStore.getShopCart()
      return true
    } else {
      ElMessage.error({
        message: '请前往购物车添加商品'
      })
      return false
    }
  } else {
    return true
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
          font-size: 32px;
          margin-right: 20px;
        }

        span {
          font-size: 24px;
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

    .card {
      margin: 20px auto;
      padding: 40px 0;
      width: 1206px;
      height: 1000px;
      background-color: white;

      &>div {
        margin: 20px auto;
        width: 1129px;

        &.section-address {
          span {
            font-size: 18px;
          }

          ul {
            display: flex;

            li {
              color: rgb(117, 117, 117);
              margin: 20px 20px 0 0;
              width: 250px;
              height: 200px;
              padding: 20px;
              border: 1px solid #ccc;

              &:first-child {
                border: 1px solid @color;
              }

              h2 {
                font-size: 18px;
                font-weight: 400;
              }

              p {
                margin-top: 10px;
              }

              .add-address {
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                .el-icon {
                  font-size: 32px;
                  margin-bottom: 10px;
                }

                span {
                  font-size: 16px;
                }
              }
            }
          }
        }

        &.section-goods {
          .goods-header {
            font-size: 18px;
            color: #333;
            margin: 5px 0;
          }

          .goods-container {
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;

            ul {
              display: flex;
              flex-direction: column;
              justify-content: center;

              li {
                height: 50px;
                display: flex;
                align-items: center;
                color: rgb(66, 66, 66);

                img {
                  width: 30px;
                  height: 30px;
                  margin-right: 10px;
                }

                .pro-name {
                  width: 650px;
                }

                .pro-price {
                  width: 150px;
                }

                .pro-status {
                  flex: 1;
                }

                .pro-total {
                  color: @color;
                  width: 190px;
                }
              }
            }
          }
        }

        &.section-shipment {
          padding: 5px 0 25px;
          border-bottom: 1px solid #ccc;

          p {
            display: inline-block;
            height: 38px;
            line-height: 38px;

            &.title {
              width: 150px;
              font-size: 18px;
              color: #424242;
            }

            &.shipment {
              font-size: 12px;
              color: @color;
            }
          }
        }

        &.section-invoice {
          padding: 5px 0 25px;
          border-bottom: 1px solid #ccc;

          p {
            display: inline-block;
            height: 38px;
            line-height: 38px;

            &.title {
              width: 150px;
              font-size: 18px;
              color: #424242;
            }

            &.invoice {
              margin-right: 10px;
              font-size: 12px;
              color: @color;
            }
          }
        }

        &.section-count {
          padding-bottom: 20px;
          border-bottom: 1px solid #ccc;
          display: flex;
          justify-content: flex-end;

          .money-box {
            width: 231px;

            ul {
              li {
                height: 30px;
                display: flex;

                span {
                  height: 100%;
                  text-align: right;

                  &.title {
                    color: #757575;
                    width: 126px;
                  }

                  &.value {
                    color: @color;
                    width: 105px;
                  }
                }

                &.total {
                  span {
                    height: 45px;

                    &.title {
                      line-height: 50px;
                    }
                  }
                }
              }
            }
          }
        }

        &.section-bar {
          display: flex;
          justify-content: flex-end;

          .btns {
            height: 40px;

            a {
              margin-left: 20px;
              display: inline-block;
              width: 160px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              color: white;
              transition: .3s;
              border-radius: 5px;
              overflow: hidden;

              &.back {
                background-color: #b0b0b0;

                &:hover {
                  background-color: #757575;
                }
              }

              &.order {
                background-color: @color;

                &:hover {
                  background-color: #f25807;
                }
              }
            }
          }
        }
      }
    }
  }

}
</style>