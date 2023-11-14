import { PurchaseHistoryTitleProps } from './PurchaseHistoryTitle.props';
import { userApi } from '@/api/user/user.api';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import ImageDefault from '@/ui/ImageDefault/ImageDefault';
import styles from './PurchaseHistoryTitle.module.scss';
import cn from 'classnames';
import Wrapper from '@/ui/Wrapper/Wrapper';
import Htag from '@/ui/Htag/Htag';
import P from '@/ui/P/P';

const PurchaseHistoryTitle = ({ id }: PurchaseHistoryTitleProps) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  // Получить пользоветля по id
  const { data: user, isLoading: isLoadingUser } = userApi.useGetByIdQuery(
    {
      authId: typeOfUser?.id!,
      userId: Number(id),
    },
    {
      skip: !id || !typeOfUser,
    }
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.img}>
        <ImageDefault
          src={user?.data?.user.normImg ? user?.data?.user.normImg : undefined}
          width={364}
          height={364}
          alt='preview image'
          className='rounded-[16px]'
          forWhat='user'
        />
      </div>
      <Wrapper className={styles.titleContent}>
        <div className={styles.title}>
          <Htag tag='h2'>
            {user?.data?.user.firstname} {user?.data?.user.lastname}
          </Htag>
        </div>

        <div className={styles.position}>
          {user?.data?.user.dept.name ? (
            <P
              size='xs'
              fontstyle='thin'
              type='silverBtn'
              className={styles.depart}
            >
              {user?.data?.user.dept.name}
            </P>
          ) : (
            <P
              size='xs'
              fontstyle='thin'
              type='silverBtn'
              className={styles.depart}
            >
              Нет отдела
            </P>
          )}
          {user?.data?.user.post ? (
            <P
              size='xs'
              fontstyle='thin'
              type='silverBtn'
              className={styles.post}
            >
              {user?.data?.user.post}
            </P>
          ) : (
            <P
              size='xs'
              fontstyle='thin'
              type='silverBtn'
              className={styles.post}
            >
              Нет отдела
            </P>
          )}
        </div>

        {user?.data?.user?.authEmail || user?.data?.user?.phone ? (
          <div className={styles.contacts}>
            {user?.data?.user?.authEmail ? (
              <a href={`mailto:${user?.data?.user?.authEmail}`}>
                <P size='m'>{user?.data?.user?.authEmail}</P>
              </a>
            ) : null}
            {user?.data?.user?.phone ? (
              <a href={`tel:${user?.data?.user?.phone}`} className='mt-[10px]'>
                <P size='m'>{user?.data?.user?.phone}</P>
              </a>
            ) : null}
          </div>
        ) : null}
      </Wrapper>
    </div>
  );
};

export default PurchaseHistoryTitle;
