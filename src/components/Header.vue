<template>
  <!-- 头部导航栏 -->
  <header>
    <!-- 导航栏左侧导航 -->
    <div class="topbar-nav">
      <router-link to="">小米官网</router-link>
      <router-link to="">小米商城</router-link>
      <router-link to="">MIUI</router-link>
      <router-link to="">IoT</router-link>
      <router-link to="">云服务</router-link>
      <router-link to="">天星数码</router-link>
      <router-link to="">有品</router-link>
      <router-link to="">小爱开放平台</router-link>
      <router-link to="">企业团购</router-link>
      <router-link to="">资质证照</router-link>
      <router-link to="">协议规则</router-link>
      <router-link to="">
        <el-popover placement="top-start" :width="30" trigger="hover">
          <template #reference>
            Hover to activate
          </template>
          <div class="downLoad">
            <img src="../../public/images/二维码/appDownLoad.png" alt="" style="width: 90px;height:90px">
            <span>小米商城APP</span>
          </div>
        </el-popover>
      </router-link>
      <router-link to="">Select Location</router-link>
    </div>
    <!-- 导航栏右侧导航 -->
    <!-- 用户登录信息 -->
    <div class="topbar-info">
      <div v-if="Object.keys(userInfo).length == 0">
        <router-link :to="{path: '/login', query: {mode: 'login'} }">登录</router-link>
        <router-link :to="{path: '/login', query: {mode: 'register'} }">注册</router-link>
      </div>
      <div v-else>
        <el-popconfirm title="是否要退出登录" confirm-button-text="确定" cancel-button-text="取消" :icon="InfoFilled"
          icon-color="#626AEF" @confirm="logout">
          <template #reference>
            <a style="cursor: pointer">{{userInfo}}</a>
          </template>
        </el-popconfirm>
      </div>
      <router-link to="/order">我的订单</router-link>
      <router-link to="/collect">我的收藏</router-link>
    </div>
    <!-- 购物车 -->
    <div class="topbar-cart">
      <el-icon :size="18">
        <ShoppingCart />
      </el-icon>
      <span>
        <span @click="router.push({path: '/shoppingCart'})">
          购物车( {{ getTotalCartNum }} )
        </span>
        <!-- 购物车中还没有商品，赶紧选购吧！ -->
        <el-card class="shopListMenu">
          <div class="shop-cart">
            <ul>
              <li v-for="item in cartBar" :key="item.id">
                <img :src="'/api' + item.product.product_picture[0].pic_url">
                <div class="cart-info" @click="router.push({path: '/goodsdetail',query: {id: item.product.id}})">
                  <h2>{{item.product.name}}</h2>
                  <h2>{{ item.product.title }}</h2>
                </div>
                <div class="cart-num">{{item.product.selling_price}}元×{{item.num}}</div>
                <el-icon @click="removeShop(item)">
                  <Close />
                </el-icon>
              </li>
            </ul>
            <div class="shop-bar">
              <div class="shop-bar-info">
                <div class="shop-bar-num">共{{getTotalCartNum}}件商品</div>
                <div class="shop-bar-total"><span class="shop-bar-total-price">{{getTotalPrice}}</span>元</div>
              </div>
              <router-link to="shoppingCart">去购物车结算</router-link>
            </div>
          </div>
        </el-card>
      </span>
    </div>
  </header>
  <div class="container">
    <!-- logo -->
    <div class="header-log">
      <router-link to="/" title="小米官网"></router-link>
    </div>
    <!-- 可变导航栏 -->
    <div class="header-nav">
      <ul ref="navList">
        <li class="nav-category">
          <router-link to="/goods">全部商品分类</router-link>
          <!-- <a style="display: none;">全部商品分类</a> -->
          <div class="site-category" :class="[route.path === '/' ? 'route-main': 'route-other']">
            <ul ref="categoryList">
              <li data-index="categoryItem.cid" v-for="productItem in products" :key="productItem.id">
                <a>{{productItem.name}}
                  <el-icon>
                    <ArrowRightBold />
                  </el-icon>
                </a>
                <div class="category-store">
                  <ul>
                    <li v-for="product2Item in productItem.product.slice(0 ,15)" :key="product2Item.id"
                      @click="gotoDetail(product2Item)">
                      <img :src="'/api' + product2Item.product_picture[0]['pic_url']">
                      <span>{{product2Item.name}}</span>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>
        <li :data-index="index" v-for="(item, index) in products.slice(0,7)" :key="item.id">
          <a>{{item.name}}</a>
        </li>
        <li>
          <a>服务中心</a>
        </li>
        <li>
          <a>社区</a>
        </li>
        <ul>
          <li v-for="navList1Item in products.slice(0,8)" :key="navList1Item.id">
            <div class="card-container">
              <div class="card" v-for="navList2Item in navList1Item.product.slice(0, 6)"
                @click="gotoDetail(navList2Item)">
                <a href="javascript:;"><img :src="'/api' + navList2Item.product_picture[0]['pic_url']"></a>
                <div class="title">{{navList2Item.name}}</div>
                <span class="price">{{navList2Item.selling_price}}元起</span>
              </div>
            </div>
          </li>
        </ul>
      </ul>
    </div>
    <!-- 搜索框 -->
    <div class="header-search">
      <div class="keywords-search">
        <ul>
          <li>全部商品</li>
          <li>红米</li>
          <li>手机</li>
          <li>黑鲨5</li>
          <li>冰箱</li>
          <li>电视</li>
          <li>洗衣机</li>
          <li>Redmi G 2021</li>
        </ul>
      </div>
      <input type="text" :placeholder="keyWords[0]" ref="input" v-model.trim="inputText" @keydown.enter="gotoSearch">
      <div class="icon-search">
        <el-icon :size="25" @click="gotoSearch">
          <Search />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { InfoFilled } from '@element-plus/icons-vue'
