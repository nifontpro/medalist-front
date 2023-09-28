'use client';

import LogoIcon from '@/icons/logo.svg';
import Link from 'next/link';

const ErrorWrapperDepartment = ({ error }: { error: Error }) => {
  return (
    <div className='h-screen bg-gray-200 flex flex-col justify-center items-center'>
      <Link href='/'>
        <LogoIcon className='w-[200px]' />
      </Link>
      <div className='bg-white px-9 py-14 shadow rounded mt-10'>
        <h3 className='text-3xl font-bold'>Well, this is embarrassing </h3>
        <p className='text-reg font-bold'>{error.message}</p>
        <p className='mt-6 text-sm font-light'>Error Code: 400</p>
      </div>
    </div>
  );
};

export default ErrorWrapperDepartment;
