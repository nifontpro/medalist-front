'use client';

import { useState } from 'react';
import styles from './UserEdit.module.scss';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import Htag from '@/ui/Htag/Htag';
import Field from '@/ui/Field/Field';
import InputRadio from '@/ui/InputRadio/InputRadio';
import TextArea from '@/ui/TextArea/TextArea';
import Button from '@/ui/Button/Button';
import { Gender } from '@/domain/model/user/user';
import { withHookFormMask } from 'use-mask-input';
import SelectArtem from '@/ui/SelectArtem/SelectArtem';
import { IOption } from '@/ui/SelectArtem/SelectArtem.interface';
import { useUserEdit } from './useUserEdit';
import { useUserAdmin } from '../../useUserAdmin';
import { UpdateUserRequest } from '@/api/user/request/UpdateUserRequest';
import Spinner from '@/ui/Spinner/Spinner';
import NoAccess from '@/ui/NoAccess/NoAccess';

const roles: IOption[] = [
  {
    label: 'Администратор',
    value: 'ADMIN',
  },
  { label: 'Пользователь', value: 'USER' },
];

export const EditUser = ({ params }: { params: { id: string } }) => {
  const { singleUser, isLoadingSingleUser } = useUserAdmin(params.id);

  const [active, setActive] = useState<Gender>('MALE');
  const { back } = useRouter();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    setValue,
  } = useForm<UpdateUserRequest>({ mode: 'onChange' });

  const { onSubmit, handleClick } = useUserEdit(
    setValue,
    setActive,
    active,
    singleUser
  );

  if (isLoadingSingleUser) return <Spinner />;

  if (!singleUser?.success) return <NoAccess />;

  return (
    <>
      <ButtonCircleIcon
        onClick={back}
        classNameForIcon=''
        appearance='black'
        icon='down'
      >
        Вернуться назад
      </ButtonCircleIcon>

      <form className={styles.form}>
        <div className={styles.fields}>
          <Htag tag='h2' className={styles.title}>
            Редактирование сотрудника
          </Htag>

          <div className={styles.groupGender}>
            <Field
              {...register('lastname', { required: 'Фамилия необходима!' })}
              title='Фамилия'
              placeholder='Введите Фамилию'
              error={errors.lastname}
            />
            <InputRadio
              active={active}
              setActive={setActive}
              className={styles.gender}
            />
          </div>

          <div className={styles.group}>
            <Field
              {...register('firstname', { required: 'Имя обязательно!' })}
              title='Имя'
              placeholder='Введите имя'
              error={errors.firstname}
            />

            <Field
              {...register('patronymic', {
                required: 'Отчество обязательно!',
                minLength: 6,
              })}
              title='Отчество'
              placeholder='Отчество пароль'
              error={errors.patronymic}
            />
          </div>

          <div className={styles.group}>
            <Field
              {...register('post', { required: 'Пост обязательно!' })}
              title='Пост'
              placeholder='Введите свой пост'
              error={errors.post}
            />
            <Field
              {...register('phone', { required: 'Сотовый обязательно!' })}
              title='Сотовый'
              placeholder='Введите свой сотовый'
              error={errors.phone}
              type='tel'
              className={styles.phone}
              {...withHookFormMask(register('phone'), ['+7 (999) 999 99 99'])}
            />
          </div>

          <div className={styles.group}>
            {/* <Controller
              name='roles'
              control={control}
              rules={{
                required: 'Необходимо выбрать роль!',
              }}
              render={({ field, fieldState: { error } }) => (
                <SelectArtem
                  error={error}
                  field={field}
                  placeholder='Роль пользователя'
                  options={roles || []}
                  isLoading={false}
                  isMulti={false}
                />
              )}
            /> */}
            <Field
              {...register('authEmail', {
                required: 'required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Entered value does not match email format',
                },
              })}
              title='Email'
              placeholder='Введите свой email'
              error={errors.authEmail}
            />
          </div>

          <Field
            {...register('address', { required: 'Адрес необходим!' })}
            title='Адрес'
            placeholder='Напишите адрес'
            error={errors.address}
            className={styles.field}
          />

          <TextArea
            {...register('description', { required: 'Описание необходимо!' })}
            title='О сотруднике'
            placeholder='Введите информацию о владельце'
            error={errors.description}
            className={styles.field}
          />

          <div className={styles.buttons}>
            <Button
              onClick={handleClick}
              appearance='whiteBlack'
              size='l'
              className={styles.cancel}
            >
              Отменить
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              appearance='blackWhite'
              size='l'
              className={styles.confirm}
              disabled={!isDirty || !isValid}
            >
              Изменить
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditUser;
