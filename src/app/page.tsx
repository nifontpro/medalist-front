'use client';

import React, { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { SelectTreeDepts } from '@/store/features/treeDepts/treeDepts-selectors';

export default function Home() {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const treeDepts = useAppSelector(SelectTreeDepts);
  localStorage.removeItem('selectCompany');

  useEffect(() => {
    if (
      typeOfUser?.roles.find((r) => r == 'OWNER') &&
      treeDepts &&
      treeDepts.length > 1 &&
      treeDepts[1].id
    ) {
      localStorage.setItem('selectCompany', treeDepts[1].id.toString());
      redirect(`department/${treeDepts[1].id}`);
    }
    if (
      typeOfUser?.roles.find((r) => r == 'OWNER') &&
      treeDepts &&
      treeDepts.length == 1
    ) {
      redirect(`department/${treeDepts[0].id}`);
    }
    if (!typeOfUser?.roles.find((r) => r == 'OWNER' && typeOfUser)) {
      redirect(`department/${typeOfUser?.dept.id}`);
    }
  }, [typeOfUser, treeDepts]);

  return <main>{/* <Main /> */}</main>;
}
