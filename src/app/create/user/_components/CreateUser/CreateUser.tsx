'use client';

import { memo, useState } from 'react';
import styles from './CreateUser.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { useCreateUser } from './useCreateUser';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import Htag from '@/ui/Htag/Htag';
import Field from '@/ui/Field/Field';
import InputRadio from '@/ui/InputRadio/InputRadio';
import TextArea from '@/ui/TextArea/TextArea';
import Button from '@/ui/Button/Button';
import { Gender } from '@/types/user/user';
import { withHookFormMask } from 'use-mask-input';
import { CreateUserRequest } from '@/api/user/request/CreateUserRequest';
import SelectRole from '@/ui/SelectRole/SelectRole';
import { IOption } from '@/ui/SelectRole/SelectRole.interface';
import SpinnerFetching from '@/ui/SpinnerFetching/SpinnerFetching';
import P from '@/ui/P/P';
import ModalConfirm from '@/ui/ModalConfirm/ModalConfirm';
import ChoiceImgCreate from '@/app/create/award/_components/CreateAward/ChoiceImgCreate/ChoiceImgCreate';

const roles: IOption[] = [
  {
    label: 'Администратор',
    value: 'ADMIN',
  },
  { label: 'Пользователь', value: 'USER' },
];

const CreateUser = () => {
  const [active, setActive] = useState<Gender>('MALE');

  const [openModalConfirm, setOpenModalConfirm] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    setValue,
    reset,
    getValues,
  } = useForm<CreateUserRequest>({ mode: 'onChange' });

  const {
    imagesGallery,
    setImagesGallery,
    setImagesFile,
    onSubmit,
    handleClick,
    createInfo,
    back,
    handleBack,
  } = useCreateUser(setValue, active, reset, setOpenModalConfirm, getValues);

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
              Новый сотрудник
            </Htag>
            <ChoiceImgCreate
              className={styles.mediaVisible}
              images={imagesGallery}
              setImagesGallery={setImagesGallery}
              setImagesFile={setImagesFile}
              gallery={false}
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
                title='Мобильный'
                placeholder='Введите мобильный'
                error={errors.phone}
                type='tel'
                className={styles.phone}
                {...withHookFormMask(register('phone'), ['+7 (999) 999 99 99'])}
              />
            </div>

            <div className={styles.group}>
              <Controller
                name='roles'
                control={control}
                rules={{
                  required: 'Необходимо выбрать роль!',
                }}
                render={({ field, fieldState: { error } }) => (
                  <SelectRole
                    error={error}
                    field={field}
                    placeholder='Роль пользователя*'
                    options={roles || []}
                    isLoading={false}
                    isMulti={true}
                  />
                )}
              />
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

export default memo(CreateUser);
