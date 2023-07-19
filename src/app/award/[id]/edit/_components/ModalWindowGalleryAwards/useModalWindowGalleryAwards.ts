import { awardApi } from '@/api/award/award.api';
import { galleryApi } from '@/api/gallery/gallery.api';
import { GalleryItem } from '@/types/gallery/item';
import { setVisible } from '@/store/features/visibleModalWindowGalleryAwards/visibleModalWindowGalleryAwards.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { useParams, useRouter } from 'next/navigation';
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import { toast } from 'react-toastify';

export const useModalWindowGalleryAwards = (
  create: boolean,
  setImg?: Dispatch<SetStateAction<GalleryItem | undefined>>
) => {
  const dispatch = useAppDispatch();

  const visibleModal = useAppSelector(
    (state: RootState) => state.visibleModalWindowGalleryAwards
  );

  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const params = useParams();

  const [idFolder, setIdFolder] = useState<number>(-1);

  const { data: folders } = galleryApi.useGetAllFolderQuery({
    baseRequest: {
      orders: [
        { field: 'parentId', direction: 'ASC' },
        { field: 'name', direction: 'ASC' },
      ],
    },
  });

  const { data: awardsGallery, isLoading: isAwardsGalleryLoading } =
    galleryApi.useGetItemsByFolderQuery(
      {
        folderId: idFolder,
        baseRequest: undefined,
      },
      { skip: idFolder == -1 }
    );

  const [imagesPreview, setImagesPreview] = useState<GalleryItem | undefined>(
    undefined
  );

  const [setImage] = awardApi.useGalleryImageAddMutation();

  const onSubmit = useCallback(
    async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      e.preventDefault();
      let isError = false;
      if (imagesPreview) {
        if (create && setImg) {
          setImg(imagesPreview);
          dispatch(setVisible(false));
        } else if (typeOfUser && typeOfUser.id) {
          await setImage({
            awardId: Number(params.id),
            authId: typeOfUser.id,
            itemId: imagesPreview.id,
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
              toast.error('Ошибка добавления фото награды');
            });
          if (!isError) {
            toast.success('Фото успешно обновлено');
            dispatch(setVisible(false));
          }
        }
      }
    },
    [create, dispatch, imagesPreview, params.id, setImage, setImg, typeOfUser]
  );

  return {
    awardsGallery,
    imagesPreview,
    setImagesPreview,
    onSubmit,
    folders,
    setIdFolder,
    dispatch,
    visibleModal,
    isAwardsGalleryLoading,
  };
};
