import request from './index'

// 获取首页商品列表
export function reqGetAllProduct() {
  return request({
    url: '/category',
    method: 'get'
  })
}

// 获取对应种类的商品
export function reqGetCategory(id: number, page: number) {
  return request({
    url: `/category/${id}/${page}`,
    method: 'get',
  })
}

// 获取商品细节
export function reqGetDetail(id: number) {
  return request({
    url: `/category/detail?id=${id}`,
    method: 'get'
  })
}

// 模糊查询商品
export function reqFuzzyFind(key: string, page: number) {
  return request({
    url: `/category/${page}`,
    method: 'post',
    data: {
      key
    }
  })
}