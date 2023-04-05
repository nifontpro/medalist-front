// export const API_SERVER_URL = `${process.env.APP_SERVER_URL}:8080/api`
// export const SOCKET_URL = `ws://${process.env.APP_SERVER_URL}:8080/chat`
export const API_SERVER_URL = `https://nmedalist.ru/api`
// export const SOCKET_URL = `ws://http://nmedalist.ru:8080/api/chat`
export const REFRESH_TOKEN_LIFE = 30 // Время жизни локальной куки в днях для RT.

// export const getAuthUrl = (string: string) => `/auth${string}`
// export const getRegisterUrl = (string: string) => `/register${string}`
// export const getCompanyUrl = (string: string = '') => `/company${string}`
// export const getCompanyEditUrl = (string: string = '') => `/company/edit${string}`
// export const getCompanyCreateUrl = () => `/company/create`
// export const getDepartmentUrl = (string: string = '') => `/department${string}`
export const getDepartmentUrlWithUsers = (string: string = '') => `/department/${string}/users`
// export const getDepartmentCreateUrl = (string: string = '') => `/department/create${string}`
export const getDepartmentEditUrl = (string: string = '') => `/department/${string}/edit`
export const getUserUrl = (string: string = '') => `/user${string}`
// export const getUserCreateUrl = (string: string = '') => `/user/create${string}`
// export const getUserEditUrl = (string: string = '') => `/user/edit${string}`
// export const getUserEditPasswordUrl = (string: string = '') => `/user/edit_password${string}`
// export const getAwardUrl = (string: string = '') => `/award${string}`
// export const getAwardCreateUrl = (string: string = '') => `/award/create${string}`
// export const getAwardEditUrl = (string: string = '') => `/award/edit${string}`
// export const getMessageUrl = (string: string = '') => `/message${string}`
// export const getActivityUrl = (string: string = '') => `/activity${string}`
// export const getGalleryUrl = (string: string = '') => `/gallery${string}`