import dealNavlist from '@/utils/dealNavList'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/product'

const authStore = useAuthStore();
const productStore = useProductStore()
const route = useRoute();
const router = useRouter();

// 获取用户信息
const { userInfo, shopCart, token } = storeToRefs(authStore)
const { products } = storeToRefs(productStore)

// 退出登录
const logout = () => {
  authStore.logout()
  router.push('/')
}

const categoryList = ref(null);
const navList = ref(null)
const input = ref(null);
const keyWords = ['手机', '笔记本', '黑鲨', '红米', '耳机', '电源']

// 定时器
let timer: any = null
// 获取当前要展示的tag
const thisDealNavList = () => {
  // 获取要进行渲染的 li 节点的父元素 ul
  const renderParnent = (navList.value as any).lastElementChild
  const renderNode = [...renderParnent.children as Array<HTMLLIElement>];
  const selectChild = [...(navList.value as any).children].filter(item => item.dataset['index'] !== undefined)
  selectChild.forEach((li, index) => {
    li.addEventListener('mouseenter', () => {
      renderNode.forEach((list) => {
        list.style.display = 'none'
      });
      renderNode[index].style.display = 'block';
    })
  })
}
// 修改搜索框中的关键字
const changePlaceHolder = () => {
  let index = 1
  timer = setInterval(() => {
    (input.value as any).placeholder = keyWords[index++ % (keyWords.length)];
  }, 5000);
}

// 处理搜索框边上的下拉框
// 页面挂在完毕后执行的操作
onMounted(async () => {
  await productStore.getAllProduct()
  if (token.value) {
    await authStore.getShopCart()
  }
  thisDealNavList()
  dealNavlist(categoryList.value as any)
  changePlaceHolder()
  cartBar.value = shopCart.value
})

// 页面卸载时清除定时器
onUnmounted(() => {
  clearInterval(timer)
})

const gotoDetail = (item: any) => {
  router.push({
    path: '/goodsDetail',
    query: {
      id: item.id
    }
  })
}

const cartBar = ref<Array<any>>([]);
// 获取所有商品数量
const getTotalCartNum = computed(() => {
  return cartBar.value.reduce((prev: number, next: any) => {
    return prev + next.num
  }, 0)
})

