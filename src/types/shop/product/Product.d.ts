export interface Product {
  id: number
  deptId: number
  name: string
  description?: string
  price: number
  count: number
  mainImg?: string
  normImg?: string
}