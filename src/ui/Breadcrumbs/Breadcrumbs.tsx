import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Breadcrumbs.module.scss';
import P from '../P/P';
import { checkSegments, convertString } from './utils';
import { useAppSelector } from '@/store/hooks/hooks';
import { SelectTreeDepts } from '@/store/features/treeDepts/treeDepts-selectors';
import { Dept } from '@/types/dept/dept';
import { useEffect } from 'react';

function Breadcrumbs(): JSX.Element {
  const pathName = usePathname();
  let segments = pathName.split('/').filter((segment) => segment !== '');

  if (segments.length >= 2) {
    segments[1] = `${segments[0]} ${segments[1]}`;
    segments.shift();
  }

  const treeDepts = useAppSelector(SelectTreeDepts);

  //Ищем рутовый доступный отдел, чтобы поставить его первым и переходить в него, а не на главную
  const smallestIdDept = treeDepts!.reduce((prev, curr): Dept => {
    if (prev.parentId && curr.parentId) {
      return prev.parentId < curr.parentId ? prev : curr;
    } else return curr;
  });
  //________________________

  useEffect(() => {
    if (segments.length < 2) {
      document.title = localStorage.getItem('TreeName') as string;
    } else {
      let deptName = localStorage.getItem('TreeName') as string;
      document.title = `${deptName} | ${checkSegments(segments[1], null)}`;
    }
  }, []);

  return (
    <nav>
      <ol className={styles.wrapper}>
        <>
          <li className={styles.link}>
            <Link href={`/department/${smallestIdDept.id}`}>
              {smallestIdDept.name}
            </Link>
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
