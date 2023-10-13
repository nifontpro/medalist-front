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
import { memo, useState } from 'react';
import P from '@/ui/P/P';
import ModalConfirm from '@/ui/ModalConfirm/ModalConfirm';
import ChoiceImgCreate from '@/app/create/award/_components/CreateAward/ChoiceImgCreate/ChoiceImgCreate';

const CreateDepartment = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    setValue,
    reset,
    getValues,
  } = useForm<CreateDeptRequest>({
    mode: 'onChange',
  });

  const [openModalConfirm, setOpenModalConfirm] = useState(false);

  const {
    imagesGallery,
    setImagesGallery,
    setImagesFile,
    onSubmit,
    handleClick,
    back,
    createInfo,
    handleBack,
  } = useCreateDepartment(setValue, reset, setOpenModalConfirm, getValues);

  return (
    <>
      <ButtonCircleIcon
        onClick={handleBack}
        classNameForIcon=''
        appearance='black'
        icon='down'
      >
        Вернуться назад
      </ButtonCircleIcon>
      <div className={styles.wrapper}>
        <ChoiceImgCreate
          images={imagesGallery}
          setImagesGallery={setImagesGallery}
          setImagesFile={setImagesFile}
          gallery={false}
        />
        <form className={styles.form}>
          <Htag tag='h2' className={styles.title}>
            Новый отдел
          </Htag>

          <ChoiceImgCreate
            className={styles.mediaVisible}
            images={imagesGallery}
            setImagesGallery={setImagesGallery}
            setImagesFile={setImagesFile}
            gallery={false}
          />

          <Field
            {...register('name', { required: 'Название необходимо!' })}
            title='Название отдела*'
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
              title='Мобильный'
              placeholder='Введите номер'
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
      </div>

      <ModalConfirm
        title={'Вы действительно хотите покинуть страницу?'}
        textBtn={'Покинуть'}
        text={`Введеные вами данные пропадут безвозвратно!`}
        openModalConfirm={openModalConfirm}
        setOpenModalConfirm={setOpenModalConfirm}
        onConfirm={() => back()}
      />

      {createInfo.status == 'pending' ? <SpinnerFetching /> : null}
    </>
  );
};

export default memo(CreateDepartment);
