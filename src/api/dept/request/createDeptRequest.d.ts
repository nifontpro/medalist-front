export interface BaseDeptRequest {
  authId: number
  name: string
  classname?: string
  address?: string
  email?: string
  phone?: string
  description?: string
}

export interface CreateDeptRequest extends BaseDeptRequest {
  parentId: number

  // Добавлять ли тестовых сотрудников, по умолчанию - нет
  addTestUser: boolean
}