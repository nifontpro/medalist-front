import styles from './SingleUserNominee.module.scss';
import { SingleUserNomineeProps } from './SingleUserNominee.props';
import cn from 'classnames';
import uniqid from 'uniqid';
import CardNomineeUser from './CardNomineeUser/CardNomineeUser';
import Htag from '@/ui/Htag/Htag';
import P from '@/ui/P/P';
import { useAwardAdmin } from '@/api/award/useAwardAdmin';
import { useFetchParams } from '@/hooks/useFetchParams';
import ScrollContainerWithSearchParams from '@/ui/ScrollContainerWithSearchParams/ScrollContainerWithSearchParams';

const SingleUserNominee = ({
  user,
  id,
  className,
  ...props
}: SingleUserNomineeProps): JSX.Element => {
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
    setEndDateChange,
    setStartDateChange,
  } = useFetchParams();

  const { singleActivAwardUser } = useAwardAdmin(id, {
    page: page,
    pageSize: 5,
    filter: searchValue,
    orders: [{ field: 'award.name', direction: state }],
  });

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.title}>
        <Htag tag='h3'>Номинации</Htag>
        <P size='s' fontstyle='thin' className={styles.countAwards}>
          {singleActivAwardUser &&
            singleActivAwardUser.data!.filter(
              (award) => award.award?.type == 'PERIOD'
            ).length}
        </P>
      </div>

      <ScrollContainerWithSearchParams
        search={true}
        searchHandleChange={searchHandleChange}
        setEndDateChange={setEndDateChange}
        setStartDateChange={setStartDateChange}
        state={state}
        setState={setState}
      >
        {singleActivAwardUser &&
        singleActivAwardUser.data!.filter(
          (award) => award.award?.type == 'PERIOD'
        ).length > 0 ? (
          <div className={styles.content}>
            {singleActivAwardUser.data!.map((award) => {
              if (award.award?.type == 'PERIOD') {
                return (
                  <CardNomineeUser
                    key={uniqid()}
                    userId={user?.user.id}
                    award={award}
                  />
                );
              }
            })}
          </div>
        ) : (
          <P size='s' fontstyle='thin' className={styles.countAwards}>
            У вас пока нет номинаций
          </P>
        )}
      </ScrollContainerWithSearchParams>
    </div>
  );
};

export default SingleUserNominee;
