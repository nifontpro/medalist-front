import HeaderLayout from './_components/HeaderLayout/HeaderLayout';

export const metadata = {
  // title: 'Medalist Department',
  description: 'Review department',
};

export default function DepartmentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <section className='h-full'>
      <HeaderLayout id={params.id} />
      <div className='h-full'>{children}</div>
    </section>
  );
}
