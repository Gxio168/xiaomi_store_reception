import { defineStore } from "pinia";
import { reqGetAllProduct, reqGetCategory, reqGetDetail, reqFuzzyFind } from "@/api/product";
import type { reqBackInfo, Detail } from '@/api/auth.type'


export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as any,
    category: {} as any,
    total: 0,
    detail: {} as Detail
  }),
  getters: {

  },
  actions: {
    // 获取首页商品
    async getAllProduct() {
      let result = await reqGetAllProduct() as unknown as reqBackInfo
      if (result.statusCode === 200) {
        this.products = result.data
      }
    },

    // 获取商品分类界面商品
    async getCategory(id: number, page: number) {
      let result = await reqGetCategory(id, page) as unknown as reqBackInfo
      if (result.statusCode === 200) {
        this.category = result.data.data
        this.total = result.data.total
      }
    },

    async getDetail(id: number) {
      let result = await reqGetDetail(id) as unknown as reqBackInfo
      if (result.statusCode === 200) {
        this.detail = result.data
      }
    },

    // 模糊查询
    async fuzzyFind(key: string, page: number) {
      let result = await reqFuzzyFind(key, page) as unknown as reqBackInfo
      if (result.statusCode === 200) {
        this.category = result.data
        this.total = result.data.total
      }
    }
  }
})