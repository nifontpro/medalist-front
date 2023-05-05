import { Dept } from '@/domain/model/dept/dept';
import { BaseImage } from '@/domain/model/base/image/baseImage';

export interface Award {
  id: number;
  name: string;
  type: AwardType;
  startDate: number;
  endDate: number;
  state: AwardState;
  dept: Dept;
  images: BaseImage[];
}

export type AwardType = 'PERIOD' | 'SIMPLE' | 'UNDEF';
export type AwardState = 'FUTURE' | 'NOMINEE' | 'FINISH' | 'ERROR';
