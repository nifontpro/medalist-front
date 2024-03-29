'use client';

import { memo, useState } from 'react';
import styles from './CreateOwner.module.scss';
import { CreateOwnerRequest } from '@/api/user/request/CreateOwnerRequest';
import { useForm } from 'react-hook-form';
import { useCreateOwner } from './useCreateOwner';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import Htag from '@/ui/Htag/Htag';
import Field from '@/ui/Field/Field';
import InputRadio from '@/ui/InputRadio/InputRadio';
import TextArea from '@/ui/TextArea/TextArea';
import Button from '@/ui/Button/Button';
import { Gender } from '@/types/user/user';
import { withHookFormMask } from 'use-mask-input';
import SpinnerFetching from '@/ui/SpinnerFetching/SpinnerFetching';
import P from '@/ui/P/P';
import ModalConfirm from '@/ui/ModalConfirm/ModalConfirm';

const CreateOwner = () => {
  const [active, setActive] = useState<Gender>('MALE');
  const [openModalConfirm, setOpenModalConfirm] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    setValue,
    reset,
  } = useForm<CreateOwnerRequest>({ mode: 'onChange' });

  const { onSubmit, handleClick, createInfo, back } = useCreateOwner(
    setValue,
    active,
    reset,
    setOpenModalConfirm
  );

  return (
    <>
      <ButtonCircleIcon
        onClick={() => setOpenModalConfirm(true)}
        classNameForIcon=''
        appearance='black'
        icon='down'
      >
        Вернуться назад
      </ButtonCircleIcon>

      <form className={styles.form}>
        <div className={styles.fields}>
          <Htag tag='h2' className={styles.title}>
            Новый владелец
          </Htag>

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
              placeholder='Введите свою должность'
              error={errors.post}
            />
            <Field
              {...register('phone')}
              title='Мобильный'
              placeholder='Введите номер'
              error={errors.phone}
              type='tel'
              className={styles.phone}
              {...withHookFormMask(register('phone'), ['+7 (999) 999 99 99'])}
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
              Добавить
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

export default memo(CreateOwner);
