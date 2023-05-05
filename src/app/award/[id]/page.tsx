'use client';

import Spinner from '@/ui/Spinner/Spinner';
import NoAccess from '@/ui/NoAccess/NoAccess';
import { useAwardAdmin } from '../useAwardAdmin';
import SingleAward from './_components/SingleAward/SingleAward';

export default function SingleAwardPage({
  params,
}: {
  params: { id: string };
}) {
  const { singleActivAward, singleAward, isLoadingSingleActivAward, isLoadingSingleAward } =
    useAwardAdmin(params.id);
  if (isLoadingSingleActivAward || isLoadingSingleAward) return <Spinner />;
  if (!singleActivAward?.success || !singleAward?.success) return <NoAccess />;

  console.log(singleAward)

  return (
    <>
      <SingleAward awardActiv={singleActivAward.data} award={singleAward.data}/>
    </>
  );
}
