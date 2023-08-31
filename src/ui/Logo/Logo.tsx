import { LogoProps } from './Logo.props';
import Link from 'next/link';
import LogoIcon from '@/icons/logo.svg';
import { memo } from 'react';
import { useAppDispatch } from '@/store/hooks/hooks';
import { setSelectedTreeId } from '@/store/features/sidebar/sidebarTree.slice';

const Logo = ({ className }: LogoProps): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <Link
      href='/'
      className={className}
      onClick={() => dispatch(setSelectedTreeId(''))}
    >
      <LogoIcon className='w-[200px]' />
    </Link>
  );
};
export default memo(Logo);
