import { Metadata } from 'next';
import PurchaseHistory from './_component/PurchaseHistory/PurchaseHistory';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: `Медалист`,
  };
}

export default function UserPurchaseHistoryPage({
  params,
}: {
  params: { id: string };
}) {
  return <PurchaseHistory id={params.id} />;
}
