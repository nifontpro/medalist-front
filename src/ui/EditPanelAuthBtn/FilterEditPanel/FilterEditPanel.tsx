import styles from './FilterEditPanel.module.scss';
import cn from 'classnames';
import { FilterEditPanelProps } from './FilterEditPanel.props';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import P from '../../P/P';
import { ForwardedRef, forwardRef, useState } from 'react';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import ModalConfirm from '@/ui/ModalConfirm/ModalConfirm';

const FilterEditPanel = forwardRef(
  (
    {
      deleteAsync,
      getUrlEdit,
      id,
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

    const { typeOfUser } = useAppSelector(
      (state: RootState) => state.userSelection
    );

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

    const [openModalConfirm, setOpenModalConfirm] = useState(false);

    if (onlyRemove) {
      return (
        <>
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
              {id ? (
                <P
                  size='xs'
                  fontstyle='thin'
                  onClick={() => setOpenModalConfirm(true)}
                  className={styles.item}
                >
                  Удалить
                </P>
              ) : null}
            </div>
          </motion.div>

          <ModalConfirm
            title={'Требуется подтверждение!'}
            textBtn={'Удалить'}
            text={`Ваше действие уже нельзя будет отменить. Вы действительно хотите удалить ?`}
            openModalConfirm={openModalConfirm}
            setOpenModalConfirm={setOpenModalConfirm}
            onConfirm={() =>
              typeOfUser && typeOfUser.id && deleteAsync(Number(id))
            }
          />
        </>
      );
    } else {
      return (
        <>
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
              {getUrlEdit ? (
                <P
                  size='xs'
                  fontstyle='thin'
                  onClick={() => push(getUrlEdit(`${id}`))}
                  className={styles.item}
                >
                  Редактировать
                </P>
              ) : null}
              {id ? (
                <P
                  size='xs'
                  fontstyle='thin'
                  onClick={() => setOpenModalConfirm(true)}
                  className={styles.item}
                >
                  Удалить
                </P>
              ) : null}
            </div>
          </motion.div>

          <ModalConfirm
            title={'Требуется подтверждение!'}
            textBtn={'Удалить'}
            text={`Ваше действие уже нельзя будет отменить. Вы действительно хотите удалить ?`}
            openModalConfirm={openModalConfirm}
            setOpenModalConfirm={setOpenModalConfirm}
            onConfirm={() =>
              typeOfUser && typeOfUser.id && deleteAsync(Number(id))
            }
          />
        </>
      );
    }
  }
);

FilterEditPanel.displayName = 'FilterEditPanel';
export default FilterEditPanel;
