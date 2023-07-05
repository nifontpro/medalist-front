import { Dept } from '@/types/dept/dept';
import { BaseImage } from '@/types/base/image/baseImage';

export interface Award {
  id: number;
  name: string;
  mainImg?: string;
  type: AwardType;
  startDate: number;
  endDate: number;
  state: AwardState;
  dept: Dept;
  images: BaseImage[];
}

export type AwardType = 'PERIOD' | 'SIMPLE' | 'UNDEF';
export type AwardState = 'FUTURE' | 'NOMINEE' | 'FINISH' | 'ERROR';
