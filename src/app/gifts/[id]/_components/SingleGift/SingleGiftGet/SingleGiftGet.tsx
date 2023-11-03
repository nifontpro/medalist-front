import { timeConverter } from '@/utils/timeConverter';
import styles from './SingleGiftGet.module.scss';
import { SingleGiftGetProps } from './SingleGiftGet.props';
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

const SingleGiftGet = ({
  gift,
  className,
  ...props
}: SingleGiftGetProps): JSX.Element => {
  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.giftContent}>
        <Htag tag='h1' className={styles.header}>
          Где получить?
        </Htag>
        <P size='s' fontstyle='thin' className={styles.content}>
          Описание того как и где получить эту плюшку
        </P>
      </div>
    </div>
  );
};

export default memo(SingleGiftGet);
