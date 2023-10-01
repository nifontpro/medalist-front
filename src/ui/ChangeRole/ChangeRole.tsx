import { ChangeRoleProps } from './ChangeRole.props';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import styles from './ChangeRole.module.scss';
import cn from 'classnames';
import { setIsOpenUserSelection } from '@/store/features/userSelection/userSelection.slice';
import { RootState } from '@/store/storage/store';
import { useHeader } from '@/app/_components/MainLayout/Header/useHeader';
import ArrowIconSvg from '@/icons/smallArrow.svg';
import { memo } from 'react';
import { userApi } from '@/api/user/user.api';

//Для мемоизации svg icon
const ArrowIcon = memo(() => {
  return <ArrowIconSvg className={styles.arrow} />;
});
ArrowIcon.displayName = 'ArrowIcon';
//__________________

const ChangeRole = ({ className }: ChangeRoleProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  // Получить пользоветля по id
  const { data: singleUser, isLoading: isLoadingSingleUser } =
    userApi.useGetByIdQuery(
      {
        authId: typeOfUser?.id!,
        userId: Number(typeOfUser?.id),
      },
      {
        skip: !typeOfUser,
      }
    );

  const { close } = useHeader();

  // if (isLoadingSingleUser) {
  //   return <div>Loading</div>;
  // }

  let firstname = singleUser?.data?.user.firstname;
  let lastname = singleUser?.data?.user.lastname;

  return (
    <>
      <div
        className={cn(styles.role, className)}
        onClick={() => {
          close();
          dispatch(setIsOpenUserSelection(true));
        }}
      >
        {singleUser?.success == false
          ? `Выберете пользователя`
          : `${firstname ? firstname : ''} ${lastname ? lastname : ''}`}
        {firstname && lastname ? <ArrowIcon /> : null}
      </div>
    </>
  );
};
export default memo(ChangeRole);
