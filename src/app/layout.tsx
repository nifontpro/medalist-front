import '@/styles/globals.scss';
import MainLayout from './_components/MainLayout/MainLayout';
import { Providers } from '@/redux/provider';

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
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
