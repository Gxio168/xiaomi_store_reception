<template>
  <div class="box">
    <!-- 商品展示 -->
    <header>
      <span class="title">{{detail.name}}</span>
      <div class="list">
        <ul>
          <li>概述</li>
          <li>参数</li>
          <li>用户评价</li>
        </ul>
      </div>
    </header>
    <!-- 详情 -->
    <main>
      <div class="carousel">
        <el-carousel :interval="5000" arrow="always" height="560px" v-if="imgs">
          <el-carousel-item v-for="item in (imgs as any)" :key="item.id">
            <img :src='"/api" + item.pic_url'>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="goods-box">
        <div class="description">
          <span class="title"> {{detail.name}} </span>
          <span>{{detail.introduce}}</span>
          <div class="orginal">小米自营</div>
          <div class="price">{{detail.selling_price}}元 <span class="prePrice"
              v-if="detail.price !== detail.selling_price">{{detail.price}}元</span></div>
        </div>
        <div class="to-buy">
          <div class="pro-list">
            <div>
              <span>{{detail.name}}</span>
              <span>{{detail.selling_price}}元</span>
            </div>
            <span class="total-price">总计： {{detail.selling_price}}元</span>
          </div>
          <div class="buttons">
            <button class="add-to-cart" @click="addToShopCart(detail)">
              <el-icon>
                <ShoppingCart />
              </el-icon>
              加入购物车
            </button>
            <button class="like" @click="addToCollect(detail)">
              <el-icon :class="[ is_delete === 0 ? 'liked' : 'unlike']" >
                <StarFilled />
              </el-icon>
              喜欢
            </button>
          </div>
          <ul>
            <li>
              <el-icon>
                <CircleCheck />
              </el-icon>小米自营
            </li>
            <li>
              <el-icon>
                <CircleCheck />
              </el-icon>小米发货
            </li>
            <li>
              <el-icon>
                <CircleCheck />
              </el-icon>7天无理由退款
            </li>
            <li>
              <el-icon>
                <CircleCheck />
              </el-icon>7天价格保护
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref, watch } from 'vue';
import type { Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '@/stores/product'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import type { Detail } from '@/api/auth.type'
import { ElMessage } from 'element-plus'

let imgs = ref(null)
const productStore = useProductStore()
const authStore = useAuthStore()
let detail: Ref<Detail> = storeToRefs(productStore).detail
const { token } = storeToRefs(authStore)
const route = useRoute()
const router = useRouter()

// 获取商品
const getDetail = async () => {
  const { query: { id = 1 } } = route
  await productStore.getDetail(id as any)
  imgs.value = detail.value.product_picture as any;
}
let is_delete = ref(1)
onMounted(async () => {
  await getDetail()
  if (token.value) {
    is_delete.value = await authStore.checkCollect(detail.value.id)
  }
})

// 监视路由的变化
watch(
  () => route.query.id,
  (id) => {
    router.go(0)
    productStore.getDetail(id as any)
  }
)

// 添加商品到购物车
const addToShopCart = async (item: any) => {
  if (!token.value) {
    router.push('/login?redirect=' + route.fullPath)
  } else {
    await authStore.addToShopCart(item.id)
    await authStore.getShopCart()
  }
}

// 加入我的收藏
const addToCollect = async (item: any) => {
  if (token.value) {
    if (is_delete.value === 0) {
      ElMessage.error({
        message: '当前商品已被添加进我的收藏'
      })
    } else {
      await authStore.addToCollect(item.id)
      is_delete.value = 0
    }
  } else {
    router.push('/login?redirect=' + route.fullPath)
  }
}



</script>
<style scoped lang='less'>
@color: #ff6700;

.box {
  header {
    width: 1206px;
    height: 64px;
    margin: 0 auto;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 5px 5px rgb(0 0 0 / 7%);

    .title {
      margin-left: 10px;
      font-size: 18px;
    }

    .list {
      ul {
        display: flex;

        li {
          margin: 0 10px;
          cursor: pointer;
          transition: .3s;

          &:hover {
            color: @color;
          }
        }
      }
    }
  }

  main {
    width: 1206px;
    height: 560px;
    margin: 20px auto 0;
    display: flex;

    .carousel {
      width: 560px;
      height: 560px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .goods-box {
      flex: 1;

      .description {
        .title {
          display: block;
          height: 50px;
          font-size: 24px;
          color: black;
          margin-bottom: 10px;
          line-height: 50px;
        }

        span {
          color: rgb(176, 176, 176);
          font-size: 16px;
        }

        .orginal {
          margin: 10px 0;
          color: @color;
        }

        .price {
          margin: 20px 0 40px;
          font-size: 18px;
          color: @color;
          border-bottom: 1px solid #ccc;

          .prePrice {
            text-decoration: line-through;
          }
        }
      }

      .to-buy {
        width: 100%;

        .pro-list {
          width: 100%;
          background-color: #f9f9fa;
          padding: 20px 40px;

          div {
            display: flex;
            justify-content: space-between;
          }

          .total-price {
            display: block;
            margin: 30px 0;
            font-size: 24px;
            color: @color;
          }
        }

        .buttons {
          margin-top: 50px;
          display: flex;
          justify-content: space-between;

          button {
            cursor: pointer;
            width: 290px;
            height: 55px;
            color: white;
            border: none;
            border-radius: 5px;
            overflow: hidden;
            transition: .3s;
            display: flex;
            align-items: center;
            justify-content: center;

            &.add-to-cart {
              background-color: @color;

              &:hover {
                background-color: #f25807;
              }
            }

            &.like {
              background-color: #b0b0b0;
              transition: .2s;

              &:hover {
                background-color: #757575;
              }
              .liked {
                color: #e5bf00;
              }
              .unlike {
                color: #ccc;
              }
            }

            .el-icon {
              font-size: 22px;
              margin-right: 10px;
            }
          }
        }

        ul {
          display: flex;
          margin-top: 40px;
          color: #ccc;

          li {
            .el-icon {
              margin-right: 10px;
            }

            display: flex;
            align-items: center;
            margin-right: 20px;
          }
        }
      }
    }
  }
}

// 测试使用
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>