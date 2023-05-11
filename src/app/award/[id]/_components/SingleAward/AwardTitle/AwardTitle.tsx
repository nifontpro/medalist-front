import { timeConverter } from '@/utils/timeConverter';
import styles from './AwardTitle.module.scss';
import { AwardTitleProps } from './AwardTitle.props';
import cn from 'classnames';
import { useRef, useState } from 'react';
import { useAwardAdmin } from '@/app/award/useAwardAdmin';
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
  let convertDate = timeConverter(award?.award.endDate);
  let currentDateNumber = +new Date();

  const { deleteAwardAsync } = useAwardAdmin(award?.award.id.toString());

  //Закрытие модального окна нажатием вне его
  const [visible, setVisible] = useState<boolean>(false);
  const ref = useRef(null);
  const refOpen = useRef(null);
  const handleClickOutside = () => {
    setVisible(false);
  };
  useOutsideClick(ref, refOpen, handleClickOutside, visible);

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

        <P
          size='xs'
          fontstyle='thin'
          type='silverBtn'
          className={styles.description}
        >
          {award?.description}
        </P>

        <div className={styles.dateAward}>
          {/* {award.state == 'AWARD' && ( */}
          <P size='m' color='gray'>
            Награда выдана {convertDate}
          </P>
          {/* )} */}
        </div>

        <P size='m' className={styles.criteriaTitle}>
          Требования
        </P>
        <P size='s' fontstyle='thin' className={styles.criteria}>
          {award?.criteria}
        </P>

        <div className={styles.date}>
          {award?.award.state == 'NOMINEE' ||
            (award?.award.state == 'FUTURE' &&
              award?.award.state != undefined && (
                <P size='s' fontstyle='thin'>
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
              ))}
          {/* {award.state == 'NOMINEE' && currentUser?.role == 'user' ? (
            <Button
              onClick={() => console.log('Хочу участвовать')}
              appearance='blackWhite'
              size='l'
              disabled={true}
            >
              Хочу участвовать
            </Button>
          ) : (
            ''
          )} */}
        </div>
      </div>
    </div>
  );
};

export default AwardTitle;