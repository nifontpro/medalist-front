'use client';

import Button from '@/ui/Button/Button';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import Field from '@/ui/Field/Field';
import Htag from '@/ui/Htag/Htag';
import styles from './CreateAward.module.scss';
import TextArea from '@/ui/TextArea/TextArea';
import { useForm } from 'react-hook-form';
import { useCreateAward } from './useCreateAward';
import { CreateAwardRequest } from '@/api/award/request/CreateAwardRequest';
import { memo, useCallback, useMemo, useRef, useState } from 'react';
import dayjs from 'dayjs';
import {
  setEndDate,
  setStartDate,
} from '@/store/features/awardCreateDate/awardCreateDate.slice';
import ChoiceUsers from '@/ui/ChoiceUsers/ChoiceUsers';
import useOutsideClick from '@/hooks/useOutsideClick';
import SelectCalendar from '@/ui/SelectCalendar/SelectCalendar';
import UsersPreviewCreateAward from './UsersPreviewCreateAward/UsersPreviewCreateAward';
import { useFetchParams } from '@/hooks/useFetchParams';
import PrevNextPages from '@/ui/PrevNextPages/PrevNextPages';
import ChoiceImgCreate from './ChoiceImgCreate/ChoiceImgCreate';
import ModalWindowGalleryAwards from '@/app/award/[id]/edit/_components/ModalWindowGalleryAwards/ModalWindowGalleryAwards';
import SpinnerFetching from '@/ui/SpinnerFetching/SpinnerFetching';
import P from '@/ui/P/P';
import ModalConfirm from '@/ui/ModalConfirm/ModalConfirm';
import { userApi } from '@/api/user/user.api';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';

const CreateAward = () => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const [arrChoiceUser, setArrChoiceUser] = useState<string[]>([]);

  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    setValue,
    reset,
    getValues,
  } = useForm<CreateAwardRequest>({ mode: 'onChange' });

  const {
    onSubmitReward,
    onSubmitNominee,
    dispatch,
    back,
    deptId,
    imagesGallery,
    setImagesGallery,
    setImagesFile,
    rewardUserInfo,
    setImageGalleryInfo,
    setImageInfo,
    createAwardInfo,
    handleBack,
  } = useCreateAward(
    setValue,
    reset,
    getValues,
    setOpenModalConfirm,
    arrChoiceUser
  );

  const {
    page,
    setPage,
    searchValue,
    setSearchValue,
    state,
    setState,
    nextPage,
    prevPage,
  } = useFetchParams();

  // Получить пользоветлей в отделе
  const {
    data: users,
    isLoading: isLoadingUsersOnDepartment,
    isFetching: isFetchingUsersOnDepartment,
  } = userApi.useGetUsersByDeptQuery(
    {
      authId: typeOfUser?.id!,
      deptId: deptId,
      baseRequest: {
        subdepts: true,
        page: page,
        pageSize: 100,
        filter: searchValue,
        orders: [{ field: 'lastname', direction: state }],
      },
    },
    {
      skip: !typeOfUser,
    }
  );

  const totalPage = useMemo(() => users?.pageInfo?.totalPages, [users]);

  const onChangeStart = useCallback(
    (value: string | null) => {
      dispatch(setStartDate(dayjs(value).format('DD.MM.YYYY')));
    },
    [dispatch]
  );

  const onChangeEnd = useCallback(
    (value: string | null) => {
      dispatch(setEndDate(dayjs(value).format('DD.MM.YYYY')));
    },
    [dispatch]
  );

  //Закрытие модального окна нажатием вне его
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const ref = useRef(null);
  const refOpen = useRef(null);
  const handleClickOutside = useCallback(() => {
    setVisibleModal(false);
  }, []);
  useOutsideClick(ref, refOpen, handleClickOutside, visibleModal); // добавить как разберусь с Selectom React

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
      <form className={styles.form}>
        <ChoiceImgCreate
          setVisibleModal={setVisibleModal}
          images={imagesGallery}
          setImagesGallery={setImagesGallery}
          setImagesFile={setImagesFile}
        />

        <div className={styles.fields}>
          <Htag tag='h2' className={styles.title}>
            Новая награда
          </Htag>

          <ChoiceImgCreate
            className={styles.mediaVisible}
            setVisibleModal={setVisibleModal}
            images={imagesGallery}
            setImagesGallery={setImagesGallery}
            setImagesFile={setImagesFile}
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
            {...register('score', { required: 'Вес необходить!' })}
            title='Вес награды*'
            placeholder='Введите вес награды'
            error={errors.score}
            className={styles.field}
            type='number'
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

          <div className={styles.group}>
            <SelectCalendar
              handleChangeDate={onChangeStart}
              title='Начинается'
              error={errors.startDate}
            />
            <SelectCalendar
              handleChangeDate={onChangeEnd}
              title='Заканчивается'
              error={errors.endDate}
            />
          </div>

          {users && users.data && (
            <UsersPreviewCreateAward
              setSearchValue={setSearchValue}
              arrChoiceUser={arrChoiceUser}
              users={users.data}
              setArrChoiceUser={setArrChoiceUser}
              startPage={page}
              endPage={totalPage}
              handleNextClick={() => nextPage(users)}
              handlePrevClick={prevPage}
            />
          )}

          {users && users.data && (
            <ChoiceUsers
              setSearchValue={setSearchValue}
              users={users?.data}
              arrChoiceUser={arrChoiceUser}
              setArrChoiceUser={setArrChoiceUser}
            />
          )}
          {totalPage && users && totalPage > 1 ? (
            <PrevNextPages
              startPage={page + 1}
              endPage={totalPage}
              handleNextClick={() => nextPage(users)}
              handlePrevClick={prevPage}
              className={styles.nextPrevPage}
            />
          ) : null}

          <div className={styles.buttons}>
            <Button
              onClick={handleSubmit(onSubmitReward)}
              appearance='whiteBlack'
              size='l'
              disabled={!isDirty || !isValid}
            >
              Наградить сейчас
            </Button>
            <Button
              onClick={handleSubmit(onSubmitNominee)}
              appearance='blackWhite'
              size='l'
              className={styles.lastBtn}
              disabled={!isDirty || !isValid}
            >
              Номинировать
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

      <ModalWindowGalleryAwards
        img={imagesGallery}
        setImg={setImagesGallery}
        textBtn='Подтвердить'
        create={true}
      />

      {rewardUserInfo.status == 'pending' ||
      setImageGalleryInfo.status == 'pending' ||
      createAwardInfo.status == 'pending' ||
      setImageInfo.status == 'pending' ? (
        <SpinnerFetching />
      ) : null}
    </>
  );
};

export default memo(CreateAward);
