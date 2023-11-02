export interface CreateProductRequest {
  authId: number

  /**
   * Необходимо заполнить для Владельца, для определения конкретной компании.
   * Может быть указан любой отдел компании, бэк сам определит id компании.
   * Для всех остальных пользователей поле игнорируется (определяется автоматически).
   */
  deptId: number

  name: string
  price: number
  count: number
  description?: string
  siteUrl?: string
  place?: string
}