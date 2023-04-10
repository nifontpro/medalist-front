import '@/styles/globals.scss';
import MainLayout from './_components/MainLayout/MainLayout';
import { Providers } from '@/redux/Providers';
// import AuthProvider from './_auth/provider/AuthProvider'; 

export const metadata = {
  title: 'Medalist',
  description: 'Motivation App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-black'>
        <Providers>
          {/* <AuthProvider> */}
          <MainLayout>{children}</MainLayout>
          {/* </AuthProvider> */}
        </Providers>
      </body>
    </html>
  );
}
