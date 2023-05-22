import { RoleUser, User } from '@/domain/model/user/user'

export const checkRole = (typeOfUser: User | undefined, minRole: RoleUser) => {
    let access: boolean = false
    typeOfUser?.roles.forEach((role) => {
      if (role == minRole) {
        access = true
      }
    })
    return access
  }