import styles from './SingleGiftTitle.module.scss';
import { SingleGiftTitleProps } from './SingleGiftTitle.props';
import cn from 'classnames';
import { memo, useCallback, useRef, useState } from 'react';
import useOutsideClick from '@/hooks/useOutsideClick';
import Htag from '@/ui/Htag/Htag';
import EditPanelAuthBtn from '@/ui/EditPanelAuthBtn/EditPanelAuthBtn';
import { getAwardEditUrl, getGiftEditUrl } from '@/config/api.config';
import P from '@/ui/P/P';
import EditImagesComponent from '@/ui/EditImagesComponent/EditImagesComponent';
import Button from '@/ui/Button/Button';
import { useRouter } from 'next/navigation';
import { useShopAdmin } from '@/api/shop/useShopAdmin';
import { useGiftEditPhoto } from '../../../edit/_components/GiftEdit/useGiftEditPhoto';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import ModalConfirm from '@/ui/ModalConfirm/ModalConfirm';
import GiftConfirmationContent from '@/ui/GiftConfirmationContent/GiftConfirmationContent';
import { SelectGetGiftSettings } from '@/store/features/giftSettings/giftSettings-selectors';

const SingleGiftTitle = ({
  gift,
  className,
  ...props
}: SingleGiftTitleProps): JSX.Element => {
  const { push } = useRouter();
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const { deleteGiftAsync, buyGift } = useShopAdmin(gift.product.id);

  //Закрытие модального окна нажатием вне его
  const [visible, setVisible] = useState<boolean>(false);
  const ref = useRef(null);
  const refOpen = useRef(null);
  const handleClickOutside = useCallback(() => {
    setVisible(false);
  }, []);
  useOutsideClick(ref, refOpen, handleClickOutside, visible);

  const { addPhoto, removePhoto, imageNum, setImageNum, images } =
    useGiftEditPhoto(gift);

  const [openModalConfirm, setOpenModalConfirm] = useState(false);

  const settings = useAppSelector(SelectGetGiftSettings);

  return (
    <>
      <div className={cn(styles.wrapper, className)} {...props}>
        {gift && (
          <div className={styles.imagesWrapper}>
            <EditImagesComponent
              imageNum={imageNum}
              setImageNum={setImageNum}
              images={images}
              addPhoto={addPhoto}
              removePhoto={removePhoto}
              className={styles.img}
              gallery='false'
              forWhat='gift'
              editable={true}
            />
          </div>
        )}

        <div className={styles.awardDescription}>
          <div className={styles.title}>
            <Htag tag='h1' className={styles.header}>
              {gift.product.name}
            </Htag>
            {gift && (
              <EditPanelAuthBtn
                onlyRemove={false}
                handleRemove={deleteGiftAsync}
                id={gift.product.id.toString()}
                getUrlEdit={getGiftEditUrl}
                className={styles.dots}
              />
            )}
          </div>

          <div className='flex items-center'>
            <P
              size='m'
              fontstyle='thin'
              color='gray'
              className={styles.description}
            >
              {gift.product.shortDescription}
            </P>
          </div>

          <div className={styles.businessWrapper}>
            <P size='xl' fontstyle='thin' className='flex gap-[5px] items-end'>
              {gift.product.price}
              <span className='text-[17px] leading-[21px]'>
                {settings?.payName || ''}
              </span>
            </P>
            <P size='s' fontstyle='thin' className={styles.available}>
              Наличие: {gift.product.count}
            </P>
            <Button
              onClick={() => setOpenModalConfirm(true)}
              appearance={'blackWhite'}
              size='l'
              disabled={
                typeOfUser?.scores &&
                (typeOfUser?.scores < gift.product.price ||
                  gift.product.count <= 0)
                  ? true
                  : false
              }
            >
              Купить
            </Button>
          </div>

          <div className={styles.descriptionContent}>
            <P size='s'>Подробнее:</P>
            <P size='s' fontstyle='thin' className={styles.content}>
              {gift.description}
            </P>
          </div>

          <P size='m' className={styles.moreInformation}>
            Больше информации на сайте:
          </P>

          <P
            size='m'
            fontstyle='thin'
            color='gray'
            className={styles.www}
            onClick={() => push(`${gift.siteUrl}`)}
          >
            {gift.siteUrl}
          </P>
        </div>
      </div>

      <ModalConfirm
        title={'Подтверждение'}
        textBtn={'Купить'}
        text={'Еще не поздно передумать! Решайтесь!'}
        openModalConfirm={openModalConfirm}
        setOpenModalConfirm={setOpenModalConfirm}
        onConfirm={() => buyGift(gift.product.id)}
      >
        <GiftConfirmationContent gift={gift.product} />
      </ModalConfirm>
    </>
  );
};

export default memo(SingleGiftTitle);
