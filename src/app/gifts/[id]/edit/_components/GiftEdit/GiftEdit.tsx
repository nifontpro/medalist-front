'use client';

import styles from './GiftEdit.module.scss';
import { useForm, Controller } from 'react-hook-form';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import Htag from '@/ui/Htag/Htag';
import Field from '@/ui/Field/Field';
import InputRadio from '@/ui/InputRadio/InputRadio';
import TextArea from '@/ui/TextArea/TextArea';
import Button from '@/ui/Button/Button';
import { withHookFormMask } from 'use-mask-input';
import { useGiftEdit } from './useGiftEdit';
import { UpdateUserRequest } from '@/api/user/request/UpdateUserRequest';
import Spinner from '@/ui/Spinner/Spinner';
import NoAccess from '@/ui/NoAccess/NoAccess';
import { GiftEditProps } from './GiftEdit.props';
import EditImagesComponent from '@/ui/EditImagesComponent/EditImagesComponent';
import { memo, useState } from 'react';
import P from '@/ui/P/P';
import SelectArtem from '@/ui/SelectArtem/SelectArtem';
import AuthComponent from '@/store/providers/AuthComponent';
import SelectRole from '@/ui/SelectRole/SelectRole';
import { IOption } from '@/ui/SelectRole/SelectRole.interface';
import ModalConfirm from '@/ui/ModalConfirm/ModalConfirm';
import cn from 'classnames';
import { useGiftEditPhoto } from './useGiftEditPhoto';
import { UpdateProductRequest } from '@/api/shop/product/request/UpdateProductRequest';

export const GiftEdit = ({ id }: GiftEditProps) => {
  const [openModalConfirm, setOpenModalConfirm] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    setValue,
    control,
    getValues,
  } = useForm<UpdateProductRequest>({ mode: 'onChange' });

  const { onSubmit, handleClick, isLoadingGift, gift, back, handleBack } =
    useGiftEdit(setValue, id, getValues, setOpenModalConfirm);

  const { imageNum, setImageNum, images, addPhoto, removePhoto } =
    useGiftEditPhoto(gift?.data!);

  if (isLoadingGift) return <Spinner />;

  if (!gift?.success) return <NoAccess errors={gift?.errors} />;

  return (
    <main>
      <ButtonCircleIcon
        onClick={handleBack}
        classNameForIcon=''
        appearance='black'
        icon='down'
      >
        Вернуться назад
      </ButtonCircleIcon>
      <div className={styles.wrapper}>
        <EditImagesComponent
          imageNum={imageNum}
          setImageNum={setImageNum}
          images={images}
          addPhoto={addPhoto}
          removePhoto={removePhoto}
          className={styles.desktop}
          gallery='false'
          forWhat='user'
          editable={false}
        />
        <form className={styles.form}>
          <div className={styles.fields}>
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
              forWhat='user'
              editable={false}
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
                placeholder='Введите должность'
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
                // disabled={!isDirty || !isValid}
              >
                Сохранить
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
    </main>
  );
};

export default memo(GiftEdit);
