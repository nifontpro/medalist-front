import styles from './FilterEditPanel.module.scss';
import cn from 'classnames';
import { FilterEditPanelProps } from './FilterEditPanel.props';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import P from '../../P/P';
import { ForwardedRef, forwardRef } from 'react';
import InputPhotoAdd from '@/ui/InputPhotoAdd/InputPhotoAdd';

const FilterEditPanel = forwardRef(
  (
    {
      children,
      visible,
      setVisible,
      className,
      gallery,
      onChange,
      ...props
    }: FilterEditPanelProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
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

    if (gallery === 'false') {
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
            <InputPhotoAdd onChange={onChange} />
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
            <InputPhotoAdd onChange={onChange} />
            <P size='xs' fontstyle='thin' className={styles.item}>
              Выбрать в галлереи
            </P>
          </div>
        </motion.div>
      );
    }
  }
);

FilterEditPanel.displayName = 'FilterEditPanel';
export default FilterEditPanel;
