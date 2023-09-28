'use client';

import styles from './UserEdit.module.scss';
import { useForm, Controller } from 'react-hook-form';
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
import { memo } from 'react';
import P from '@/ui/P/P';
import SelectArtem from '@/ui/SelectArtem/SelectArtem';
import AuthComponent from '@/store/providers/AuthComponent';

export const UserEdit = ({ id }: UserEditProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    setValue,
    control,
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
    arrDeparts,
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
            />
            <div className={styles.group}>
              <Field
                {...register('firstname', { required: 'Имя обязательно!' })}
                title='Имя*'
                placeholder='Введите имя'
                error={errors.firstname}
              />
              <div className={styles.groupGender}>
                <Field
                  {...register('lastname', { required: 'Фамилия необходима!' })}
                  title='Фамилия*'
                  placeholder='Введите Фамилию'
                  error={errors.lastname}
                />
                <InputRadio
                  active={active}
                  setActive={setActive}
                  className={styles.gender}
                />
              </div>
            </div>

            <Field
              {...register('patronymic')}
              title='Отчество'
              placeholder='Введите отчество'
              error={errors.patronymic}
              className={styles.field}
            />

            <div className={styles.group}>
              <Field
                {...register('post', { required: 'Должность обязательна!' })}
                title='Должность*'
                placeholder='Введите должность'
                error={errors.post}
              />
              <Field
                {...register('phone')}
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
                title='Email*'
                placeholder='Введите свой email'
                error={errors.authEmail}
              />
              <AuthComponent minRole='ADMIN'>
                <Controller
                  name='deptId'
                  control={control}
                  rules={{
                    required: 'Необходимо выбрать отдел!',
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <SelectArtem
                      error={error}
                      field={field}
                      placeholder=''
                      options={
                        arrDeparts
                          .filter((item) => item.level !== 1)
                          .sort((a, b) => a.label.localeCompare(b.label)) || []
                      }
                      isLoading={false}
                      isMulti={false}
                    />
                  )}
                />
              </AuthComponent>
            </div>

            {/* <Field
              {...register('address', { required: 'Адрес необходим!' })}
              title='Адрес'
              placeholder='Напишите адрес'
              error={errors.address}
              className={styles.field}
            /> */}

            <TextArea
              {...register('description')}
              title='О сотруднике'
              placeholder='Введите информацию о владельце'
              error={errors.description}
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

export default memo(UserEdit);
