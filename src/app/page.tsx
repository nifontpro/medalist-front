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
  const selectedCompany = localStorage.getItem('selectCompany');
  console.log('treeDepts', treeDepts);
  console.log('selectedCompany', selectedCompany);
  console.log('typeOfUser', typeOfUser);

  // useEffect(() => {
  //   if (selectedCompany) redirect(`department/${selectedCompany}`);
  // }, [treeDepts, selectedCompany]);

  useEffect(() => {
    if (selectedCompany) redirect(`department/${selectedCompany}`);
    if (
      typeOfUser?.roles.find((r) => r == 'OWNER') &&
      treeDepts &&
      treeDepts.length > 1 &&
      treeDepts[1].id
    ) {
      localStorage.setItem('selectCompany', treeDepts[1].id.toString());
      console.log('первый редирект', treeDepts[1].id);
      // redirect(`department/${treeDepts[1].id}`);
    }
    if (
      typeOfUser?.roles.find((r) => r == 'OWNER') &&
      treeDepts &&
      treeDepts.length == 1
    ) {
      console.log('второй редирект');
      // redirect(`department/${treeDepts[0].id}`);
    }
    if (!typeOfUser?.roles.find((r) => r == 'OWNER')) {
      console.log('третий редирект');
      // redirect(`department/${typeOfUser?.dept.id}`);
    }
  }, [treeDepts, typeOfUser]);

  return <main></main>;
}
