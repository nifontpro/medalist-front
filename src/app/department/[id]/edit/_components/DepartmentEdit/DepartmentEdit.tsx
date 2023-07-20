'use client';

import Button from '@/ui/Button/Button';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import Field from '@/ui/Field/Field';
import Htag from '@/ui/Htag/Htag';
import styles from './DepartmentEdit.module.scss';
import TextArea from '@/ui/TextArea/TextArea';
import { withHookFormMask } from 'use-mask-input';
import { useForm } from 'react-hook-form';
import { useDepartmentEdit } from './useDepartmentEdit';
import { DepartmentEditProps } from './DepartmentEdit.props';
import Spinner from '@/ui/Spinner/Spinner';
import NoAccess from '@/ui/NoAccess/NoAccess';
import { UpdateDeptRequest } from '@/api/dept/request/updateDeptRequest';
import EditImagesComponent from '@/ui/EditImagesComponent/EditImagesComponent';
import { memo } from 'react';

const DepartmentEdit = ({ id }: DepartmentEditProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    setValue,
  } = useForm<UpdateDeptRequest>({ mode: 'onChange' });

  const {
    onSubmit,
    handleClick,
    addPhoto,
    removePhoto,
    isLoadingByIdDept,
    singleDepartment,
    imageNum,
    setImageNum,
    images,
  } = useDepartmentEdit(setValue, id);

  if (isLoadingByIdDept) return <Spinner />;

  if (!singleDepartment?.success) return <NoAccess />;

  return (
    <main className={styles.wrapper}>
      <EditImagesComponent
        imageNum={imageNum}
        setImageNum={setImageNum}
        images={images}
        addPhoto={addPhoto}
        removePhoto={removePhoto}
        gallery='false'
        className={styles.desktop}
      />
      <form className={styles.form}>
        <Htag tag='h2' className={styles.title}>
          Редактирование отдела
        </Htag>

        <EditImagesComponent
          imageNum={imageNum}
          setImageNum={setImageNum}
          images={images}
          addPhoto={addPhoto}
          removePhoto={removePhoto}
          className={styles.mobile}
          gallery='false'
        />

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

        <div className={styles.group}>
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
        </div>

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
            Назад
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            appearance='blackWhite'
            size='l'
            className={styles.confirm}
            disabled={!isDirty || !isValid}
          >
            Сохранить
          </Button>
        </div>
      </form>
    </main>
  );
};

export default memo(DepartmentEdit);
