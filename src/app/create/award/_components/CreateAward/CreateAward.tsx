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
import { useRef, useState } from 'react';
import { useUserAdmin } from '@/app/user/useUserAdmin';
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

const CreateAward = () => {
  const [arrChoiceUser, setArrChoiceUser] = useState<string[]>([]);
  // const [images, setImg] = useState<IGalleryObject | undefined>(undefined);

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    setValue,
    reset,
  } = useForm<CreateAwardRequest>({ mode: 'onChange' });

  const { onSubmitReward, onSubmitNominee, dispatch, back, deptId } =
    useCreateAward(
      setValue,
      reset,
      // images,
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

  const { usersOnSubDepartment: users } = useUserAdmin(deptId.toString(), {
    page: page,
    pageSize: 100,
    filter: searchValue,
    orders: [{ field: 'lastname', direction: state }],
  });
  const totalPage = users?.pageInfo?.totalPages;

  const onChangeStart = (value: string | null) => {
    dispatch(setStartDate(dayjs(value).format('DD.MM.YYYY')));
  };
  const onChangeEnd = (value: string | null) => {
    dispatch(setEndDate(dayjs(value).format('DD.MM.YYYY')));
  };

  //Закрытие модального окна нажатием вне его
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const ref = useRef(null);
  const refOpen = useRef(null);
  const handleClickOutside = () => {
    setVisibleModal(false);
  };
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
        {/* <ChoiceImgCreate
          setVisibleModal={setVisibleModal}
          images={images}
          setImg={setImg}
        /> */}

        <div className={styles.fields}>
          <Htag tag='h2' className={styles.title}>
            Новая награда
          </Htag>

          {/* <ChoiceImgCreate
            className={styles.mediaVisible}
            setVisibleModal={setVisibleModal}
            images={images}
            setImg={setImg}
          /> */}

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
          {totalPage && (
            <PrevNextPages
              startPage={page + 1}
              endPage={totalPage}
              handleNextClick={() => nextPage(users)}
              handlePrevClick={prevPage}
              className={styles.nextPrevPage}
            />
          )}

          <div className={styles.buttons}>
            <Button
              onClick={handleSubmit(onSubmitReward)}
              appearance='whiteBlack'
              size='l'
              disabled={!isDirty || !isValid}
            >
              Выдать сразу и закрыть
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

      {/* <ModalWindowGalleryAwards
        img={images}
        setImg={setImg}
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
        textBtn='Подтвердить'
        // ref={ref}
        create={false}
      /> */}
    </>
  );
};

export default CreateAward;
