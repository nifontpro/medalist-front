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
import { useUserAdmin } from '@/api/user/useUserAdmin';
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

const CreateAward = () => {
  const [arrChoiceUser, setArrChoiceUser] = useState<string[]>([]);

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    setValue,
    reset,
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
  } = useCreateAward(setValue, reset, arrChoiceUser);

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

  const { usersOnDepartment: users } = useUserAdmin(deptId.toString(), {
    subdepts: true,
    page: page,
    pageSize: 100,
    filter: searchValue,
    orders: [{ field: 'lastname', direction: state }],
  });
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
        onClick={back}
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

          <TextArea
            {...register('criteria', { required: 'Критерии необходимы!' })}
            title='Требования к номинанту'
            placeholder='Введите критерии награды'
            error={errors.criteria}
            className={styles.field}
          />

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
