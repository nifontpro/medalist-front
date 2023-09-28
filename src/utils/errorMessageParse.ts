import { ResponseError } from '@/types/base/BaseResponse';
import { toast } from 'react-toastify';

export const errorMessageParse = (errors: ResponseError[] | undefined) => {
  if (errors != undefined) {
    errors.forEach((error) => {
      toast.error(error.message);
    });
  }
};
