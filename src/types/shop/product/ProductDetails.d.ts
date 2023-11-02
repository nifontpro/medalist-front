import { BaseImage } from '@/types/base/image/baseImage';

interface ProductDetails {
  product: Product
  siteUrl?: string
  place?: string
  createdAt: number
  images: BaseImage[]
}