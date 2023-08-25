'use client';

import { memo, useState } from 'react';
import styles from './CreateOwner.module.scss';
import { CreateOwnerRequest } from '@/api/user/request/CreateOwnerRequest';
import { useForm } from 'react-hook-form';
import { useCreateOwner } from './useCreateOwner';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import Htag from '@/ui/Htag/Htag';
import Field from '@/ui/Field/Field';
import InputRadio from '@/ui/InputRadio/InputRadio';
import TextArea from '@/ui/TextArea/TextArea';
import Button from '@/ui/Button/Button';
import { Gender } from '@/types/user/user';
import { withHookFormMask } from 'use-mask-input';
import SpinnerFetching from '@/ui/SpinnerFetching/SpinnerFetching';

const CreateOwner = () => {
  const [active, setActive] = useState<Gender>('MALE');

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    setValue,
    reset,
  } = useForm<CreateOwnerRequest>({ mode: 'onChange' });

  const { onSubmit, handleClick, createInfo, back } = useCreateOwner(
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
            Новый владелец
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
              placeholder='Введите отчество'
              error={errors.patronymic}
            />
          </div>

          <div className={styles.group}>
            <Field
              {...register('post', { required: 'Должность обязательна!' })}
              title='Должность'
              placeholder='Введите свою должность'
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
              Добавить
            </Button>
          </div>
        </div>
      </form>
      {createInfo.status == 'pending' ? <SpinnerFetching /> : null}
    </>
  );
};

export default memo(CreateOwner);
