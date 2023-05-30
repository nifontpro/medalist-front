'use client';

import ButtonScrollUp from '@/ui/ButtonScrollUp/ButtonScrollUp';
import styles from './Main.module.scss';
import { MainProps } from './Main.props';
import cn from 'classnames';
import { useMain } from './useMain';
import MainAwards from './MainAwards/MainAwards';
import { useAwardAdmin } from '@/app/award/useAwardAdmin';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import MainNominee from './MainNominee/MainNominee';
import MainUsers from './MainUsers/MainUsers';
import MainActivity from './MainActivity/MainActivity';

const Main = ({ className, ...props }: MainProps): JSX.Element => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const { colAwardsActivOnDepartment, isLoadingColAwardsActivOnDepartment } =
    useAwardAdmin(typeOfUser?.dept.id, { subdepts: true });

  const { onBoarding, state } = useMain();

  return (
    <div {...props} className={styles.wrapper}>
      <MainAwards
        className={cn(styles.awards, {
          [styles.index30]: onBoarding == 1,
        })}
      />
      <MainUsers className={styles.users} />
      <div
        className={cn(styles.nominee, {
          [styles.index30]: onBoarding >= 2 && !state,
        })}
      >
        <MainNominee
          className={cn({
            [styles.index0]: onBoarding == 3 && !state,
          })}
        />
        <MainActivity
          className={cn({
            [styles.index0]: onBoarding == 2,
          })}
        />
      </div>
      <ButtonScrollUp />
      {/* <OnBoarding
        state={state}
        onBoarding={onBoarding}
        onBoardingText={onBoardingText}
        onBoardingText3={onBoardingText3}
        handleClick={handleClick}
      /> */}
    </div>
  );
};

export default Main;
