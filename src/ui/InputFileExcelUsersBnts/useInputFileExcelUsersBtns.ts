import { userApi } from '@/api/user/user.api';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { toast } from 'react-toastify';
import { BaseResponse } from '@/types/base/BaseResponse';
import { LoadReport } from '@/types/user/addUserReport';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { DeptDetails } from '@/types/dept/deptDetails';

export const useInputFileExcelUsersBtns = (department: DeptDetails) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );
  const [visibleModal, setVisibleModal] = useState<boolean>(false);

  const [data, setData] = useState<BaseResponse<LoadReport>>();

  const [addUsersFromExcel] = userApi.useAddUsersFromExcelMutation();

  const handleChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && typeOfUser && typeOfUser.id) {
      if (e.currentTarget.files[0]) {
        const file = new FormData();
        file.append('file', e.currentTarget.files[0]);
        file.append('authId', typeOfUser?.id.toString());
        file.append('deptId', department.dept.id.toString());
        await addUsersFromExcel(file)
          .unwrap()
          .then((res) => {
            // if (res.success == false) {
            //   errorMessageParse(res.errors);
            //   setData(res);
            //   isError = true;
            // } else {
            setVisibleModal(true);
            setData(res);
            // }
          });
        //   .catch(() => {
        //     isError = true;
        //     toast.error('Ошибка загрузки пользователей');
        //   });
      }
    }
  }, []);

  //Ниже код для очистки input
  const inputFileRef = useRef<HTMLInputElement>(null);
  const handleClearInput = () => {
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  };

  const handleCloseModal = () => {
    setVisibleModal(false);
    setData(undefined);
    handleClearInput();
  };
  //__________

  return {
    inputFileRef,
    handleChange,
    visibleModal,
    setVisibleModal,
    handleCloseModal,
    data,
  };
};
