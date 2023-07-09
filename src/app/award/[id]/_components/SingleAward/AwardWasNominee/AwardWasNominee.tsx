import Htag from '@/ui/Htag/Htag';
import styles from './AwardWasNominee.module.scss';
import { AwardWasNomineeProps } from './AwardWasNominee.props';
import cn from 'classnames';
import uniqid from 'uniqid';
import P from '@/ui/P/P';
import CardUserNominee from './CardUserNominee/CardUserNominee';
import ScrollContainerWithSearchParams from '@/ui/ScrollContainerWithSearchParams/ScrollContainerWithSearchParams';
import { useFetchParams } from '@/hooks/useFetchParams';
import { useAwardAdmin } from '@/api/award/useAwardAdmin';

const AwardWasNominee = ({
  award,
  id,
  className,
  ...props
}: AwardWasNomineeProps): JSX.Element => {
  const {
    page,
    setPage,
    searchValue,
    setSearchValue,
    searchHandleChange,
    state,
    setState,
    nextPage,
    prevPage,
  } = useFetchParams();

  const { singleActivAward, isLoadingSingleActivAward } = useAwardAdmin(id, {
    page: page,
    pageSize: 5,
    filter: searchValue,
    orders: [{ field: 'lastname', direction: state }],
  });

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Htag tag='h3'>Были номинированы </Htag>
          <P className={styles.rewardedLength}>
            {
              singleActivAward?.data!.filter(
                (user) => user.actionType == 'NOMINEE'
              ).length
            }
          </P>
        </div>
        {singleActivAward &&
        singleActivAward.data!.findIndex(
          (item) => item.actionType === 'NOMINEE'
        ) >= 0 ? (
          <ScrollContainerWithSearchParams
            search={true}
            searchHandleChange={searchHandleChange}
          >
            <div className={styles.usersAwarded}>
              {singleActivAward?.data!.map((item) => {
                if (item.actionType === 'NOMINEE') {
                  return (
                    <CardUserNominee award={award} user={item} key={uniqid()} />
                  );
                }
              })}
            </div>
          </ScrollContainerWithSearchParams>
        ) : (
          <P className={styles.none} fontstyle='thin' size='m'>
            Нет номинантов
          </P>
        )}
      </div>
    </div>
  );
};

export default AwardWasNominee;
