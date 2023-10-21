// Добавь импорты
interface AddUserReport {
  userDetails: UserDetails
  success: boolean
  isUpdate: boolean
  errors: ResponseError[]
}