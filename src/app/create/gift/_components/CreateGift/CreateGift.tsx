'use client';

import { memo, useState } from 'react';
import styles from './CreateGift.module.scss';
import { useForm } from 'react-hook-form';
import { useCreateGift } from './useCreateGift';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import Htag from '@/ui/Htag/Htag';
import Field from '@/ui/Field/Field';
import TextArea from '@/ui/TextArea/TextArea';
import Button from '@/ui/Button/Button';
import SpinnerFetching from '@/ui/SpinnerFetching/SpinnerFetching';
import P from '@/ui/P/P';
import ModalConfirm from '@/ui/ModalConfirm/ModalConfirm';
import ChoiceImgCreate from '@/app/create/award/_components/CreateAward/ChoiceImgCreate/ChoiceImgCreate';
import { CreateProductRequest } from '@/api/shop/product/request/CreateProductRequest';

const CreateGift = () => {
  const [openModalConfirm, setOpenModalConfirm] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    setValue,
    reset,
    getValues,
  } = useForm<CreateProductRequest>({ mode: 'onChange' });

  const {
    imagesGallery,
    setImagesGallery,
    setImagesFile,
    onSubmit,
    handleClick,
    createInfo,
    back,
    handleBack,
  } = useCreateGift(setValue, reset, setOpenModalConfirm, getValues);

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
          <div className={styles.fields}>
            <Htag tag='h2' className={styles.title}>
              Новый приз
            </Htag>
            <ChoiceImgCreate
              className={styles.mediaVisible}
              images={imagesGallery}
              setImagesGallery={setImagesGallery}
              setImagesFile={setImagesFile}
              gallery={false}
            />

            <Field
              {...register('name', { required: 'Название обязательно!' })}
              title='Название*'
              placeholder='Введите название приза'
              error={errors.name}
              className={styles.field}
            />

            <Field
              {...register('shortDescription')}
              title='Краткое описание'
              placeholder='Введите краткое описание'
              error={errors.shortDescription}
              className={styles.field}
            />

            <TextArea
              {...register('description')}
              title='Подробное описание'
              placeholder='Введите информацию о призе'
              className={styles.field}
            />

            <Field
              {...register('siteUrl')}
              title='Ссылка на подробное описание в интернете'
              placeholder='Введите ссылку'
              error={errors.siteUrl}
              className={styles.field}
            />

            <div className={styles.groupGifts}>
              <Field
                {...register('price', { required: 'Стоимость обязательна!' })}
                title='Цена*'
                placeholder='Введите цену'
                type='number'
                error={errors.price}
              />
              <Field
                {...register('count', { required: 'Количество обязательн!' })}
                title='Количество*'
                placeholder='Введите количество'
                error={errors.count}
                type='number'
                className={styles.phone}
              />
            </div>

            <Field
              {...register('place')}
              title='Где получить?'
              placeholder='Напиши где получать приз'
              error={errors.place}
              className={styles.field}
            />

            <P className={styles.field} fontstyle='thin' color='gray' size='xs'>
              * - обязательные поля
            </P>

            <div className={styles.buttons}>
              <Button
                onClick={handleSubmit(onSubmit)}
                appearance='blackWhite'
                size='l'
                className={styles.cancel}
                disabled={!isDirty || !isValid}
              >
                Создать
              </Button>
              <Button
                onClick={handleClick}
                appearance='whiteBlack'
                size='l'
                className={styles.confirm}
              >
                Отменить
              </Button>
            </div>
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

export default memo(CreateGift);
