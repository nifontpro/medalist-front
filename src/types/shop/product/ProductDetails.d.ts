import { BaseImage } from '@/types/base/image/baseImage';

interface ProductDetails {
  product: Product
  description?: string
  siteUrl?: string
  place?: string
  createdAt: number
  images: BaseImage[]
  secondImages: BaseImage[]
}