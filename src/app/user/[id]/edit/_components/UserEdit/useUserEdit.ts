import {
  SubmitHandler,
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { toastError } from '@/utils/toast-error';
import { userApi } from '@/api/user/user.api';
import { Gender } from '@/types/user/user';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { UpdateUserRequest } from '@/api/user/request/UpdateUserRequest';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { IOption } from '@/ui/SelectArtem/SelectArtem.interface';
import { deptApi } from '@/api/dept/dept.api';
import dayjs from 'dayjs';
import { convertCorrectDataForUnix } from '@/utils/convertCorrectDataForUnix';

export const useUserEdit = (
  setValue: UseFormSetValue<UpdateUserRequest>,
  id: string,
  getValues: UseFormGetValues<UpdateUserRequest>,
  setOpenModalConfirm: Dispatch<SetStateAction<boolean>>
) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  // Получить пользоветля по id
  const { data: singleUser, isLoading: isLoadingSingleUser } =
    userApi.useGetByIdQuery(
      {
        authId: typeOfUser?.id!,
        userId: Number(id),
      },
      {
        skip: !id || !typeOfUser,
      }
    );

  const { data: deptsForRelocation, isLoading: isLoadingDeptsForRelocation } =
    deptApi.useGetAuthTopLevelTreeQuery(
      {
        authId: typeOfUser?.id!,
        baseRequest: undefined,
      },
      {
        skip: !typeOfUser,
      }
    );

  let arrDeparts: IOption[] = [];

  if (deptsForRelocation?.data)
    arrDeparts = deptsForRelocation.data.map((depart) => ({
      label: depart.name,
      value: depart?.id,
      level: depart.level,
    }));

  const [active, setActive] = useState<Gender>('UNDEF');

  const { back } = useRouter();
  const [update] = userApi.useUpdateMutation();

  useEffect(() => {
    if (typeOfUser && typeOfUser.id) {
      setValue('authId', typeOfUser.id);
    }
    if (singleUser) {
      setActive(singleUser.data?.user.gender);
      setValue('gender', singleUser.data?.user.gender);
      setValue('address', singleUser.data?.address);
      setValue('phone', singleUser.data?.phone);
      setValue('description', singleUser.data?.description);
      setValue('firstname', singleUser.data?.user.firstname);
      setValue('lastname', singleUser.data?.user.lastname);
      setValue('patronymic', singleUser.data?.user.patronymic);
      setValue('post', singleUser.data?.user.post);
      setValue('authEmail', singleUser.data?.user.authEmail);
      setValue('userId', singleUser.data?.user.id);
      setValue('roles', singleUser.data?.user.roles);
      setValue('deptId', singleUser.data?.user.dept.id);
      if (singleUser.data?.birthDate) {
        setValue('birthDate', singleUser.data?.birthDate);
      } else {
        setValue('birthDate', 0);
      }
      if (singleUser.data?.jobDate) {
        setValue('jobDate', singleUser.data?.jobDate);
      } else {
        setValue('jobDate', 0);
      }
    }
  }, [setValue, setActive, typeOfUser, singleUser]);

  const handleBack = () => {
    if (singleUser) {
      const {
        phone,
        description,
        firstname,
        lastname,
        patronymic,
        post,
        authEmail,
        roles,
        deptId,
      } = getValues();
      if (
        phone != singleUser.data?.phone ||
        description != singleUser.data?.description ||
        firstname != singleUser.data?.user.firstname ||
        lastname != singleUser.data?.user.lastname ||
        patronymic != singleUser.data?.user.patronymic ||
        post != singleUser.data?.user.post ||
        authEmail != singleUser.data?.user.authEmail ||
        JSON.stringify(roles) != JSON.stringify(singleUser.data?.user.roles) ||
        deptId != singleUser.data?.user.dept.id
      ) {
        setOpenModalConfirm(true);
      } else {
        back();
      }
    }
  };

  const handleClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleBack();
  };

  const onSubmit: SubmitHandler<UpdateUserRequest> = useCallback(
    async (data) => {
      data.birthDate = data.birthDate ? data.birthDate?.valueOf() : undefined;
      data.jobDate = data.jobDate !== 0 ? data.jobDate?.valueOf() : undefined;

      let isError = false;

      if (active != undefined) {
        data.gender = active;
      }
      await update({ ...data })
        .unwrap()
        .then((res) => {
          if (res.success == false) {
            errorMessageParse(res.errors);
            isError = true;
          }
        })
        .catch((e) => {
          isError = true;
          toastError(e, 'Ошибка редактирования профиля сотрудника');
        });
      if (!isError) {
        toast.success('Профиль сотрудника успешно изменен');
        back();
      }
    },
    [active, back, update]
  );

  return {
    onSubmit,
    handleClick,
    isLoadingSingleUser,
    singleUser,
    back,
    active,
    setActive,
    arrDeparts,
    handleBack,
  };
};
