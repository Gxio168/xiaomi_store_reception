import { defineStore } from 'pinia'
import { reqLogin, reqGetUserInfo, reqRegister, reqGetShopCart, reqChangeShopNum, reqAddToShopCart, reqRemoveFromShopCart, reqAddToOrder, reqGetOrder, reqAddToCollect, reqGetCollect, reqRemoveFromCollect, reqCheckCollect } from '@/api/auth'
import type { userInfo, reqBackInfo, Product } from '@/api/auth.type'
import { ElMessage } from 'element-plus'
import { getToken, setToken, removeToken } from '@/utils/auth'

export const useAuthStore = defineStore('user', {
  state: () => ({
    userInfo: {},
    token: getToken() || '',
    shopCart: [] as Array<Product>,
    checkedShop: [] as Array<Product>,
    orders: [] as any,
    collects: [] as any
  }),
  getters: {},
  actions: {
    // 登录
    async login(userInfo: userInfo) {
      const result = await reqLogin(userInfo) as unknown as reqBackInfo
      if (result.statusCode === 200) {
        this.token = result.data.token
        setToken(this.token)
      }
      return result
    },

    // 注册
    async register(userInfo: userInfo) {
      const result = await reqRegister(userInfo) as unknown as reqBackInfo
      if (result.statusCode === 200) {
        this.token = result.data.token
        setToken(this.token)
      }
      return result
    },

    // 获取用户信息
    async getUserInfo() {
      const result = await reqGetUserInfo() as unknown as reqBackInfo;
      if (result && result.statusCode === 200) {
        this.userInfo = result.data.username
      }
    },

    // 退出登录
    logout() {
      this.token = ''
      this.userInfo = {}
      this.shopCart = []
      removeToken()
      ElMessage.success('退出登录成功')
    },

    // 获取购物车
    async getShopCart() {
      const result = await reqGetShopCart() as unknown as reqBackInfo;
      if (result.statusCode === 200) {
        this.shopCart = result.data
      }
    },

    // 修改购物车
    async changeShopNum(id: number, num: number) {
      const result = await reqChangeShopNum(id, num) as unknown as reqBackInfo
      if (result.statusCode === 200) {
        ElMessage.success({
          message: result.data.message
        })
      }
    },
    // 添加商品到购物车
    async addToShopCart(id: number) {
      const result = await reqAddToShopCart(id) as unknown as reqBackInfo
      if (result.statusCode === 200) {
        ElMessage.success({
          message: result.data.message
        })
      }
    },

    // 删除购物车中的商品
    async removeFromShopCart(id: number) {
      const result = await reqRemoveFromShopCart(id) as unknown as reqBackInfo
      if (result.statusCode === 200) {
        ElMessage.success({
          message: result.data.message
        })
      }
    },

    // 向订单中添加数据
    async addToOrder(data: any) {
      await reqAddToOrder(data);
    },

    // 获取当前已经被勾选的商品
    getCheckedShop(data: Array<Product>) {
      this.checkedShop = data
    },

    // 获取订单信息
    async getOrder() {
      let result = await reqGetOrder() as unknown as reqBackInfo
      if (result.statusCode === 200) {
        this.orders = result.data
      }
    },

    async getCollect() {
      let result = await reqGetCollect() as unknown as reqBackInfo
      if (result.statusCode === 200) {
        this.collects = result.data
      }
    },
    // 添加进我的收藏
    async addToCollect(id: number) {
      let result = await reqAddToCollect(id) as unknown as reqBackInfo
      if (result.statusCode === 200) {
        ElMessage.success({
          message: '添加成功'
        })
      }
    },
    // 移除出我的收藏
    async removeFromCollect(id: number) {
      await reqRemoveFromCollect(id)
    },
    // 检查商品是否在收藏中
    async checkCollect(id: number) {
      let result = await reqCheckCollect(id) as unknown as reqBackInfo
      if (result.statusCode === 200) {
        return result.data.is_delete
      }
    }

  }
})