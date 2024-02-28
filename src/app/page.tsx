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

  // Удаляю специально чтобы не было ошибки. Когда долго не пользуешься - выходит в окно авторизации а в локалсторэдж сохранена предыдущая компания. Если вдруг защел уже другим пользователем - может быть ошибка
  localStorage.removeItem('selectCompany');

  const selectedCompany = localStorage.getItem('selectCompany');

  useEffect(() => {
    if (selectedCompany) redirect(`department/${selectedCompany}`);
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
    if (!typeOfUser?.roles.find((r) => r == 'OWNER')) {
      // redirect(`department/${typeOfUser?.dept.id}`);
    }
  }, [treeDepts, typeOfUser]);

  return <main></main>;
}
