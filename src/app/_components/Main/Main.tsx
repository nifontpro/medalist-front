'use client';

import ButtonScrollUp from '@/ui/ButtonScrollUp/ButtonScrollUp';
import styles from './Main.module.scss';
import { MainProps } from './Main.props';
import cn from 'classnames';
import { useMain } from './useMain';
import MainAwards from './MainAwards/MainAwards';
import MainNominee from './MainNominee/MainNominee';
import MainUsers from './MainUsers/MainUsers';
import MainActivity from './MainActivity/MainActivity';
import OnBoarding from './OnBoarding/OnBoarding';
import { useMainLoading } from './useMainLoading';
import Spinner from '@/ui/Spinner/Spinner';
import Events from './Events/Events';
import { memo } from 'react';
import SwitchDepartOnCompany from '@/ui/SwitchDepartOnCompany/SwitchDepartOnCompany';

const Main = ({ deptId, className, ...props }: MainProps): JSX.Element => {
  const {
    onBoarding,
    state,
    saveUserSettingsAsync,
    onBoardingFalse,
    onBoardingText,
    onBoardingText3,
  } = useMain();

  const {
    isLoadingColAwardsActivRoot,
    isLoadingUsersOnDepartmentWithAwards,
    isLoadingColAwardsOnDept,
  } = useMainLoading();

  if (
    !isLoadingColAwardsActivRoot &&
    !isLoadingUsersOnDepartmentWithAwards &&
    !isLoadingColAwardsOnDept
  ) {
    return (
      <>
        {/* <SwitchDepartOnCompany /> */}
        <div {...props} className={styles.wrapper}>
          <MainAwards
            deptId={deptId}
            className={cn(styles.awards, {
              [styles.index30]: onBoarding == 1,
            })}
          />
          <MainUsers deptId={deptId} className={styles.users} />
          <div
            className={cn(styles.nominee, {
              [styles.index30]: onBoarding >= 2 && !state,
            })}
          >
            <MainNominee
              deptId={deptId}
              className={cn({
                [styles.index0]: onBoarding == 3 && !state,
              })}
            />
            <MainActivity
              deptId={deptId}
              className={cn({
                [styles.index0]: onBoarding == 2,
              })}
            />
          </div>
          <Events deptId={deptId} className={styles.events} />
          <ButtonScrollUp />
          {/* <div className='cursor-pointer' onClick={onBoardingFalse}>
          Сбросить Onboarding
        </div> */}
          <OnBoarding
            state={state}
            onBoarding={onBoarding}
            onBoardingText={onBoardingText}
            onBoardingText3={onBoardingText3}
            handleClick={saveUserSettingsAsync}
          />
        </div>
      </>
    );
  }
  return <Spinner />;
};

export default memo(Main);
