import request from "./index";
import type { userInfo } from "./auth.type";


// 登录
export const reqLogin = (userInfo: userInfo) => {
  return request({
    url: '/auth/login',
    method: 'post',
    data: userInfo
  })
}

// 注册
export const reqRegister = (userInfo: userInfo) => {
  return request({
    url: '/auth/register',
    method: 'post',
    data: userInfo
  })
}

// 获取用户信息
export const reqGetUserInfo = () => {
  return request({
    url: '/auth/getAuth',
    method: 'get'
  })
}

// 获取购物车
export const reqGetShopCart = () => {
  return request({
    url: '/auth/getShopCart',
    method: 'get'
  })
}

// 修改购物车
export const reqChangeShopNum = (id: number, num: number) => {
  return request({
    url: '/auth/changeShopNum',
    method: 'post',
    data: {
      id,
      num
    }
  })
}

// 添加商品到购物车
export const reqAddToShopCart = (id: number) => {
  return request({
    url: '/auth/addToShopCart',
    method: 'post',
    data: {
      id
    }
  })
}

// 从购物车中移除商品
export const reqRemoveFromShopCart = (id: number) => {
  return request({
    url: '/auth/removeFromShopCart',
    method: 'post',
    data: {
      id
    }
  })
}

// 添加订单
export const reqAddToOrder = (data: any) => {
  return request({
    url: '/auth/addToOrder',
    method: 'post',
    data: {
      checkedShop: data
    }
  })
}

// 获取订单
export const reqGetOrder = () => {
  return request({
    url: '/auth/getOrder',
    method: 'get'
  })
}

// 获取收藏内容
export const reqGetCollect = () => {
  return request({
    url: '/auth/getCollect',
    method: 'get'
  })
}

// 加入我的收藏
export const reqAddToCollect = (id: number) => {
  return request({
    url: '/auth/addToCollect',
    method: 'post',
    data: {
      id
    }
  })
}

// 从我的收藏移除
export const reqRemoveFromCollect = (id:number) => {
  return request({
    url: '/auth/removeFromCollect',
    method: 'post',
    data: {
      id
    }
  })
}

export const reqCheckCollect = (id: number) => {
  return request({
    url: '/auth/checkCollect',
    method: 'post',
    data: {
      id
    }
  })
}