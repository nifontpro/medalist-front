'use client';

import Button from '@/ui/Button/Button';
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
import { memo, useState } from 'react';
import P from '@/ui/P/P';
import ModalConfirm from '@/ui/ModalConfirm/ModalConfirm';
import { useDepartmentEditPhoto } from './useDepartmentEditPhoto';

const DepartmentEdit = ({ id }: DepartmentEditProps) => {
  const [openModalConfirm, setOpenModalConfirm] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    setValue,
    getValues,
  } = useForm<UpdateDeptRequest>({ mode: 'onChange' });

  const {
    onSubmit,
    handleClick,
    isLoadingByIdDept,
    singleDepartment,
    back,
    forWhat,
  } = useDepartmentEdit(setValue, id, getValues, setOpenModalConfirm);

  const { addPhoto, removePhoto, imageNum, setImageNum, images } =
    useDepartmentEditPhoto(singleDepartment);

  if (isLoadingByIdDept) return <Spinner />;

  if (!singleDepartment?.success)
    return <NoAccess errors={singleDepartment?.errors} />;

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
        forWhat={forWhat}
        editable={false}
      />
      <form className={styles.form}>
        <Htag tag='h2' className={styles.title}>
          Редактирование
        </Htag>

        <EditImagesComponent
          imageNum={imageNum}
          setImageNum={setImageNum}
          images={images}
          addPhoto={addPhoto}
          removePhoto={removePhoto}
          className={styles.mobile}
          gallery='false'
          forWhat={forWhat}
          editable={false}
        />

        <Field
          {...register('name', { required: 'Название необходимо!' })}
          title='Название*'
          placeholder='Название'
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
        <P className={styles.field} fontstyle='thin' color='gray' size='xs'>
          * - обязательные поля
        </P>

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

      <ModalConfirm
        title={'Вы действительно хотите покинуть страницу?'}
        textBtn={'Покинуть'}
        text={`Введеные вами данные пропадут безвозвратно!`}
        openModalConfirm={openModalConfirm}
        setOpenModalConfirm={setOpenModalConfirm}
        onConfirm={() => back()}
      />
    </main>
  );
};

export default memo(DepartmentEdit);
