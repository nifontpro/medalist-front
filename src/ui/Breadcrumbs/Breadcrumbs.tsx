import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Breadcrumbs.module.scss';
import P from '../P/P';
import { checkSegments, convertString } from './utils';

function Breadcrumbs(): JSX.Element {
  const pathName = usePathname();
  let segments = pathName.split('/').filter((segment) => segment !== '');

  if (segments.length >= 2) {
    segments[1] = `${segments[0]} ${segments[1]}`;
    segments.shift();
  }

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
                <div className='cursor-default'>{checkSegments(segment)}</div>
              ) : (
                <div className='flex'>
                  <li className={styles.link}>
                    <Link href={href}>{checkSegments(segment)}</Link>
                  </li>
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
