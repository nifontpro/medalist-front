export interface Product {
  id: number
  deptId: number
  name: string
  shortDescription?: string
  price: number
  count: number
  mainImg?: string
  normImg?: string
}