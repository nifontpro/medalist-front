import React from 'react';
import Main from './_components/Main/Main';
// import { redirect } from 'next/navigation';
// import { useAppSelector } from '@/store/hooks/hooks';
// import { RootState } from '@/store/storage/store';

export default function Home() {
  // const { typeOfUser } = useAppSelector(
  //   (state: RootState) => state.userSelection
  // );

  // redirect(`department/${typeOfUser?.dept.id}`);

  return (
    <main>
      <Main />
    </main>
  );
}
