import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return <div className='flex flex-col m-2 break-all'>Главная страница</div>;
}
