import styles from './PrevNextPages.module.scss';
import cn from 'classnames';
import { PrevNextPagesProps } from './PrevNextPages.props';
import ButtonEdit from '../ButtonEdit/ButtonEdit';

const PrevNextPages = ({
  startPage,
  endPage,
  handlePrevClick,
  handleNextClick,
  className,
  ...props
}: PrevNextPagesProps): JSX.Element => {
  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <ButtonEdit
        icon='next'
        className='rotate-180'
        onClick={handlePrevClick}
        disable={startPage == 1 ? true : false}
      />
      <div className={styles.pages}>
        {startPage} из {endPage}
      </div>
      <ButtonEdit
        icon='next'
        onClick={handleNextClick}
        disable={startPage == endPage ? true : false}
      />
    </div>
  );
};
export default PrevNextPages;
