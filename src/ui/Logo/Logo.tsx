import { LogoProps } from './Logo.props';
import Link from 'next/link';
import LogoIcon from '@/icons/logo.svg';
import { memo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { setSelectedTreeId } from '@/store/features/sidebar/sidebarTree.slice';
import { RootState } from '@/store/storage/store';

const Logo = ({ className }: LogoProps): JSX.Element => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const dispatch = useAppDispatch();

  return (
    <Link
      href={`department/${typeOfUser?.dept.id}`}
      className={className}
      onClick={() => dispatch(setSelectedTreeId(''))}
    >
      <LogoIcon className='w-[200px]' />
    </Link>
  );
};
export default memo(Logo);
