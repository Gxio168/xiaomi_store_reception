export type userInfo = {
  username: string,
  password: string
}

export type reqBackInfo = {
  statusCode: number,
  message: string,
  error?: string,
  data: any
}

export type Product = {
  product: [
    id: number,
    name: string,
    selling_price: number,
    product_picture: [
      pic_url: string,
      product_id?: number,
      id?: number
    ],
    title?: string,
    price?: number,
  ],
  is_checked?: number,
  num?: number
  id?: number,
  name?: string,
  total?: number
}

export type Detail = {
  id: number,
  name: string,
  title: string,
  introduce: string,
  price: number,
  selling_price: number,
  sales: number,
  category_id: number,
  product_picture: [
    {
      id: number,
      product_id: number,
      pic_url: string
    }
  ]
}
