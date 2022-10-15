<template>
  <div class="box">
    <header>
      <span class="title">{{currentTitle}}</span>
      <ul>
        <li :class="{'title-check': index == currentIndex}" v-for="(item,index) in props.products" :key="item.id"
          @click="getCurrentBlack(index)">
          {{ index ===0 ? '热门': item.name }}
        </li>
      </ul>
    </header>
    <main>
      <div class="main-img">
        <img src="../../../public/images/砖盒图片/砖盒大图.webp" alt="">
      </div>
      <div data-index="item" v-for="(item ,index) in currentBlack.product" :key="item.id"
        :class="[{'c-1': index==7},{'reverse': index==7}]" @click="gotoDetail(item)">

        <img v-lazy="'/api' + item.product_picture[0].pic_url" :class="{'reverse-img': index === 7}">
        <div class="text-box">
          <span class="title">{{item.name}}</span>
          <span class="info" v-if="index !== 7">{{item.title}}</span>
          <span class="price">{{item.selling_price}}元 <span class="before"
              v-if="item.price !== item.selling_price">{{item.price}}元</span> </span>
        </div>
      </div>
      <div class="more" @click="gotoCategory(currentBlack)">
        <el-icon>
          <ArrowRightBold />
        </el-icon>
        <div class="text-box">
          <span class="text-more">浏览更多</span>
          <span>{{currentBlack.name}}</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

type Props = {
  products: Array<Products>
}

type Products = {
  id: number,
  name: string,
  product: [
    id: number,
    name: string,
    price: number,
    product_picture: [
      id: number,
      pic_url: string,
      product_id: number
    ],
    selling_price: number,
    title: string
  ]
}

const props = defineProps<Props>()

let currentIndex = ref(0)
let currentTitle = ref(props.products[0].name)
let currentBlack = ref<any>(props.products[currentIndex.value])

function getCurrentBlack(index: number) {
  currentIndex.value = index
  currentBlack.value = props.products[index]
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

// 返回商品类别页面
const gotoCategory = (item: any) => {
  router.push({
    path: '/goods',
    query: {
      id: item.id
    }
  })
}

</script>
<style scoped lang='less'>
@color: #ff6700;

.box {
  width: 1226px;
  height: 628px;
  margin: 20px auto;

  header {
    width: 100%;
    height: 58px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 22px;
      color: rgb(51, 51, 51);
    }

    ul {
      display: flex;

      li {
        display: block;
        font-size: 16px;
        margin-left: 15px;
        transition: .3s;
        cursor: pointer;
      }
    }
  }

  main {
    height: 570px;
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(5, 1fr);
    grid-auto-flow: column;
    gap: 20px 10px;

    &>div {
      transition: .3s;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;



      img {
        width: 100%;
        height: 100%;
      }
    }

    &>div:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 10px 1px rgb(199, 197, 197);
    }

    .main-img {
      grid-row-end: span 4;
      background-color: lightblue;
    }

    div[data-index] {
      grid-row-end: span 2;
      cursor: pointer;

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
          text-align: center;
          width: 200px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
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

    .more {
      cursor: pointer;
      background-color: #ffffff;
      display: flex;
      flex-direction: row-reverse;

      .el-icon {
        font-size: 28px;
        color: @color;
      }

      .text-box {
        display: flex;
        flex-direction: column;
        margin-right: 40px;

        .text-more {
          font-size: 18px;
        }
      }
    }
  }
}

.title-check {
  color: @color;
  border-bottom: 2px solid @color;
}

.c-1 {
  grid-row-end: span 1 !important;
}

.reverse {
  flex-direction: row-reverse !important;
}

.reverse-img {
  width: 80px !important;
  height: 80px !important;
}
</style>