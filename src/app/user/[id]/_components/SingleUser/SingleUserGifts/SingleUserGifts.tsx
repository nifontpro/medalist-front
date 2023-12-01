import Htag from '@/ui/Htag/Htag';
import styles from './SingleUserGifts.module.scss';
import { SingleUserGiftsProps } from './SingleUserGifts.props';
import cn from 'classnames';
import uniqid from 'uniqid';
import P from '@/ui/P/P';
import { useFetchParams } from '@/hooks/useFetchParams';
import PrevNextPages from '@/ui/PrevNextPages/PrevNextPages';
import { memo, useMemo } from 'react';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { payApi } from '@/api/shop/pay/pay.api';
import CardUserGift from './CardUserGift/CardUserGift';
import { useRouter } from 'next/navigation';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';

const SingleUserGifts = ({
  user,
  id,
  className,
  ...props
}: SingleUserGiftsProps): JSX.Element => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const { push } = useRouter();

  const { page, nextPage, prevPage, state } = useFetchParams();

  const selectCompany = Number(localStorage.getItem('selectCompany'));

  const { data: gifts, isLoading: isLoadingGifts } =
    payApi.useGetByCompanyQuery(
      {
        authId: typeOfUser?.id!,
        userId: Number(id),
        deptId: selectCompany,
        payCode: 'PAY',
        isActive: true,
        baseRequest: {
          page: page,
          pageSize: 4,
          orders: [
            { field: 'dateOp', direction: state === 'ASC' ? 'DESC' : 'ASC' },
          ],
        },
      },
      {
        skip: !id || !typeOfUser,
      }
    );

  const totalPage = useMemo(() => gifts?.pageInfo?.totalPages, [gifts]);

  const totalElements = useMemo(() => gifts?.pageInfo?.totalElements, [gifts]);

  let availablePurchaseHistoryPage = false;
  if (typeOfUser?.id === Number(id)) {
    availablePurchaseHistoryPage = true;
  }
  if (typeOfUser?.roles.includes('ADMIN')) {
    availablePurchaseHistoryPage = true;
  }

  console.log(typeOfUser?.roles);

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.title}>
        <Htag tag='h3'>Призы</Htag>
        {totalElements && (
          <P size='s' fontstyle='thin' className={styles.countGifts}>
            {totalElements}
          </P>
        )}

        {availablePurchaseHistoryPage && (
          <div className={styles.titleHistory}>
            <ButtonCircleIcon
              onClick={() => push(`/user/${id}/purchaseHistory`)}
              classNameForIcon='@apply w-[18px] h-[18px]'
              appearance='black'
              icon='cup'
              className={styles.titleHistory}
            >
              История покупок
            </ButtonCircleIcon>
          </div>
        )}
      </div>

      {gifts && gifts.data && gifts.data.length > 0 ? (
        <>
          <div className={styles.content}>
            {gifts?.data &&
              gifts.data.map((gift) => {
                return <CardUserGift key={uniqid()} gift={gift} user={user} />;
              })}
          </div>

          {totalPage && totalPage > 1 ? (
            <PrevNextPages
              startPage={page + 1}
              endPage={totalPage}
              handleNextClick={() => gifts && nextPage(gifts)}
              handlePrevClick={prevPage}
            />
          ) : null}
        </>
      ) : (
        <P size='s' fontstyle='thin'>
          Пока нет призов
        </P>
      )}
    </div>
  );
};

export default memo(SingleUserGifts);