// 获取总价格
const getTotalPrice = computed(() => {
  return cartBar.value.reduce((prev: number, next: any) => {
    prev += next.product.selling_price * next.num
    return prev
  }, 0)
})
// 监视购物车的变化
watch(
  () => shopCart,
  () => {
    cartBar.value = shopCart.value
  }, {
  deep: true
}
)

// 移除购物车中商品
const removeShop = async ({ id }: any) => {
  await authStore.removeFromShopCart(id)
  await authStore.getShopCart()
}

// 搜索栏
const inputText = ref('');

const gotoSearch = async () => {
  await productStore.fuzzyFind(inputText.value, 1)
  router.push({
    path: 'goods',
    query: {
      search: inputText.value
    }
  })
}

</script>
<style scoped lang='less'>
@color: #ff6a00;

header {
  background-color: #333333;
  height: 40px;
  min-width: 1200px;
  display: flex;
  justify-content: center;

  .topbar-nav,
  .topbar-info {
    display: flex;
    align-items: center;

    :last-child {
      border-right: none;
    }

    a {
      font-size: 13px;
      text-decoration: none;
      color: #b0b0b0;
      padding: 0 10px;
      border-right: 1px solid #424242;
      white-space: nowrap;

      &:hover {
        color: white;
      }
    }


  }

  .topbar-cart {
    position: relative;
    height: 40px;
    width: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    background-color: rgb(66, 66, 66);
    cursor: pointer;
    color: rgb(176, 176, 176);

    &:hover {
      background-color: rgb(255, 255, 255);
      color: rgb(255, 103, 0);

      .shopListMenu {
        display: block;
      }
    }

    span {
      font-size: 13px;
      font-weight: 400px;
    }

    .shopListMenu {
      display: none;
      width: 316px;
      z-index: 100;
      position: absolute;
      top: 40px;
      right: 0;
      transition: .2s;

      .shop-cart {
        width: 100%;

        ul {
          width: 100%;
          max-height: 200px;
          overflow-y: scroll;

          li {
            width: 100%;
            height: 100px;
            border-bottom: 1px solid #e0e0e0;
            display: flex;
            align-items: center;

            &:hover .el-icon {
              opacity: 1;
            }

            img {
              height: 65px;
              height: 65px;
            }

            .cart-info {
              height: 65px;
              width: 100px;
              overflow: hidden;
              display: flex;
              flex-direction: column;
              justify-content: center;

              h2 {
                font-size: 13px;
                font-weight: 400;
                color: #515151;
                letter-spacing: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }

            .cart-num {
              margin-right: 5px;
            }

            .el-icon {
              opacity: 0;
              color: #ccc;
              transition: .2s;

              &:hover {
                transform: scale(1.2);
                color: black;
              }
            }
          }
        }

        .shop-bar {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .shop-bar-info {
            .shop-bar-num {
              color: #7b8187;
            }

            .shop-bar-total {
              color: @color;

              .shop-bar-total-price {
                font-size: 24px;
              }
            }
          }

          a {
            height: 45px;
            width: 160px;
            color: white;
            background-color: @color;
            font-size: 16px;
            line-height: 45px;
            text-align: center;
          }
        }
      }
    }



  }


}

.downLoad {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  position: relative;
  width: 1206px;
  height: 100px;
  margin: auto;
  display: flex;
  justify-content: start;
  align-items: center;

  &>.header-log {
    width: 62px;
    height: 56px;

    a {
      display: block;
      width: 56px;
      height: 56px;
      background: url(https://s02.mifile.cn/assets/static/image/logo-mi2.png) no-repeat;
      background-size: contain;
    }
  }

  &>.header-nav {
    flex: 1;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: right;

    &>ul {
      display: flex;
      align-items: center;
      margin-right: 50px;

      &>li {
        white-space: nowrap;
        font-size: 16px;
        font-weight: 400;
        line-height: 100px;

        &>a {
          padding: 0 10px;
          color: #000;
          text-decoration: none;
          display: block;
          height: 100px;
          transition: .2s;
          cursor: pointer;

          &:hover {
            color: rgb(255, 103, 0);
          }
        }

        &[data-index]:hover~ul {
          box-shadow: 0 3px 1px rgba(1, 1, 1, .1);
          border-top: 1px solid #ccc;
          height: 230px;
        }
      }

      &>ul {
        z-index: 999;
        overflow: hidden;
        position: absolute;
        top: 100px;
        left: 0;
        height: 0;
        width: 100%;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: .5s;

        &:hover {
          box-shadow: 0 3px 1px rgba(1, 1, 1, .1);
          border-top: 1px solid #ccc;
          height: 230px;
        }

        li {
          display: none;
        }
      }
    }
  }
}

.card-container {
  display: flex;
  width: 100px;
  align-items: center;
  justify-content: center;

  div.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid #ccc;

    &:last-child {
      border-right: none;
    }

    img {
      width: 160px;
      height: 110px;
      margin-bottom: 0;
    }

    div.title {
      max-width: 160px;
      font-size: 13px;
      color: #333;
      height: 20px;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    span.price {
      color: rgb(255, 103, 0);
      font-size: 13px;
      height: 20px;
      cursor: pointer;
    }
  }
}

.header-search {
  position: relative;
  border: 1px solid #ccc;
  width: 296px;
  height: 50px;
  margin-left: auto;
  transition: .5s;
  display: flex;

  &:focus-within {
    border-color: rgb(255, 103, 0);

    .keywords-search {
      background-color: white;
      z-index: 3;
      display: block;
    }
  }

  .keywords-search {
    position: absolute;
    display: none;
    top: 48px;
    left: -1px;
    width: 244px;
    border: 1px solid rgb(255, 103, 0);

    ul {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      color: rgb(51, 51, 51);
      text-indent: 10px;
      @height: 40px;

      li {
        display: block;
        height: @height;
        width: 100%;
        line-height: @height;
        cursor: pointer;

        &:hover {
          background-color: #fafafa;
        }
      }
    }
  }

  input {
    border: none;
    border-right: 1px solid #ccc;
    width: 245px;
    height: 48px;
    font-size: 14px;
    font-weight: 400;
    padding: 0 10px;
    transition: .5s;

    &:focus {
      border-color: rgb(255, 103, 0);
    }
  }

  .icon-search {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
    cursor: pointer;
    transition: .3s;

    &:hover {
      background-color: rgb(255, 103, 0);
      color: white;
    }
  }

}

// 侧边栏
.nav-category {
  a:hover~.site-category {
    display: block;
  }

  .site-category {
    z-index: 500;
    position: absolute;
    left: 0;
    top: 100px;
    height: 460px;

    &:hover {
      display: block;
    }

    &>ul {
      display: flex;
      flex-direction: column;
      width: 234px;
      height: 100%;
      padding: 20px 0;

      &>li {
        flex: 1;
        line-height: 14px;

        &:hover>.category-store {
          display: block;
        }

        &:hover>a {
          background-color: @color;
          color: white;
        }

        a {
          cursor: pointer;
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          text-indent: 20px;

          .el-icon {
            margin-left: auto;
            margin-right: 20px;
          }
        }

        &>.category-store {
          background-color: white;
          display: none;
          position: absolute;
          top: 0;
          left: 232px;
          height: 460px;

          &>ul {
            writing-mode: vertical-lr;
            display: flex;
            height: 100%;
            flex-wrap: wrap;
            box-shadow: 5px 0 10px 1px #ccc;


            &>li {
              width: 200px;
              writing-mode: horizontal-tb;
              display: flex;
              padding: 18px 20px;
              align-items: center;
              justify-content: center;
              cursor: pointer;

              &:hover span {
                color: @color;
              }

              img {
                width: 40px;
                height: 40px;
              }

              span {
                padding-left: 10px;
                display: block;
                color: #333333;
                width: 150px;
                font-size: 13px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                transition: .3s;
              }
            }
          }
        }
      }
    }


  }
}

// 当在主界面时
.route-main {
  display: block;
  border: 1px solid #ccc;
  background-color: #a5a3a3;
  color: white;
}

// 在其他界面
.route-other {
  display: none;
  background-color: white;
  border: 1px solid @color;
  color: #000;
}
</style>