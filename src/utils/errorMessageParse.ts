import { ResponseError } from '@/domain/model/base/baseResponse';
import { toast } from 'react-toastify';

export const errorMessageParse = (errors: ResponseError[]) => {
  errors.forEach((error) => {
    toast.error(error.message);
  });
};
