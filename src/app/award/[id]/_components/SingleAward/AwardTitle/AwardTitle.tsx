import { timeConverter } from '@/utils/timeConverter';
import styles from './AwardTitle.module.scss';
import { AwardTitleProps } from './AwardTitle.props';
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
import ImagesCarousel from '@/ui/ImagesCarousel/ImagesCarousel';

const AwardTitle = ({
  award,
  className,
  ...props
}: AwardTitleProps): JSX.Element => {
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

  console.log('award', award);

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      {award && (
        <ImagesCarousel
          data={award?.award.images}
          edit={false}
          className={styles.img}
        />
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
          <P size='xs' className={styles.description} type='silverBtn'>
            {award?.description}
          </P>
        </div>

        <div className={styles.dateAward}>
          {/* {award.state == 'AWARD' && ( */}
          <P size='m' color='gray'>
            Награда создана {convertDate}
          </P>
          {/* )} */}
        </div>

        <P size='m' className={styles.criteriaTitle}>
          Требования
        </P>

        <P size='s' fontstyle='thin' className={styles.criteria}>
          {award?.criteria}
        </P>

        {/* <P size='s' fontstyle='thin' className={styles.criteria}>
          Вес награды: {award?.award.score}
        </P> */}

        {award?.award.state == 'NOMINEE' || award?.award.state == 'FUTURE' ? (
          <div className={styles.date}>
            <P size='s'>
              Осталось
              <ButtonIcon className='ml-[10px]' appearance='lime'>
                {Math.floor(
                  (award?.award.endDate - currentDateNumber) /
                    1000 /
                    60 /
                    60 /
                    24
                )}{' '}
                {declOfNum(
                  Math.floor(
                    (award?.award.endDate - currentDateNumber) /
                      1000 /
                      60 /
                      60 /
                      24
                  ),
                  ['день', 'дня', 'дней']
                )}
              </ButtonIcon>
            </P>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default memo(AwardTitle);
