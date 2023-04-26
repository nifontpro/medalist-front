import UserEdit from './_components/UserEdit/UserEdit';

export default function UserEditPage({ params }: { params: { id: string } }) {
  return <UserEdit id={params.id} />;
}
