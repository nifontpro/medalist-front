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
import { memo } from 'react';
import ChoiceUsers from '@/ui/ChoiceUsers/ChoiceUsers';
import SelectCalendar from '@/ui/SelectCalendar/SelectCalendar';
import UsersPreviewCreateAward from './UsersPreviewCreateAward/UsersPreviewCreateAward';
import PrevNextPages from '@/ui/PrevNextPages/PrevNextPages';
import ChoiceImgCreate from './ChoiceImgCreate/ChoiceImgCreate';
import ModalWindowGalleryAwards from '@/app/award/[id]/edit/_components/ModalWindowGalleryAwards/ModalWindowGalleryAwards';
import SpinnerFetching from '@/ui/SpinnerFetching/SpinnerFetching';
import P from '@/ui/P/P';
import ModalConfirm from '@/ui/ModalConfirm/ModalConfirm';

const CreateAward = () => {
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
    back,
    imagesGallery,
    setImagesGallery,
    setImagesFile,
    rewardUserInfo,
    setImageGalleryInfo,
    setImageInfo,
    createAwardInfo,
    handleBack,
    startDateSelect,
    startDateValue,
    endDateSelect,
    endDateValue,
    setVisibleModal,
    onClearStart,
    onChangeStart,
    onClearEnd,
    onChangeEnd,
    users,
    setSearchValue,
    arrChoiceUser,
    setArrChoiceUser,
    page,
    totalPage,
    nextPage,
    prevPage,
    openModalConfirm,
    setOpenModalConfirm,
  } = useCreateAward(setValue, reset, getValues);

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
              handleClearDate={onClearStart}
              handleChangeDate={onChangeStart}
              title='Начинается'
              error={errors.startDate}
              value={startDateValue}
            />
            <SelectCalendar
              handleClearDate={onClearEnd}
              handleChangeDate={onChangeEnd}
              title='Заканчивается'
              error={errors.endDate}
              value={endDateValue}
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
            {startDateValue || endDateValue ? (
              <Button
                onClick={handleSubmit(onSubmitNominee)}
                appearance='blackWhite'
                size='l'
                className={styles.lastBtn}
                disabled={
                  !isDirty ||
                  !isValid ||
                  arrChoiceUser.length === 0 ||
                  endDateSelect === ''
                }
              >
                Номинировать
              </Button>
            ) : (
              <Button
                onClick={handleSubmit(onSubmitReward)}
                appearance='whiteBlack'
                size='l'
                disabled={!isDirty || !isValid || arrChoiceUser.length === 0}
              >
                Наградить сейчас
              </Button>
            )}
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
