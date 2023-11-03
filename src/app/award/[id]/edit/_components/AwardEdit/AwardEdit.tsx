'use client';

import Button from '@/ui/Button/Button';
import Field from '@/ui/Field/Field';
import Htag from '@/ui/Htag/Htag';
import styles from './AwardEdit.module.scss';
import TextArea from '@/ui/TextArea/TextArea';
import { useForm } from 'react-hook-form';
import Spinner from '@/ui/Spinner/Spinner';
import NoAccess from '@/ui/NoAccess/NoAccess';
import EditImagesComponent from '@/ui/EditImagesComponent/EditImagesComponent';
import { AwardEditProps } from './AwardEdit.props';
import { useAwardEdit } from './useAwardEdit';
import { UpdateAwardRequest } from '@/api/award/request/UpdateAwardRequest';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import ModalWindowGalleryAwards from '../ModalWindowGalleryAwards/ModalWindowGalleryAwards';
import { memo, useState } from 'react';
import P from '@/ui/P/P';
import ModalConfirm from '@/ui/ModalConfirm/ModalConfirm';
import { useAwardEditPhoto } from './useAwardEditPhoto';

const AwardEdit = ({ id }: AwardEditProps) => {
  const [openModalConfirm, setOpenModalConfirm] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    setValue,
    getValues,
  } = useForm<UpdateAwardRequest>({ mode: 'onChange' });

  const {
    onSubmit,
    handleClick,
    back,
    isLoadingSingleAward,
    singleAward,
    imagesGallery,
    setImagesGallery,
    handleBack,
  } = useAwardEdit(setValue, id, getValues, setOpenModalConfirm);

  const { addPhoto, removePhoto, imageNum, setImageNum, images } =
    useAwardEditPhoto(singleAward?.data!);

  if (isLoadingSingleAward) return <Spinner />;

  if (!singleAward?.success) return <NoAccess errors={singleAward?.errors} />;

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
          gallery='true'
          forWhat='award'
          editable={false}
        />
        <form className={styles.form}>
          <Htag tag='h2' className={styles.title}>
            Редактирование награды
          </Htag>

          <EditImagesComponent
            imageNum={imageNum}
            setImageNum={setImageNum}
            images={images}
            addPhoto={addPhoto}
            removePhoto={removePhoto}
            className={styles.mobile}
            gallery='true'
            forWhat='award'
            editable={false}
          />
          <Field
            {...register('name', { required: 'Название необходимо!' })}
            title='Название*'
            placeholder='Введите название награды'
            error={errors.name}
            className={styles.field}
          />
          <Field
            {...register('description', { required: 'Описание необходимо!' })}
            title='Краткое описание*'
            placeholder='Введите описание награды'
            error={errors.description}
            className={styles.field}
          />
          <Field
            {...register('score', { required: 'Вес необходим!' })}
            type='number'
            title='Бонус за награду*'
            placeholder='1000 ₽'
            error={errors.score}
            className={styles.field}
          />

          <TextArea
            {...register('criteria', { required: 'Критерии необходимы!' })}
            title='Требования к номинанту*'
            placeholder='Введите критерии награды'
            error={errors.criteria}
          />
          <P className={styles.field} fontstyle='thin' color='gray' size='xs'>
            * - обязательные поля
          </P>

          <div className={styles.btn}>
            <Button
              onClick={handleSubmit(onSubmit)}
              appearance='blackWhite'
              size='l'
              className={styles.cancel}
              // disabled={!isDirty || !isValid}
            >
              Сохранить
            </Button>
            <Button
              onClick={handleClick}
              appearance='whiteBlack'
              size='l'
              className={styles.confirm}
            >
              Назад
            </Button>
          </div>
        </form>

        <ModalWindowGalleryAwards
          img={imagesGallery}
          setImg={setImagesGallery}
          textBtn='Подтвердить'
          create={false}
        />
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

export default memo(AwardEdit);
