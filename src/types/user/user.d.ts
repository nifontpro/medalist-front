import { Dept } from '@/app/domain/model/dept/dept';
import { BaseImage } from '@/types/base/image/baseImage';
import { Award } from '@/types/award/Award';
import { Activity } from '@/types/award/Activity';

export interface User {
  id?: number;
  dept?: Dept;
  firstname: string;
  lastname?: string;
  patronymic?: string;
  authEmail: string;
  gender: Gender;
  post?: string;
  mainImg?: string;
  awardCount: number;
  roles: RoleUser[];
  images: BaseImage[];
  awards?: Award[];
  activities?: Activity[];
}

export type Gender = 'MALE' | 'FEMALE' | 'UNDEF';

export type RoleUser = 'USER' | 'ADMIN' | 'OWNER';
