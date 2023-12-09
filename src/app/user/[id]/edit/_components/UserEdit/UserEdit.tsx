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
import { UserEditProps } from './UserEdit.props';
import EditImagesComponent from '@/ui/EditImagesComponent/EditImagesComponent';
import { memo, useState } from 'react';
import P from '@/ui/P/P';
import SelectArtem from '@/ui/SelectArtem/SelectArtem';
import AuthComponent from '@/store/providers/AuthComponent';
import SelectRole from '@/ui/SelectRole/SelectRole';
import { IOption } from '@/ui/SelectRole/SelectRole.interface';
import ModalConfirm from '@/ui/ModalConfirm/ModalConfirm';
import cn from 'classnames';
import { useUserEditPhoto } from './useUserEditPhoto';
import SelectCalendar from '@/ui/SelectCalendar/SelectCalendar';
import dayjs from 'dayjs';
import SelectCalendarForm from '@/ui/SelectCalendarForm/SelectCalendarForm';

const roles: IOption[] = [
  {
    label: 'Администратор',
    value: 'ADMIN',
  },
  { label: 'Пользователь', value: 'USER' },
];

export const UserEdit = ({ id }: UserEditProps) => {
  const [openModalConfirm, setOpenModalConfirm] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    setValue,
    control,
    getValues,
  } = useForm<UpdateUserRequest>({ mode: 'onChange' });

  const {
    onSubmit,
    handleClick,
    isLoadingSingleUser,
    singleUser,
    back,
    active,
    setActive,
    arrDeparts,
    handleBack,
  } = useUserEdit(setValue, id, getValues, setOpenModalConfirm);

  const { imageNum, setImageNum, images, addPhoto, removePhoto } =
    useUserEditPhoto(singleUser);

  if (isLoadingSingleUser) return <Spinner />;

  if (!singleUser?.success) return <NoAccess errors={singleUser?.errors} />;

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
            <div className={cn(styles.group, styles.firstGroup)}>
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
                    <div className='flex flex-col'>
                      <P className={styles.fieldDept}>Отдел</P>
                      <SelectArtem
                        error={error}
                        field={field}
                        placeholder=''
                        options={
                          arrDeparts
                            .filter((item) => item.level !== 1)
                            .sort((a, b) => a.label.localeCompare(b.label)) ||
                          []
                        }
                        isLoading={false}
                        isMulti={false}
                      />
                    </div>
                  )}
                />
              </AuthComponent>
            </div>

            <div className={styles.group}>
              <AuthComponent minRole='ADMIN'>
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
              </AuthComponent>

              <Controller
                control={control}
                name='birthDate'
                render={({
                  field: { name, value, onChange, onBlur, ref },
                  fieldState: { invalid, error },
                }) => {
                  value = dayjs(Number(value)).format('DD.MM.YYYY');
                  return (
                    <SelectCalendarForm
                      handleClearDate={() => onChange(null)}
                      handleChangeDate={onChange}
                      title='Дата рождения'
                      error={errors.birthDate}
                      value={dayjs(value, 'DD.MM.YYYY')}
                    />
                  );
                }}
              />
            </div>

            <div className={styles.group}>
              <Controller
                control={control}
                name='jobDate'
                render={({
                  field: { name, value, onChange, onBlur, ref },
                  fieldState: { invalid, error },
                }) => {
                  value = dayjs(Number(value)).format('DD.MM.YYYY');
                  return (
                    <SelectCalendarForm
                      handleClearDate={() => onChange(null)}
                      handleChangeDate={onChange}
                      title='Начало работы'
                      error={errors.birthDate}
                      value={dayjs(value, 'DD.MM.YYYY')}
                    />
                  );
                }}
              />
            </div>

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

export default memo(UserEdit);
