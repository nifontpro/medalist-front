'use client';

import styles from './GiftSettings.module.scss';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import { GiftSettingsProps } from './GiftSettings.props';
import { memo, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { SelectGetGiftSettings } from '@/store/features/giftSettings/giftSettings-selectors';
import Htag from '@/ui/Htag/Htag';
import { SubmitHandler, useForm } from 'react-hook-form';
import Field from '@/ui/Field/Field';
import Button from '@/ui/Button/Button';
import { deptApi } from '@/api/dept/dept.api';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { toastError } from '@/utils/toast-error';
import { toast } from 'react-toastify';

export const GiftSettings = ({}: GiftSettingsProps) => {
  const { push } = useRouter();

  const selectCompany = localStorage.getItem('selectCompany');

  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const settings = useAppSelector(SelectGetGiftSettings);

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    setValue,
    control,
    getValues,
  } = useForm<{
    authId: number;
    deptId: number;
    payName: string;
  }>({ mode: 'onChange' });

  useEffect(() => {
    if (settings && typeOfUser) {
      setValue('payName', settings.payName);
      setValue('authId', typeOfUser?.id!);
      setValue(
        'deptId',
        typeOfUser?.roles.includes('OWNER')
          ? selectCompany
          : typeOfUser?.dept?.id
      );
    }
  }, [settings, typeOfUser, selectCompany]);

  const [updateSettings] = deptApi.useSaveSettingsMutation();

  const onSubmit: SubmitHandler<{
    authId: number;
    deptId: number;
    payName: string;
  }> = useCallback(async (data) => {
    let isError = false;

    await updateSettings({ ...data })
      .unwrap()
      .then((res) => {
        if (res.success == false) {
          errorMessageParse(res.errors);
          isError = true;
        }
      })
      .catch((e) => {
        isError = true;
        toastError(e, 'Ошибка редактирования ');
      });
    if (!isError) {
      toast.success('Настройки успешно отредактированы');
      push(`/gifts`);
    }
  }, []);

  return (
    <main>
      <ButtonCircleIcon
        onClick={() => push(`/gifts`)}
        classNameForIcon=''
        appearance='black'
        icon='down'
      >
        В магазин призов
      </ButtonCircleIcon>

      <form className={styles.wrapper}>
        <Htag tag='h1'>Настройка магазина призов</Htag>
        <Field
          {...register('payName', {
            required: 'Название обязательно!',
            maxLength: { value: 3, message: 'Не более 3 символов!' },
          })}
          title='Название призовой валюты*'
          placeholder='Название валюты'
          error={errors.payName}
          className={styles.field}
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          appearance='blackWhite'
          size='l'
          className={styles.confirm}
          disabled={!isDirty || !isValid}
        >
          Сохранить
        </Button>
      </form>
    </main>
  );
};

export default memo(GiftSettings);
