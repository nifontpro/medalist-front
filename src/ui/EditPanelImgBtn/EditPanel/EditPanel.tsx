import styles from './EditPanel.module.scss';
import cn from 'classnames';
import { EditPanelProps } from './EditPanel.props';
import { motion } from 'framer-motion';
import P from '../../P/P';
import { ForwardedRef, forwardRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { setVisible } from '@/store/features/visibleModalWindowGalleryAwards/visibleModalWindowGalleryAwards.slice';
import InputPhotoAdd from '@/ui/InputPhotoAdd/InputPhotoAdd';

const EditPanel = forwardRef(
  (
    {
      children,
      visible,
      className,
      gallery,
      onChange,
      ...props
    }: EditPanelProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const { typeOfUser } = useAppSelector(
      (state: RootState) => state.userSelection
    );
    const dispatch = useAppDispatch();

    const option = {
      state: {
        id: '1',
      },
    };

    const variants = {
      visible: {
        opacity: 1,
        height: gallery === 'true' ? '120px' : '80px',
        padding: '20px',
      },
      hidden: {
        opacity: 0,
        height: 0,
        padding: 0,
      },
    };

    if (gallery === 'false') {
      return (
        <motion.div
          animate={visible ? 'visible' : 'hidden'}
          variants={variants}
          initial='hidden'
          transition={{ duration: 0.2 }}
          className={cn(styles.editPanel, className)}
          ref={ref}
          {...props}
        >
          <InputPhotoAdd onChange={onChange} />
        </motion.div>
      );
    } else {
      return (
        <motion.div
          animate={visible ? 'visible' : 'hidden'}
          variants={variants}
          initial='hidden'
          transition={{ duration: 0.2 }}
          className={cn(styles.editPanel, className)}
          ref={ref}
          {...props}
        >
          <InputPhotoAdd onChange={onChange} />
          <P
            size='xs'
            fontstyle='thin'
            onClick={() => dispatch(setVisible(true))}
            className={styles.item}
          >
            Выбрать в галлереи
          </P>
        </motion.div>
      );
    }
  }
);

EditPanel.displayName = 'EditPanel';
export default EditPanel;
