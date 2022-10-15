<template>
  <div class="goods">
    <div class="breadcrumb">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>全部商品</el-breadcrumb-item>
        <el-breadcrumb-item>{{route.query.search ? '搜索': '分类'}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="nav">
      <el-tabs type="border-card" @tab-click="getTab" v-model="curCategoryIdx">
        <el-tab-pane label="全部商品" :name="0">
        </el-tab-pane>
        <el-tab-pane :label="item.name" v-for="item in products" :key="item.id" :name="item.id">
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="goods-box">
      <ul>
        <li v-for="item in ((categories as any).product)" :key="item.id" @click="gotoDetail(item)">
          <img v-lazy="'/api' + item.product_picture[0].pic_url">
          <div class="text-box">
            <span class="title">{{item.name}}</span>
            <span class="info">{{item.title}}</span>
            <span class="price">{{item.selling_price}}元 <span class="before"
                v-if="item.price !== item">{{item.price}}元</span>
            </span>
          </div>
        </li>
      </ul>
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="15"
        v-model:currentPage="curPage" @current-change="pageChange" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ArrowRight } from '@element-plus/icons-vue';
import type { TabsPaneContext } from 'element-plus'
import { ref, computed, onBeforeMount } from 'vue';
import type { Ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { useProductStore } from '@/stores/product'
import { storeToRefs } from 'pinia'
import type { Product } from '@/api/auth.type'

const router = useRouter();
const route = useRoute();
const productStore = useProductStore();

const categories: Ref<Array<Product>> = storeToRefs(productStore).category;
const products: Ref<Array<Product>> = storeToRefs(productStore).products;
const total = storeToRefs(productStore).total;
const getCategory = async (id: number, page: number) => {
  await productStore.getCategory(id, page)
}

onBeforeMount(async () => {
  if (route.query.id) {
    const { query: { id = 0 } } = route
    getCategory(id as number, 1)
  } else if (route.query.search) {
    const { query: { search } } = route
    productStore.fuzzyFind(search as string, 1)
  } else {
    getCategory(0, 1)
  }
})

const curCategoryIdx = ref(+(route.query.id as any)) || ref(0);
const curPage = ref(1)

// 获取当前 tab 栏点击的选项
const getTab = async (pan: TabsPaneContext) => {
  await router.push({
    path: '/goods',
    query: {
      id: pan.index
    }
  })
  const { query: { id = 0 } } = route
  const page:number = 1
  getCategory(id as number, page as number)
  curCategoryIdx.value = parseInt(pan.index as any);
  curPage.value = 1
}

// page 页面修改触发
const pageChange = (page: number) => {
  if (route.query.id) {
    const { query: { id = 0 } } = route
    getCategory(id as number, page as number)
  } else if (route.query.search) {
    const { query: { search } } = route
    productStore.fuzzyFind(search as string, page)
  } else {
    getCategory(0, page as number)
  }
}

// 返回商品细节页面
const gotoDetail = (item: any) => {
  router.push({
    path: '/goodsDetail',
    query: {
      id: item.id
    }
  })
}


</script>
<style scoped lang='less'>
@color: #ff6700;

.goods {
  min-width: 1206px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .breadcrumb {
    width: 1206px;
    margin: 20px 0;

    .el-breadcrumb {
      font-size: 20px;
    }
  }

  .nav {
    width: 1206px;
    display: flex;

    &::before {
      content: '分类';
      transform: translateY(10px);
      font-weight: 800;
      margin-right: 15px;
    }

    :deep(.el-tabs) {
      background: white;

      .el-tabs__content {
        display: none;
      }

    }


  }

  .goods-box {
    width: 100vw;
    min-height: 800px;
    display: flex;
    flex-direction: column;
    background-color: #f5f5f5;
    align-items: center;

    ul {
      width: 1220px;
      display: flex;
      flex-wrap: wrap;

      li {
        background-color: white;
        margin: 20px 6px 0;
        padding: 10px;
        width: 230px;
        height: 280px;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: .5s;
        cursor: pointer;

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 10px 1px rgb(199, 197, 197);
        }

        img {
          width: 160px;
          height: 160px;
        }

        .text-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          user-select: none;

          span {
            margin: 5px 0;
          }

          .title {
            width: 210px;
            overflow: hidden;
            white-space: nowrap;
            text-align: center;
            text-overflow: ellipsis;
            font-size: 14px;
          }

          .info {
            text-align: center;
            width: 237px;
            font-size: 13px;
            color: rgb(176, 176, 176);
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            padding: 0 5px;
          }

          .price {
            color: @color;

            .before {
              color: rgb(176, 176, 176);
              text-decoration: line-through;
            }
          }
        }
      }
    }
  }

  .el-pagination {
    margin-top: auto;
  }
}
</style>