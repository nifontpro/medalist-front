import HeaderLayout from './_components/HeaderLayout/HeaderLayout';

export const metadata = {
  title: 'Medalist Department',
  description: 'Review department',
};

export default function DepartmentLayout(
  { children }: { children: React.ReactNode },
) {
  return (
    <section>
      <HeaderLayout />
      <div>{children}</div>
    </section>
  );
}
