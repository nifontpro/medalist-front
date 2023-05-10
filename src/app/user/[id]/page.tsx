'use client';

import { useUserAdmin } from '../useUserAdmin';
import Spinner from '@/ui/Spinner/Spinner';
import NoAccess from '@/ui/NoAccess/NoAccess';
import { useAwardAdmin } from '@/app/award/useAwardAdmin';
import SingleUser from './_components/SingleUser/SingleUser';

export default function SingleUserPage({ params }: { params: { id: string } }): JSX.Element {
  const { singleUser, isLoadingSingleUser } = useUserAdmin(params.id);
  const { singleActivAwardUser } = useAwardAdmin(params.id);

  if (isLoadingSingleUser) return <Spinner />;
  if (!singleUser?.success) return <NoAccess />;

  return (
    <main>
      <SingleUser user={singleUser.data} userActiv={singleActivAwardUser?.data}/>
    </main>
  );
}
