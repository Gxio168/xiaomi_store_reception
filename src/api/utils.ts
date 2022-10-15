import request from './index'

export function reqValidateCode(code: string) {
  return request({
    url: '/validateCode',
    method: 'post',
    data: {
      code
    }
  })
}

export function reqGetCarousel() {
  return request({
    url: '/getCarousel',
    method: 'get'
  })
}
