import { timeConverter } from '@/utils/timeConverter';
import styles from './SingleGiftTitle.module.scss';
import { SingleGiftTitleProps } from './SingleGiftTitle.props';
import cn from 'classnames';
import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { useAwardAdmin } from '@/api/award/useAwardAdmin';
import useOutsideClick from '@/hooks/useOutsideClick';
import Htag from '@/ui/Htag/Htag';
import EditPanelAuthBtn from '@/ui/EditPanelAuthBtn/EditPanelAuthBtn';
import { getAwardEditUrl } from '@/config/api.config';
import P from '@/ui/P/P';
import ButtonIcon from '@/ui/ButtonIcon/ButtonIcon';
import { declOfNum } from '@/utils/declOfNum';
import PreviewDept from '@/ui/PreviewDept/PreviewDept';
import EditImagesComponent from '@/ui/EditImagesComponent/EditImagesComponent';
import MoneyPreview from '@/ui/MoneyPreview/MoneyPreview';
import { useAwardEditPhoto } from '@/app/award/[id]/edit/_components/AwardEdit/useAwardEditPhoto';
import Button from '@/ui/Button/Button';
import { useRouter } from 'next/navigation';

const SingleGiftTitle = ({
  award,
  className,
  ...props
}: SingleGiftTitleProps): JSX.Element => {
  const { push } = useRouter();
  let convertDate = useMemo(() => timeConverter(award?.award.endDate), [award]);
  let currentDateNumber = useMemo(() => +new Date(), []);

  const { deleteAwardAsync } = useAwardAdmin(award?.award.id.toString());

  //Закрытие модального окна нажатием вне его
  const [visible, setVisible] = useState<boolean>(false);
  const ref = useRef(null);
  const refOpen = useRef(null);
  const handleClickOutside = useCallback(() => {
    setVisible(false);
  }, []);
  useOutsideClick(ref, refOpen, handleClickOutside, visible);

  const {
    addPhoto,
    removePhoto,
    imageNum,
    setImageNum,
    images,
    imagesGallery,
    setImagesGallery,
  } = useAwardEditPhoto(award);

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      {award && (
        <div className={styles.imagesWrapper}>
          <EditImagesComponent
            imageNum={imageNum}
            setImageNum={setImageNum}
            images={images}
            addPhoto={addPhoto}
            removePhoto={removePhoto}
            className={styles.img}
            gallery='true'
            forWhat='award'
            editable={true}
          />
        </div>
      )}

      <div className={styles.awardDescription}>
        <div className={styles.title}>
          <Htag tag='h1' className={styles.header}>
            {award?.award.name}
          </Htag>
          {award && (
            <EditPanelAuthBtn
              onlyRemove={false}
              handleRemove={deleteAwardAsync}
              id={award?.award.id.toString()}
              getUrlEdit={getAwardEditUrl}
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
            {'Какое то описание'}
          </P>
        </div>

        <div className={styles.businessWrapper}>
          <P size='xl' fontstyle='thin' className='flex gap-[5px] items-end'>
            5000
            <span className='text-[17px] leading-[21px]'>₽</span>
          </P>
          <P size='s' fontstyle='thin' className={styles.available}>
            Наличие: {4}
          </P>
          <Button
            onClick={() => console.log('Купить')}
            appearance={'blackWhite'}
            size='l'
            disabled={false}
          >
            Купить
          </Button>
        </div>

        <div className={styles.descriptionContent}>
          <P size='s'>Подробнее:</P>
          <P size='s' fontstyle='thin' className={styles.content}>
            {
              'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
            }
          </P>
        </div>

        <P size='m' fontstyle='thin' className={styles.moreInformation}>
          Больше информации на сайте:
        </P>

        <P
          size='m'
          fontstyle='thin'
          color='gray'
          className={styles.www}
          onClick={() => push(`https://www.${award?.award.name}`)}
        >
          {'Адрес какого то сайта'}
        </P>
      </div>
    </div>
  );
};

export default memo(SingleGiftTitle);
