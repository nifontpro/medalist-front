import { Dept } from '@/domain/model/dept/dept';
import { BaseImage } from '@/domain/model/base/image/baseImage';

export interface Award {
  id: number;
  name: string;
  type: AwardType;
  startDate: number;
  endDate: number;
  dept: Dept;
  images: BaseImage[];
}

export type AwardType = 'NOMINEE' | 'SIMPLE' | 'UNDEF';
