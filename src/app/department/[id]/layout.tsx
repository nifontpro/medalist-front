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
    <section>
      <HeaderLayout id={params.id} />
      <div>{children}</div>
    </section>
  );
}
