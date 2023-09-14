import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Breadcrumbs.module.scss';
import P from '../P/P';
import { checkSegments, convertString } from './utils';
import { useAppSelector } from '@/store/hooks/hooks';
import { SelectTreeDepts } from '@/store/features/treeDepts/treeDepts-selectors';

function Breadcrumbs(): JSX.Element {
  document.title = localStorage.getItem('TreeName') as string;
  const pathName = usePathname();
  let segments = pathName.split('/').filter((segment) => segment !== '');

  if (segments.length >= 2) {
    segments[1] = `${segments[0]} ${segments[1]}`;
    segments.shift();
  }

  const treeDepts = useAppSelector(SelectTreeDepts);

  return (
    <nav>
      <ol className={styles.wrapper}>
        <>
          <li className={styles.link}>
            <Link href='/'>Главная</Link>
          </li>
          <P fontstyle='thin' className={styles.br}>
            /
          </P>
        </>

        {segments.map((segment, index) => {
          let href = '';

          if (index === 0) {
            href = convertString(segment);
          } else {
            href = `/${segments.slice(0, index + 1).join('/')}`;
          }

          const isLast = index === segments.length - 1;

          return (
            <li key={segment}>
              {isLast ? (
                <div className='cursor-default'>
                  {checkSegments(segment, treeDepts)}
                </div>
              ) : (
                <div className='flex'>
                  <div className={styles.link}>
                    <Link href={href}>{checkSegments(segment, treeDepts)}</Link>
                  </div>
                  <P fontstyle='thin' className={styles.br}>
                    /
                  </P>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
