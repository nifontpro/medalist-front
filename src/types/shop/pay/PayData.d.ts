import {User} from "@/types/user/user";
import {Product} from "@/types/shop/product/Product";

export interface PayData {
  id: number
  dateOp: number
  user: User
  product: Product
  price: number
  payCode: PayCode
  isActive: boolean
}

export type PayCode = 'PAY' | 'GIVEN' | 'RETURN' | 'UNDEF';