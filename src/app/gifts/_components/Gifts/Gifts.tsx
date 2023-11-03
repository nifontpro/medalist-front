'use client';

import uniqid from 'uniqid';
import { GiftsProps } from './Gifts.props';
import { useGifts } from './useGifts';
import styles from './Gifts.module.scss';
import Htag from '@/ui/Htag/Htag';
import AuthComponent from '@/store/providers/AuthComponent';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import TabTitle from '@/ui/TabTitle/TabTitle';
import SortButton from '@/ui/SortButton/SortButton';
import ButtonScrollUp from '@/ui/ButtonScrollUp/ButtonScrollUp';
import Gift from './Gift/Gift';
import Spinner from '@/ui/Spinner/Spinner';
import NoAccess from '@/ui/NoAccess/NoAccess';
import FilterAwards from './FilterAwards/FilterAwards';
import { memo } from 'react';
import { toast } from 'react-toastify';

const Gifts = ({ className, ...props }: GiftsProps) => {
  const {
    giftsOnCompany,
    isLoading,
    isFetching,
    giftCreateLink,
    giftLink,
    state,
    handleSort,
  } = useGifts();

  console.log(giftsOnCompany);

  if (isLoading) return <Spinner />;
  if (!giftsOnCompany?.success)
    return <NoAccess errors={giftsOnCompany?.errors} />;

  if (giftsOnCompany && giftsOnCompany.data) {
    return (
      <div {...props} className={styles.wrapper}>
        <div className={styles.headerTitle}>
          <Htag tag='h2' className={styles.headTitle}>
            Магазин призов
          </Htag>
        </div>

        <div className={styles.header}>
          {/* <TabTitle
            setPage={setPage}
            active={active}
            setActive={setActive}
            onClickActive={undefined}
            className={styles.all}
          >
            Все
          </TabTitle>
          <TabTitle
            setPage={setPage}
            active={active}
            setActive={setActive}
            onClickActive={'FINISH'}
            className={styles.award}
          >
            Только доступные
          </TabTitle> */}

          <SortButton
            state={state}
            onClick={handleSort}
            className={styles.sort}
          >
            Сначала дешевле
          </SortButton>

          <AuthComponent minRole={'ADMIN'}>
            <div className={styles.createGift}>
              <ButtonCircleIcon
                onClick={giftCreateLink}
                classNameForIcon='@apply w-[12px] h-[12px]'
                appearance='black'
                icon='plus'
              >
                Добавить приз
              </ButtonCircleIcon>
            </div>
            <div className={styles.settings}>
              <ButtonCircleIcon
                onClick={() => toast('Настроить приз')}
                classNameForIcon='@apply w-[34px] h-[34px]'
                appearance='transparent'
                icon='settings'
              >
                Настроить
              </ButtonCircleIcon>
            </div>
          </AuthComponent>
        </div>

        {/* <FilterAwards
          state={state}
          setState={setState}
          active={active}
          setActive={setActive}
          awardsFull={awardsOnDepartment.data}
        /> */}

        <div className={styles.cards}>
          {giftsOnCompany.data.length > 0 ? (
            giftsOnCompany.data?.map((gift) => {
              return (
                <Gift key={uniqid()} layout gift={gift} className='awardCard' />
              );
            })
          ) : (
            <div>Еще нет призов</div>
          )}
        </div>

        <ButtonScrollUp />
      </div>
    );
  } else {
    return null;
  }
};

export default memo(Gifts);
