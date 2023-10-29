export interface UpdateProductRequest extends Omit<CreateProductRequest, 'deptId'>{
  productId: number
}