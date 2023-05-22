import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import { DataSheets } from '../inputExls.types';
import { DeptDetails } from '@/domain/model/dept/deptDetails';
import { userApi } from '@/api/user/user.api';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';

export const useModalWindowExcelAddUsers = (
  setVisibleModal: Dispatch<SetStateAction<boolean>>,
  data: DataSheets[] | undefined,
  department: DeptDetails
) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );
  const [createUser] = userApi.useCreateUserMutation();

  const handleCancel = () => {
    setVisibleModal(false);
  };

  const onSubmitAdded = async () => {
    let isError = false;

    if (data && data.length == 0) {
      toast.error(`Выберите сотрудников для номинации`);
    }

    if (
      data != undefined &&
      data?.length > 0 &&
      department
    ) {
      data.forEach((user) => {
        createUser({
          deptId: department.dept.id,
          authId: typeOfUser && typeOfUser?.id ? typeOfUser?.id : 0,
          phone: user.Телефон,
          roles: ['USER'],
          firstname: user.Имя,
          lastname: user.Фамилия,
          patronymic: user.Отчество,
          description: user['О сотруднике'],
          gender: 'UNDEF',
          post: user.Должность,
        })
          .unwrap()
          .then((res) => {
            if (res.success == false) {
              errorMessageParse(res.errors);
              isError = true;
            }
          })
          .catch(() => {
            isError = true;
            toast.error(`Ошибка создания ${user.Фамилия}`);
          });
      });
      setVisibleModal(false);
    } else {
      isError = true;
    }
    if (!isError) {
      toast.success('Добавление успешно');
    }
  };

  return { handleCancel, onSubmitAdded };
};
