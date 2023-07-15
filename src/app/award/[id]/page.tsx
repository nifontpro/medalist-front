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
  const { singleAward, isLoadingSingleAward } = useAwardAdmin(params.id);

  if (isLoadingSingleAward) return <Spinner />;
  if (!singleAward?.success) return <NoAccess />;

  if (singleAward && singleAward.data) {
    return (
      <main>
        <SingleAward award={singleAward.data} id={params.id} />
      </main>
    );
  } else {
    return null;
  }
}
