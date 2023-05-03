'use client';

import { useAppSelector } from '@/store/hooks/hooks';
import ThemeSwitcher from '@/ui/ThemeSwitcher/ThemeSwitcher';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { typeOfUser } = useAppSelector((state) => state.userSelection);
  console.log(typeOfUser)

  return (
    <main className='flex flex-col m-2 break-all'>
      Главная страница для пользователя с id {typeOfUser?.id}
      <ThemeSwitcher />
    </main>
  );
}
