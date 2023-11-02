export interface CreateProductRequest {
  authId: number
  deptId: number
  name: string
  price: number
  description?: string
  siteUrl?: string
}