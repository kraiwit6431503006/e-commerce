export interface CartItem {
  id: string
  name: string
  image: string
  price: number
  quantity: number
}

export interface CartState {
  items: CartItem[]
}
