import styles from './AwardPreview.module.scss';
import cn from 'classnames';
import { AwardPreviewProps } from './AwardPreview.props';
import P from '../P/P';
import ImageDefault from '../ImageDefault/ImageDefault';

const AwardPreview = ({
  award,
  children,
  className,
  ...props
}: AwardPreviewProps): JSX.Element => {
  return (
    <div className={cn(className, styles.wrapper)} {...props}>
      <ImageDefault
        src={award.mainImg}
        width={76}
        height={76}
        alt={award.name}
        objectFit='cover'
        className='rounded-full'
        // priority={true}
      />
      <div className={styles.info}>
        <P size='m' fontstyle='bold'>
          {award.name}
        </P>
      </div>
    </div>
  );
};
export default AwardPreview;
