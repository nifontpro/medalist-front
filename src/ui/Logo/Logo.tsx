import { LogoProps } from './Logo.props';
import LogoIcon from '@/icons/logo.svg';
import { memo } from 'react';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import cn from 'classnames';

const Logo = ({ className }: LogoProps): JSX.Element => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  return (
    // <Link
    //   href={`department/${typeOfUser?.dept.id}`}
    //   className={className}
    //   onClick={() => dispatch(setSelectedTreeId(''))}
    // >
    <LogoIcon className={cn('@apply w-[200px]', className)} />
    // </Link>
  );
};
export default memo(Logo);
