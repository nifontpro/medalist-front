import { Dept } from '@/app/domain/model/dept/dept';
import { BaseImage } from '@/domain/model/base/image/baseImage';
import { Award } from '@/domain/model/award/Award';

export interface User {
  id?: number;
  dept?: Dept;
  firstname: string;
  lastname?: string;
  patronymic?: string;
  authEmail: string;
  gender: Gender;
  post?: string;
  roles: RoleUser[];
  images: BaseImage[];
  awards?: Award[];
}

export type Gender = 'MALE' | 'FEMALE' | 'UNDEF';

export type RoleUser = 'USER' | 'ADMIN' | 'OWNER';
