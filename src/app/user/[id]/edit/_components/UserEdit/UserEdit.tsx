'use client';

import styles from './UserEdit.module.scss';
import { useForm } from 'react-hook-form';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import Htag from '@/ui/Htag/Htag';
import Field from '@/ui/Field/Field';
import InputRadio from '@/ui/InputRadio/InputRadio';
import TextArea from '@/ui/TextArea/TextArea';
import Button from '@/ui/Button/Button';
import { withHookFormMask } from 'use-mask-input';
import { useUserEdit } from './useUserEdit';
import { UpdateUserRequest } from '@/api/user/request/UpdateUserRequest';
import Spinner from '@/ui/Spinner/Spinner';
import NoAccess from '@/ui/NoAccess/NoAccess';
import cn from 'classnames';
import InputPhotoAdd from '@/ui/InputPhotoAdd/InputPhotoAdd';
import ButtonEdit from '@/ui/ButtonEdit/ButtonEdit';
import ImagesCarousel from '@/ui/ImagesCarousel/ImagesCarousel';
import { UserEditProps } from './UserEdit.props';
import EditImagesComponent from '@/ui/EditImagesComponent/EditImagesComponent';

export const UserEdit = ({ id }: UserEditProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    setValue,
  } = useForm<UpdateUserRequest>({ mode: 'onChange' });

  const {
    onSubmit,
    handleClick,
    addPhoto,
    removePhoto,
    refreshPhoto,
    isLoadingSingleUser,
    singleUser,
    back,
    imageNum,
    setImageNum,
    images,
    active,
    setActive,
  } = useUserEdit(setValue, id);

  if (isLoadingSingleUser) return <Spinner />;

  if (!singleUser?.success) return <NoAccess />;

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
          gallery='false'
        />
        <form className={styles.form}>
          <div className={styles.fields}>
            <Htag tag='h2' className={styles.title}>
              Редактирование сотрудника
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
                Назад
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
      </div>
    </main>
  );
};

export default UserEdit;
