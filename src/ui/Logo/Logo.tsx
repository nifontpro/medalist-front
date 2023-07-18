import { LogoProps } from './Logo.props';
import Link from 'next/link';
import LogoIcon from '@/icons/logo.svg';
import { memo } from 'react';

const Logo = ({ className }: LogoProps): JSX.Element => {
  return (
    <Link href='/' className={className}>
      <LogoIcon className='w-[200px]' />
    </Link>
  );
};
export default memo(Logo);
