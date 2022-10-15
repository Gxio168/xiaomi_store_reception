<template>
  <div class="home-tool-bar">
    <div class="tool-bar-box">
      <el-popover placement="left-start" :width="80" trigger="hover">
        <template #reference>
          <a>
            <el-icon>
              <Iphone />
            </el-icon>
            <span>手机APP</span>
          </a>
        </template>
        <div class="downLoad">
          <img src="../../public/images/二维码/appDownLoad.png" alt="" style="width: 90px;height:90px">
          <span>扫码领取新人百元红包</span>
        </div>
      </el-popover>

      <a>
        <el-icon>
          <User />
        </el-icon>
        <span>个人中心</span>
      </a>
      <a>
        <el-icon>
          <Service />
        </el-icon>
        <span>售后服务</span>
      </a>
      <a>
        <el-icon>
          <Tools />
        </el-icon>
        <span>人工客服</span>
      </a>
      <a>
        <el-icon>
          <ShoppingCart />
        </el-icon>
        <span>购物车</span>
      </a>
      <a ref="toTop" class="hide" @click="goToTop">
        <el-icon>
          <Top />
        </el-icon>
        <span>回顶部</span>
      </a>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, onBeforeUnmount } from 'vue'
const toTop = ref(null);

// 回到顶端
const goToTop = () => {
  if ((toTop.value as any).className === 'show') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}

const hideOrShow = () => {
  if (window.scrollY > 960) {
    (toTop.value as any).setAttribute('class', 'show')
  } else {
    (toTop.value as any).setAttribute('class', 'hide')
  }
}

// 给页面滚动提供事件
window.addEventListener('scroll', hideOrShow)
// 页面卸载时将事件移除
onBeforeUnmount(() => {
  window.removeEventListener('scroll', hideOrShow)
})

</script>
<style scoped lang='less'>
.home-tool-bar {
  z-index: 999;
  position: fixed;
  right: 0;
  bottom: 70px;

  .tool-bar-box {
    display: flex;
    flex-direction: column;
    align-items: center;

    a {
      background-color: white;
      text-decoration: none;
      display: block;
      width: 82px;
      height: 90px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: rgb(117, 117, 117);
      border-top: 1px solid rgb(245, 245, 245);
      border-left: 1px solid rgb(245, 245, 245);
      transition: .3s;

      &:last-child {
        margin-top: 15px;
        border-bottom: 1px solid rgb(245, 245, 245);
      }

      &:nth-last-child(2) {
        border-bottom: 1px solid rgb(245, 245, 245);
      }

      &:hover {
        color: rgb(255, 103, 0);
      }

      div {
        font-size: 14px;
      }

      .el-icon {
        font-size: 30px;
        margin-bottom: 10px;
      }
    }
  }
}

.downLoad {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hide {
  transform: translateY(-100%);
  z-index: -1;
  opacity: 0;
}

.show {
  cursor: pointer;
  transform: translateY(0);
  opacity: 1;
}
</style>