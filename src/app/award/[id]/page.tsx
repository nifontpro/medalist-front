'use client';

import Spinner from '@/ui/Spinner/Spinner';
import NoAccess from '@/ui/NoAccess/NoAccess';
import { useAwardAdmin } from '../../../api/award/useAwardAdmin';
import SingleAward from './_components/SingleAward/SingleAward';

export default function SingleAwardPage({
  params,
}: {
  params: { id: string };
}) {
  const {
    singleActivAward,
    singleAward,
    isLoadingSingleActivAward,
    isLoadingSingleAward,
  } = useAwardAdmin(params.id);

  if (isLoadingSingleActivAward || isLoadingSingleAward) return <Spinner />;
  if (!singleActivAward?.success || !singleAward?.success) return <NoAccess />;

  if (
    singleActivAward &&
    singleAward &&
    singleActivAward.data &&
    singleAward.data
  ) {
    return (
      <main>
        <SingleAward
          awardActiv={singleActivAward.data}
          award={singleAward.data}
          id={params.id}
        />
      </main>
    );
  } else {
    return null;
  }
}
