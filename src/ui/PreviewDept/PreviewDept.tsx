import styles from './PreviewDept.module.scss';
import cn from 'classnames';
import { PreviewDeptProps } from './PreviewDept.props';
import { memo, useMemo } from 'react';
import P from '../P/P';
import ImageDefault from '../ImageDefault/ImageDefault';
import { timeConverter } from '@/utils/timeConverter';

const PreviewDept = ({
  award,
  list,
  className,
  ...props
}: PreviewDeptProps): JSX.Element => {
  let convertDateCreate = useMemo(
    () => timeConverter(award?.startDate),
    [award]
  );
  let convertDateNominee = useMemo(
    () => timeConverter(award?.endDate),
    [award]
  );
  return (
    <div
      className={cn(
        styles.wrapper,
        {
          ['flex-row-reverse']: !list,
        },
        className
      )}
      {...props}
    >
      <div>
        <P size='xs' fontstyle='thin' color={list ? 'white' : 'black'}>
          {award.dept.name}
        </P>
        {!list ? (
          <P size='xs' fontstyle='thin' color={list ? 'white' : 'gray'}>
            Cоздана {convertDateCreate}
          </P>
        ) : null}
        {award.type === 'PERIOD' && (
          <P size='xs' fontstyle='thin' color={list ? 'white' : 'gray'}>
            Награждение {convertDateNominee}
          </P>
        )}
      </div>

      <ImageDefault
        src={award.dept.mainImg}
        width={165}
        height={165}
        alt={award.name}
        className={cn({
          [styles.imgList]: list,
          [styles.imgSingle]: !list,
        })}
        forWhat={award.dept.level > 2 ? 'dept' : 'company'}
      />
    </div>
  );
};
export default memo(PreviewDept);
