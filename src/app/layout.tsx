import MainProvider from '@/store/providers/MainProvider';
import '@/styles/globals.scss';
import { getCookie } from 'cookies-next';
import React from 'react';

// const getRoles = async () => {
//   const fetchRoles = await fetch(
//     `${process.env.API_SERVER_URL}/client/user/profiles`,
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${getCookie('access_token')}`,
//       },
//     }
//   );
//   const roles = await fetchRoles;
//   console.log(roles.json());
//   return roles;
// };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ru'>
      <body className='bg-black'>
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
