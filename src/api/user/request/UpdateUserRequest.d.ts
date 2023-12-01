import { CreateOwnerRequest } from '@/api/user/request/CreateOwnerRequest';
import { RoleUser } from '@/types/user/user';

export interface UpdateUserRequest extends CreateOwnerRequest {
  authId: number;
  userId: number;
  deptId?: number;
  authEmail?: string; // Почта по которой будет входить новый сотрудник
  schedule?: string; // Режим работы
  birthDate?: string;
  jobDate?: string;
  roles: RoleUser[]; // допустимые роли: ADMIN, USER
}
