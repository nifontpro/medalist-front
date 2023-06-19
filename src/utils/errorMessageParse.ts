import { ResponseError } from '@/domain/model/base/BaseResponse';
import { toast } from 'react-toastify';

export const errorMessageParse = (errors: ResponseError[] | undefined) => {
  if (errors != undefined) {
    errors.forEach((error) => {
      toast.error(error.message);
    });
  }
};
