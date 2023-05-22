import { LogoProps } from './Logo.props';
import Link from 'next/link';
import { setSelectedTreeId } from '@/store/features/sidebar/sidebarTree.slice';
import { useAppDispatch } from '@/store/hooks/hooks';
import LogoIcon from '@/icons/logo.svg';

const Logo = ({ className }: LogoProps): JSX.Element => {
  const dispatch = useAppDispatch();
  return (
    <Link
      href='/'
      className={className}
      onClick={() => dispatch(setSelectedTreeId('0'))}
    >
      <LogoIcon className='w-[200px]' />
    </Link>
  );
};
export default Logo;
