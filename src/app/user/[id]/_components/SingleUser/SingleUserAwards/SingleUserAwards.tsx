import Htag from '@/ui/Htag/Htag';
import styles from './SingleUserAwards.module.scss';
import { SingleUserAwardsProps } from './SingleUserAwards.props';
import cn from 'classnames';
import uniqid from 'uniqid';
import P from '@/ui/P/P';
import CardUserAward from './CardUserAward/CardUserAward';
import ScrollContainerWithSearchParams from '@/ui/ScrollContainerWithSearchParams/ScrollContainerWithSearchParams';
import { useFetchParams } from '@/hooks/useFetchParams';
import { useAwardAdmin } from '@/api/award/useAwardAdmin';

const SingleUserAwards = ({
  user,
  id,
  className,
  ...props
}: SingleUserAwardsProps): JSX.Element => {
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

  const { singleActivAwardUser } = useAwardAdmin(id, {
    page: page,
    pageSize: 5,
    filter: searchValue,
    orders: [{ field: 'lastname', direction: state }],
  });

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.title}>
        <Htag tag='h3'>Медали</Htag>
        <P size='s' fontstyle='thin' className={styles.countAwards}>
          {singleActivAwardUser &&
            singleActivAwardUser?.data!.filter(
              (award) => award.award?.type == 'SIMPLE'
            ).length}
        </P>
      </div>
      {singleActivAwardUser &&
      singleActivAwardUser?.data!.filter(
        (award) => award.award?.type == 'SIMPLE'
      ).length > 0 ? (
        <ScrollContainerWithSearchParams
          searchHandleChange={searchHandleChange}
        >
          <div className={styles.content}>
            {singleActivAwardUser?.data!.map((award) => {
              if (award.award?.type == 'SIMPLE') {
                return (
                  <CardUserAward key={uniqid()} award={award} user={user} />
                );
              }
            })}
          </div>
        </ScrollContainerWithSearchParams>
      ) : (
        <P size='s' fontstyle='thin' className={styles.countAwards}>
          У вас пока нет медалей
        </P>
      )}
    </div>
  );
};

export default SingleUserAwards;
