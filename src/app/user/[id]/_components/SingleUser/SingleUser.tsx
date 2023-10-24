'use client';

import styles from './SingleUser.module.scss';
import cn from 'classnames';
import { SingleUserProps } from './SingleUser.props';
import ButtonScrollUp from '@/ui/ButtonScrollUp/ButtonScrollUp';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import ImagesCarousel from '@/ui/ImagesCarousel/ImagesCarousel';
import SingleUserTitle from './SingleUserTitle/SingleUserTitle';
import SingleUserAwards from './SingleUserAwards/SingleUserAwards';
import SingleUserNominee from './SingleUserNominee/SingleUserNominee';
import ModalWindowWithAddAwards from '../ModalWindowWithAddAwards/ModalWindowWithAddAwards';
import Spinner from '@/ui/Spinner/Spinner';
import NoAccess from '@/ui/NoAccess/NoAccess';
import EventSingleUser from './EventSingleUser/EventSingleUser';
import ModalWindowWithAddEvent from '@/ui/ModalWindowWithAddEvent/ModalWindowWithAddEvent';
import { useSingleUser } from './useSingleUser';
import {
  ChangeEvent,
  MouseEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import EditImagesComponent from '@/ui/EditImagesComponent/EditImagesComponent';
import { BaseImage } from '@/types/base/image/baseImage';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { toast } from 'react-toastify';
import { userApi } from '@/api/user/user.api';
import { errorMessageParse } from '@/utils/errorMessageParse';

const SingleUser = ({
  id,
  className,
  children,
  ...props
}: SingleUserProps): JSX.Element => {
  const {
    visibleModal,
    setVisibleModal,
    ref,
    refOpen,
    visibleModalEvent,
    setVisibleModalEvent,
    user,
    isLoadingSingleUser,
    page,
    setPage,
    setSearchValue,
    searchValue,
    nextPage,
    prevPage,
    back,
    searchHandleChange,
    userActiv,
    arrChoiceAward,
    setArrChoiceAward,
    awardsAvailableForRewardUserSimple,
    totalPage,
  } = useSingleUser(id);

  //------------------------------------------

  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const [imageNum, setImageNum] = useState<number>(0);
  const [images, setImages] = useState<BaseImage[]>();
  const [addImage] = userApi.useImageAddMutation();
  const [removeImage] = userApi.useImageDeleteMutation();

  const addPhoto = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      let isError = false;

      if (event.target.files !== null && user) {
        const file = new FormData();
        file.append('file', event.target.files[0]);
        file.append('userId', user.data?.user.id);
        typeOfUser &&
          typeOfUser.id &&
          file.append('authId', typeOfUser.id.toString());
        if (event.target.files[0].size > 20971520) {
          toast.error('Размер фотографии должен быть меньше 1МБ');
        } else {
          await addImage(file)
            .unwrap()
            .then((res) => {
              if (res.success == false) {
                errorMessageParse(res.errors);
                isError = true;
              }
            })
            .catch(() => {
              isError = true;
              toast.error('Ошибка добавления фотографии');
            });
          if (!isError) {
            toast.success('Фото успешно добавлено');
            setImageNum(0);
          }
        }
      }
    },
    [addImage, user, typeOfUser]
  );

  const removePhoto = useCallback(
    async (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      e.preventDefault();
      let isError = false;
      if (user && imageNum != undefined && typeOfUser?.id) {
        await removeImage({
          userId: user.data?.user.id,
          imageId: user?.data?.user.images[imageNum].id,
          authId: typeOfUser?.id,
        })
          .unwrap()
          .then((res) => {
            if (res.success == false) {
              errorMessageParse(res.errors);
              isError = true;
            }
          })
          .catch(() => {
            isError = true;
            toast.error('Ошибка удаления фотографии');
          });
        if (!isError) {
          toast.success('Фото успешно удалено');
          setImageNum(0);
        }
      }
    },
    [imageNum, removeImage, user, typeOfUser]
  );

  useEffect(() => {
    setImages(user?.data?.user.images);
  }, [user]);
  //------------------------------------------

  if (isLoadingSingleUser) return <Spinner />;
  if (!user?.success) return <NoAccess />;

  return (
    <>
      <div className={cn(className)} {...props}>
        <ButtonCircleIcon
          onClick={back}
          classNameForIcon=''
          appearance='black'
          icon='down'
        >
          Вернуться назад
        </ButtonCircleIcon>

        <div className={styles.wrapper}>
          {user && (
            <div className={styles.imagesWrapper}>
              <EditImagesComponent
                imageNum={imageNum}
                setImageNum={setImageNum}
                images={images}
                addPhoto={addPhoto}
                removePhoto={removePhoto}
                className={styles.img}
                gallery='false'
                forWhat='user'
                userId={user.data?.user.id}
                editable={true}
              />
            </div>
          )}
          {/* {user && (
            <ImagesCarousel
              data={user.data?.user.images}
              edit={false}
              className={styles.img}
              forWhat='user'
            />
          )} */}

          <div className={styles.content}>
            {userActiv && (
              <SingleUserTitle
                user={user.data}
                userActiv={userActiv.data}
                setVisibleModal={setVisibleModal}
                setVisibleModalEvent={setVisibleModalEvent}
                refOpen={refOpen}
              />
            )}

            <SingleUserAwards user={user.data} id={id} />

            <SingleUserNominee user={user.data} id={id} />
          </div>
        </div>
        <EventSingleUser id={id} />
        <ButtonScrollUp />
      </div>

      <ModalWindowWithAddAwards
        totalPage={totalPage}
        nextPage={() =>
          awardsAvailableForRewardUserSimple &&
          nextPage(awardsAvailableForRewardUserSimple)
        }
        prevPage={prevPage}
        page={page}
        setPage={setPage}
        setSearchValue={setSearchValue}
        arrChoiceAward={arrChoiceAward}
        setArrChoiceAward={setArrChoiceAward}
        searchHandleChange={searchHandleChange}
        awardState='AWARD'
        userId={user.data?.user.id}
        awards={awardsAvailableForRewardUserSimple?.data!}
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
        textBtn='Наградить'
        ref={ref}
      />

      <ModalWindowWithAddEvent
        forWhat='User'
        id={id}
        visibleModal={visibleModalEvent}
        setVisibleModal={setVisibleModalEvent}
        textBtn='Создать событие'
      />
    </>
  );
};

export default memo(SingleUser);
