import { Award } from '@/types/award/Award';
import {BaseImage} from "@/types/base/image/baseImage";

export interface AwardDetails {
  award: Award;
  description?: string;
  criteria?: string;
  createdAt?: number;
  images: BaseImage[];
}
