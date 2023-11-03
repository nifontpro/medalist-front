export interface UpdateProductRequest {
  authId: number;

  name: string;
  price: number;
  count: number;
  description?: string;
  siteUrl?: string;
  place?: string;
  productId: number;
}
