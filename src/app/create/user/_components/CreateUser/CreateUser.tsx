'use client';

import { memo, useState } from 'react';
import styles from './CreateUser.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { useCreateUser } from './useCreateUser';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import Htag from '@/ui/Htag/Htag';
import Field from '@/ui/Field/Field';
import InputRadio from '@/ui/InputRadio/InputRadio';
import TextArea from '@/ui/TextArea/TextArea';
import Button from '@/ui/Button/Button';
import { Gender } from '@/types/user/user';
import { withHookFormMask } from 'use-mask-input';
import { CreateUserRequest } from '@/api/user/request/CreateUserRequest';
import SelectArtem from '@/ui/SelectArtem/SelectArtem';
import { IOption } from '@/ui/SelectArtem/SelectArtem.interface';
import SpinnerFetching from '@/ui/SpinnerFetching/SpinnerFetching';

const roles: IOption[] = [
  {
    label: 'Администратор',
    value: 'ADMIN',
  },
  { label: 'Пользователь', value: 'USER' },
];

const CreateUser = () => {
  const [active, setActive] = useState<Gender>('MALE');

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    setValue,
    reset,
  } = useForm<CreateUserRequest>({ mode: 'onChange' });

  const { onSubmit, handleClick, createInfo, back } = useCreateUser(
    setValue,
    active,
    reset
  );

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
            Новый сотрудник
          </Htag>

          <div className={styles.groupGender}>
            <Field
              {...register('firstname', { required: 'Имя обязательно!' })}
              title='Имя'
              placeholder='Введите имя'
              error={errors.firstname}
            />
            <InputRadio
              active={active}
              setActive={setActive}
              className={styles.gender}
            />
          </div>

          <div className={styles.group}>
            <Field
              {...register('lastname', { required: 'Фамилия необходима!' })}
              title='Фамилия'
              placeholder='Введите Фамилию'
              error={errors.lastname}
            />

            <Field
              {...register('patronymic')}
              title='Отчество'
              placeholder='Введите отчество'
              error={errors.patronymic}
            />
          </div>

          <div className={styles.group}>
            <Field
              {...register('post', { required: 'Должность обязательна!' })}
              title='Должность'
              placeholder='Введите должность'
              error={errors.post}
            />
            <Field
              {...register('phone', { required: 'Сотовый обязательно!' })}
              title='Мобильный'
              placeholder='Введите мобильный'
              error={errors.phone}
              type='tel'
              className={styles.phone}
              {...withHookFormMask(register('phone'), ['+7 (999) 999 99 99'])}
            />
          </div>

          <div className={styles.group}>
            <Controller
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
                  isMulti={true}
                />
              )}
            />
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

          {/* <Field
            {...register('address', { required: 'Адрес необходим!' })}
            title='Адрес'
            placeholder='Напишите адрес'
            error={errors.address}
            className={styles.field}
          /> */}

          <TextArea
            {...register('description')}
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
              Создать
            </Button>
          </div>
        </div>
      </form>
      {createInfo.status == 'pending' ? <SpinnerFetching /> : null}
    </>
  );
};

export default memo(CreateUser);
