<template>
  <div class="box">
    <div class="header">
      <header>
        <div class="logo">
          <el-icon>
            <CollectionTag />
          </el-icon>
          <span>我的收藏</span>
        </div>
      </header>
    </div>
    <div class="container">
      <div class="goods-list">
        <ul>
          <li v-for="item in collects" :key="item">
            <a @click="router.push({path: 'goodsdetail', query: {id: item.product.id}})">
              <img :src="'/api' + item.product.product_picture[0].pic_url">
              <h2>{{item.product.name}}</h2>
              <h3>{{item.product.title}}</h3>
              <p>
                <span>{{item.product.selling_price}}元</span>
                <span class="del"
                  v-if="item.product.selling_price !== item.product.price">{{item.product.price}}元</span>
              </p>
            </a>
            <el-popconfirm title="确定要移除吗？" @confirm="removeCollect(item)" confirm-button-text="确定"  cancel-button-text="取消">
              <template #reference>
                <el-icon>
                  <Close />
                </el-icon>
              </template>
            </el-popconfirm>

          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const { collects } = storeToRefs(authStore)

onMounted(async () => {
  await authStore.getCollect()
})

const removeCollect = async (item: any) => {
  await authStore.removeFromCollect(item.id)
  await authStore.getCollect()
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

    .goods-list {
      margin: 20px auto;
      width: 1245px;

      ul {
        display: flex;
        flex-wrap: wrap;

        li {
          position: relative;
          background-color: white;
          width: 234px;
          height: 280px;
          margin: 0 0 14px 14px;
          transition: .3s;

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 30px rgb(0 0 0 / 10%);
          }

          a {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            height: 100%;

            img {
              width: 160px;
              height: 160px;
            }

            h2 {
              font-size: 14px;
              color: #333333;
              font-weight: 400;
            }

            h3 {
              color: #b0b0b0;
              font-size: 12px;
              font-weight: 400;
              margin: 5px 0 10px;
            }

            p {
              span {
                color: @color;
              }

              span.del {
                margin-left: 10px;
                color: #b0b0b0;
                text-decoration: line-through;
              }
            }
          }

          &:hover .el-icon {
            display: block;
          }

          .el-icon {
            display: none;
            position: absolute;
            right: 5px;
            top: 5px;

            &:hover {
              color: @color;
            }
          }
        }
      }
    }
  }
}
</style>