'use client';

import { useEffect, useState } from 'react';
import styles from './UserEdit.module.scss';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import Htag from '@/ui/Htag/Htag';
import Field from '@/ui/Field/Field';
import InputRadio from '@/ui/InputRadio/InputRadio';
import TextArea from '@/ui/TextArea/TextArea';
import Button from '@/ui/Button/Button';
import { Gender } from '@/domain/model/user/user';
import { withHookFormMask } from 'use-mask-input';
import { useUserEdit } from './useUserEdit';
import { useUserAdmin } from '../../useUserAdmin';
import { UpdateUserRequest } from '@/api/user/request/UpdateUserRequest';
import Spinner from '@/ui/Spinner/Spinner';
import NoAccess from '@/ui/NoAccess/NoAccess';
import cn from 'classnames';
import InputPhotoAdd from '@/ui/InputPhotoAdd/InputPhotoAdd';
import ButtonEdit from '@/ui/ButtonEdit/ButtonEdit';
import { BaseImage } from '@/domain/model/base/image/baseImage';

import ImagesCarousel from '@/ui/ImagesCarousel/ImagesCarousel';

export default function EditUser({ params }: { params: { id: string } }) {
  const { singleUser, isLoadingSingleUser } = useUserAdmin(params.id);

  const [imageNum, setImageNum] = useState<number>(0);
  const [images, setImages] = useState<BaseImage[]>();

  useEffect(() => {
    setImages(singleUser?.data?.user.images);
  }, [singleUser]);

  const [active, setActive] = useState<Gender>('UNDEF');
  const { back } = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    setValue,
  } = useForm<UpdateUserRequest>({ mode: 'onChange' });

  const { onSubmit, handleClick, addPhoto, removePhoto, refreshPhoto } =
    useUserEdit(setValue, setActive, active, singleUser, imageNum, setImageNum);

  if (isLoadingSingleUser) return <Spinner />;

  if (!singleUser?.success) return <NoAccess />;

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
            Редактирование сотрудника
          </Htag>

          <div className='flex justify-center items-center'>
            <div
              className={cn(
                styles.field,
                styles.uploadField,
                styles.mediaVisible
              )}
            >
              <ImagesCarousel
                singleUser={singleUser}
                imageNum={imageNum}
                setImageNum={setImageNum}
                images={images}
              />

              <div className={styles.editPanel}>
                <InputPhotoAdd onChange={addPhoto} className={styles.input}>
                  <ButtonEdit icon='edit' />
                </InputPhotoAdd>
                {singleUser.data?.user.images.length > 0 && (
                  <>
                    <InputPhotoAdd
                      onChange={refreshPhoto}
                      className={styles.input}
                    >
                      <ButtonEdit icon='refresh' />
                    </InputPhotoAdd>

                    <ButtonEdit icon='remove' onClick={(e) => removePhoto(e)} />
                  </>
                )}
              </div>
            </div>
          </div>

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
              placeholder='Отчество пароль'
              error={errors.patronymic}
            />
          </div>

          <div className={styles.group}>
            <Field
              {...register('post', { required: 'Пост обязательно!' })}
              title='Пост'
              placeholder='Введите свой пост'
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

          <div className={styles.group}>
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

          <Field
            {...register('address', { required: 'Адрес необходим!' })}
            title='Адрес'
            placeholder='Напишите адрес'
            error={errors.address}
            className={styles.field}
          />

          <TextArea
            {...register('description', { required: 'Описание необходимо!' })}
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
              Изменить
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
