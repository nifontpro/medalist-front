import Awards from './_components/Awards/Awards';

export const DepartmentMedals = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      Medals department {params.id}
      {/* <Awards /> */}
    </div>
  );
};

export default DepartmentMedals;
