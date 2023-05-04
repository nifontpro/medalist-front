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
  const { singleAward, isLoadingSingleAward } = useAwardAdmin(params.id);
  if (isLoadingSingleAward) return <Spinner />;
  if (!singleAward?.success) return <NoAccess />;

  return (
    <>
      <SingleAward award={singleAward.data} />
    </>
  );
}
