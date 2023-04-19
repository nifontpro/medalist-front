export interface CreateDeptRequest {
  authId: number;
  parentId: number;
  name: string;
  classname?: string;
  address?: string;
  email?: string;
  phone?: string;
  description?: string;

  // Добавлять ли тестовых сотрудников, по умолчанию - нет
  addTestUser: boolean;
}
