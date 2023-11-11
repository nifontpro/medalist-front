import { Dept } from '@/types/dept/dept';
import { BaseImage } from '@/types/base/image/baseImage';
import { User } from '@/types/user/user';

export interface Award {
  id: number;
  name: string;
  description?: string;
  mainImg?: string;
  normImg?: string;
  type: AwardType;
  startDate: number;
  endDate: number;
  score: number;
  state: AwardState;
  dept: Dept;

  users: User[];
}

export type AwardType = 'PERIOD' | 'SIMPLE' | 'UNDEF';
export type AwardState = 'FUTURE' | 'NOMINEE' | 'FINISH' | 'ERROR';
