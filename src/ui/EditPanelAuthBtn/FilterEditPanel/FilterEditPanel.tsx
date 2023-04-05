import styles from './FilterEditPanel.module.scss';
import cn from 'classnames';
import { FilterEditPanelProps } from './FilterEditPanel.props';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import P from '../../P/P';
import { ForwardedRef, forwardRef } from 'react';

const FilterEditPanel = forwardRef(
  (
    {
      getUrl,
      id,
      // deleteAsync,
      children,
      visible,
      setVisible,
      className,
      onlyRemove,
      ...props
    }: FilterEditPanelProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const { push } = useRouter();

    const deleteAsync = (id: string) => {};

    const variants = {
      visible: {
        opacity: 1,
        y: 0,
      },
      hidden: {
        opacity: 0,
        y: '460px',
      },
      exit: {
        opacity: 0,
        y: '460px',
      },
    };

    if (onlyRemove) {
      return (
        <motion.div
          animate={visible ? 'visible' : 'hidden'}
          variants={variants}
          initial='hidden'
          exit='exit'
          transition={{ duration: 0.4 }}
          className={cn(
            styles.editPanel,
            styles.editPanelOnlyRemove,
            className
          )}
          ref={ref}
          {...props}
        >
          <div className={styles.slash} onClick={() => setVisible(false)} />
          <div className={styles.filterContent}>
            {id && (
              <P
                size='xs'
                fontstyle='thin'
                onClick={() => deleteAsync(id)}
                className={styles.item}
              >
                Удалить
              </P>
            )}
          </div>
        </motion.div>
      );
    } else {
      return (
        <motion.div
          animate={visible ? 'visible' : 'hidden'}
          variants={variants}
          initial='hidden'
          exit='exit'
          transition={{ duration: 0.4 }}
          className={cn(styles.editPanel, className)}
          ref={ref}
          {...props}
        >
          <div className={styles.slash} onClick={() => setVisible(false)} />
          <div className={styles.filterContent}>
            {getUrl && (
              <P
                size='xs'
                fontstyle='thin'
                onClick={() => push(getUrl(`/${id}`))}
                className={styles.item}
              >
                Редактировать
              </P>
            )}
            {id && (
              <P
                size='xs'
                fontstyle='thin'
                onClick={() => deleteAsync(id)}
                className={styles.item}
              >
                Удалить
              </P>
            )}
          </div>
        </motion.div>
      );
    }
  }
);

FilterEditPanel.displayName = 'FilterEditPanel';
export default FilterEditPanel;
