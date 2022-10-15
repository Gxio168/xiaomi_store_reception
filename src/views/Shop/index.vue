<template>
  <div class="box">
    <!-- 轮播图+展示框部分 -->
    <div class="box-main">
      <!-- 轮播图 -->
      <div class="home-swiper">
        <div class="empty"></div>
        <div class="swiper">
          <el-carousel :interval="5000" arrow="always" height="460px" v-if="swiperUrls">
            <el-carousel-item v-for="item in swiperUrls" :key="item.id">
              <img :src='"/api" + item.imgUrl'>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <!-- 展示框 -->
      <div class="home-hero-sub">
        <div class="span4">
          <ul>
            <li>
              <el-icon>
                <Clock />
              </el-icon>
              <span>保障服务</span>
            </li>
            <li>
              <el-icon>
                <OfficeBuilding />
              </el-icon>
              <span>企业团购</span>
            </li>
            <li>
              <el-icon>
                <CirclePlus />
              </el-icon>
              <span>F码通道</span>
            </li>
            <li>
              <el-icon>
                <DocumentAdd />
              </el-icon>
              <span>米粉卡</span>
            </li>
            <li>
              <el-icon>
                <Refresh />
              </el-icon>
              <span>以旧换新</span>
            </li>
            <li>
              <el-icon>
                <WalletFilled />
              </el-icon>
              <span>话费充值</span>
            </li>
          </ul>
        </div>
        <div class="span16">
          <ul>
            <li><img src="../../../public/images/轮播图/轮播图1.webp"></li>
            <li><img src="../../../public/images/轮播图/轮播图2.webp"></li>
            <li><img src="../../../public/images/轮播图/轮播图3.webp"></li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 主体部分 -->
    <ContentShop></ContentShop>
  </div>
</template>

<script setup lang='ts'>
import ContentShop from '@/views/Shop/ContentShop.vue'
import { onBeforeMount, ref } from 'vue';
import { reqGetCarousel } from '@/api/utils'
import type { reqBackInfo } from '@/api/auth.type'

let swiperUrls: any = ref(null)

const getCarousel = async () => {
  let result = await reqGetCarousel() as unknown as reqBackInfo
  if (result.statusCode === 200) {
    swiperUrls.value = result.data.carouselImgs;
  }
}

onBeforeMount(() => {
  getCarousel()
})
</script>

<style scoped lang='less'>
.box {
  min-width: 1200px;

  .box-main {
    min-width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;


    .home-swiper {
      overflow: hidden;
      width: 1206px;
      display: flex;
      height: 460px;

      .empty {
        width: 228px;
        height: 100%;
      }

      .swiper {
        flex: 1;
        height: 100%;

        img {
          height: 100%;
          width: 100%;
        }
      }
    }

    .home-hero-sub {
      display: flex;
      width: 1206px;
      height: 170px;
      margin: 20px 0;

      .span4 {
        flex: 4;

        ul {
          padding: 0 5px 5px 0;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          row-gap: 5px;
          background-color: #5f5750;
          background-clip: content-box;

          li {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 76px;
            height: 82px;
            color: #cfccca;
            font-size: 14px;
            cursor: pointer;
            transition: .3s;

            &:hover {
              color: white;
            }

            :deep(.el-icon) {
              margin-bottom: 5px;
              font-size: 25px;
            }
          }
        }
      }

      .span16 {
        flex: 16;

        ul {
          display: flex;
          justify-content: space-between;

          li {
            width: 316px;
            height: 170px;
            transition: .3s;

            &:hover {
              box-shadow: 0 6px 11px -5px #ccc
            }

            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

:deep(.el-carousel__button) {
  width: 10px;
  height: 10px;
  border-radius: 10px;
}
</style>