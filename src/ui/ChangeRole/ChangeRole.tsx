import { ChangeRoleProps } from './ChangeRole.props';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import styles from './ChangeRole.module.scss';
import cn from 'classnames';
import { setIsOpen } from '@/store/features/userSelection/userSelection.slice';
import { RootState } from '@/store/storage/store';
import { useUserAdmin } from '@/api/user/useUserAdmin';
import { useHeader } from '@/app/_components/MainLayout/Header/useHeader';
import ArrowIconSvg from '@/icons/smallArrow.svg';
import { memo } from 'react';

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

  const { singleUser, isLoadingSingleUser } = useUserAdmin(
    String(typeOfUser?.id)
  );

  const { close } = useHeader();

  // if (isLoadingSingleUser) {
  //   return <div>Loading</div>;
  // }

  return (
    <>
      <div
        className={cn(styles.role, className)}
        onClick={() => {
          close();
          dispatch(setIsOpen(true));
        }}
      >
        {singleUser?.success == false
          ? `Выберете пользователя`
          : `${singleUser?.data?.user.firstname} ${singleUser?.data?.user.lastname}`}
        <ArrowIcon />
      </div>
    </>
  );
};
export default memo(ChangeRole);
