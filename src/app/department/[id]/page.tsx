'use client';
import { toast } from 'react-toastify';

export const SingleDepartment = ({ params }: { params: { id: string } }) => {

  return <div onClick={() => toast('Toast is good', { hideProgressBar: true, autoClose: 2000, type: 'success' })}>Department {params.id}</div>;
};

export default SingleDepartment;
