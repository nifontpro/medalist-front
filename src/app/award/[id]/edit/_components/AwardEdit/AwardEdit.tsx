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
import { memo } from 'react';

const AwardEdit = ({ id }: AwardEditProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    setValue,
  } = useForm<UpdateAwardRequest>({ mode: 'onChange' });

  const {
    onSubmit,
    handleClick,
    back,
    addPhoto,
    removePhoto,
    isLoadingSingleAward,
    singleAward,
    imageNum,
    setImageNum,
    images,
    imagesGallery,
    setImagesGallery,
  } = useAwardEdit(setValue, id);

  if (isLoadingSingleAward) return <Spinner />;

  if (!singleAward?.success) return <NoAccess />;

  return (
    <main>
      <ButtonCircleIcon
        onClick={back}
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
          />
          <Field
            {...register('name', { required: 'Название необходимо!' })}
            title='Название'
            placeholder='Введите название награды'
            error={errors.name}
            className={styles.field}
          />
          <Field
            {...register('description', { required: 'Описание необходимо!' })}
            title='Краткое описание'
            placeholder='Введите описание награды'
            error={errors.description}
            className={styles.field}
          />
          <Field
            {...register('score', { required: 'Вес необходим!' })}
            type='number'
            title='Вес награды'
            placeholder='Введите вес награды'
            error={errors.score}
            className={styles.field}
          />

          <TextArea
            {...register('criteria', { required: 'Критерии необходимы!' })}
            title='Требования к номинанту'
            placeholder='Введите критерии награды'
            error={errors.criteria}
            className={styles.field}
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

        <ModalWindowGalleryAwards
          img={imagesGallery}
          setImg={setImagesGallery}
          textBtn='Подтвердить'
          create={false}
        />
      </div>
    </main>
  );
};

export default memo(AwardEdit);
