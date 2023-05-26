'use client';

import { useAppSelector } from '@/store/hooks/hooks';
import { Inter } from 'next/font/google';
import Main from './_components/Main/Main';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { typeOfUser } = useAppSelector((state) => state.userSelection);

  return (
    <main>
      <Main />
      Главная страница для пользователя с id {typeOfUser?.id}
    </main>
  );
}
