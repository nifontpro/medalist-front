import { BaseImage } from '@/types/base/image/baseImage';

interface ProductDetails {
  product: Product
  description?: string
  siteUrl?: string
  createdAt: number
  images: BaseImage[]
}