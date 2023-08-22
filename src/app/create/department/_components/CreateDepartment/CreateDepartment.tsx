'use client';

import { CreateDeptRequest } from '@/api/dept/request/createDeptRequest';
import Button from '@/ui/Button/Button';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import Field from '@/ui/Field/Field';
import Htag from '@/ui/Htag/Htag';
import styles from './CreateDepartment.module.scss';
import TextArea from '@/ui/TextArea/TextArea';
import { withHookFormMask } from 'use-mask-input';
import { useForm } from 'react-hook-form';
import { useCreateDepartment } from './useCreateDepartment';
import SpinnerFetching from '@/ui/SpinnerFetching/SpinnerFetching';
import { memo } from 'react';

const CreateDepartment = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    setValue,
    reset,
  } = useForm<CreateDeptRequest>({ mode: 'onChange' });

  const { onSubmit, handleClick, back, createInfo } = useCreateDepartment(
    setValue,
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
        <Htag tag='h2' className={styles.title}>
          Новый отдел
        </Htag>

        <Field
          {...register('name', { required: 'Название необходимо!' })}
          title='Название отдела'
          placeholder='Название отдела'
          error={errors.name}
          className={styles.field}
        />

        <div className={styles.group}>
          <Field
            {...register('email')}
            title='Email'
            placeholder='Email'
            error={errors.email}
          />
          <Field
            {...register('phone')}
            title='Сотовый'
            placeholder='Сотовый'
            error={errors.phone}
            {...withHookFormMask(register('phone'), ['+7 (999) 999 99 99'])}
          />
        </div>

        {/* <div className={styles.group}>
          <Field
            {...register('classname')}
            title='Classname'
            placeholder='Classname'
            error={errors.classname}
          />
          <Field
            {...register('address')}
            title='Адрес'
            placeholder='Укажите адрес'
            error={errors.address}
          />
        </div> */}

        <TextArea
          {...register('description')}
          title='Описание'
          placeholder='Чем занимается отдел'
          error={errors.description}
        />

        <div className={styles.btn}>
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
      </form>
      {createInfo.status == 'pending' ? <SpinnerFetching /> : null}
    </>
  );
};

export default memo(CreateDepartment);
