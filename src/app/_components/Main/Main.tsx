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

const Main = ({ className, ...props }: MainProps): JSX.Element => {
  const {
    onBoarding,
    state,
    saveUserSettingsAsync,
    onBoardingFalse,
    onBoardingText,
    onBoardingText3,
  } = useMain();

  return (
    <>
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
        <div className='cursor-pointer' onClick={onBoardingFalse}>
          Сбросить Onboarding
        </div>
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
};

export default Main;
