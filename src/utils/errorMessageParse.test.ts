import { Levels, ResponseError } from '@/types/base/BaseResponse';
import { errorMessageParse } from './errorMessageParse';
import { toast } from 'react-toastify';

const Levels: Levels = 'ERROR';
const errors: ResponseError[] = [
  {
    code: 'code',
    group: 'group',
    field: 'field',
    message: 'Error 1',
    level: Levels,
  },
  {
    code: 'code',
    group: 'group',
    field: 'field',
    message: 'Error 2',
    level: Levels,
  },
  {
    code: 'code',
    group: 'group',
    field: 'field',
    message: 'Error 3',
    level: Levels,
  },
];

describe('errorMessageParse', () => {
  test('не должно выдавать ошибку, когда массив errors = undefined', () => {
    expect(() => {
      errorMessageParse(undefined);
    }).not.toThrow();
  });

  test('Вызовет toast.error для каждой ошибки в array', () => {
    const toastErrorSpy = jest.spyOn(toast, 'error');

    errorMessageParse(errors);

    expect(toastErrorSpy).toHaveBeenCalledTimes(errors.length);
    expect(toastErrorSpy).toHaveBeenCalledWith('Error 1');
    expect(toastErrorSpy).toHaveBeenCalledWith('Error 2');
    expect(toastErrorSpy).toHaveBeenCalledWith('Error 3');

    toastErrorSpy.mockRestore();
  });
});
