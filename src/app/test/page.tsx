// export const dynamic = 'force-dynamic' // SSR
'use client'

export default async function UsersPage() {

  return <div>
    <div className="text-red-700">KEYCLOAK_URL: {process.env.KEYCLOAK_URL}</div>
    <div className="text-green-700">APP_URL: {process.env.APP_URL}</div>
    <div className="text-blue-700">API_SERVER_URL: {process.env.API_SERVER_URL}</div>
  </div>
}