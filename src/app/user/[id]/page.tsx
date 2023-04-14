export const SingleUser = ({ params }: { params: { id: string } }) => {
  return <div>Пользватель {params.id}</div>;
};

export default SingleUser;
