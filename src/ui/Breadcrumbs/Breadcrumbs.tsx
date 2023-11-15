import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Breadcrumbs.module.scss';
import P from '../P/P';
import { checkSegments, convertString } from './utils';
import { useAppSelector } from '@/store/hooks/hooks';
import { SelectTreeDepts } from '@/store/features/treeDepts/treeDepts-selectors';
import { Dept } from '@/types/dept/dept';
import { useEffect, useState } from 'react';

function Breadcrumbs(): JSX.Element {
  const pathName = usePathname();
  let segments = pathName.split('/').filter((segment) => segment !== '');

  if (segments.length >= 2) {
    segments[1] = `${segments[0]} ${segments[1]}`;
    segments.shift();
  }

  const treeDepts = useAppSelector(SelectTreeDepts);

  //Ищем рутовый доступный отдел, чтобы поставить его первым и переходить в него, а не на главную
  // const smallestIdDept = treeDepts!.reduce((prev, curr): Dept => {
  //   if (prev.parentId && curr.parentId) {
  //     return prev.parentId < curr.parentId ? prev : curr;
  //   } else return curr;
  // });
  //________________________

  useEffect(() => {
    if (segments.length < 2) {
      document.title = localStorage.getItem('TreeName') as string;
    } else {
      let deptName = localStorage.getItem('TreeName') as string;
      document.title = `${deptName} | ${checkSegments(segments[1], null)}`;
    }
  }, []);

  const selectedCompany = localStorage.getItem('selectCompany');
  if (!selectedCompany) {
    return <div></div>;
  } else {
    return (
      <nav>
        <ol className={styles.wrapper}>
          <>
            <li className={styles.link}>
              {selectedCompany &&
              selectedCompany ==
                pathName.split('/')[2] ? null : selectedCompany ? (
                <Link href={`/department/${selectedCompany}`}>
                  {
                    treeDepts?.filter(
                      (item) => item.id === Number(selectedCompany)
                    )[0].name
                  }
                </Link>
              ) : (
                <Link
                  href={`/department/${
                    treeDepts?.filter((item) => item.level == 2)[0].id
                  }`}
                >
                  {treeDepts?.filter((item) => item.level == 2)[0].name}
                </Link>
              )}
            </li>
            {selectedCompany &&
            selectedCompany ==
              pathName.split('/')[2] ? null : selectedCompany ? (
              <P fontstyle='thin' className={styles.br}>
                /
              </P>
            ) : (
              <P fontstyle='thin' className={styles.br}>
                /
              </P>
            )}
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
                  <div className={styles.linkDefault}>
                    {checkSegments(segment, treeDepts)}
                  </div>
                ) : (
                  <div className='flex'>
                    <div className={styles.link}>
                      <Link href={href}>
                        {checkSegments(segment, treeDepts)}
                      </Link>
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
}

export default Breadcrumbs;
