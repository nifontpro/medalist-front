import styles from './EditPanel.module.scss';
import cn from 'classnames';
import { EditPanelProps } from './EditPanel.props';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import P from '../../P/P';
import { ForwardedRef, forwardRef, useState } from 'react';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import ModalConfirm from '@/ui/ModalConfirm/ModalConfirm';

const EditPanel = forwardRef(
  (
    {
      getUrlEdit,
      id,
      deleteAsync,
      children,
      visible,
      className,
      onlyRemove,
      ...props
    }: EditPanelProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const { typeOfUser } = useAppSelector(
      (state: RootState) => state.userSelection
    );
    const { push } = useRouter();

    const option = {
      state: {
        id: '1',
      },
    };

    const variants = {
      visible: {
        opacity: 1,
        height: !onlyRemove ? '129.9px' : 'auto',
        padding: '20px',
      },
      hidden: {
        opacity: 0,
        height: 0,
        padding: 0,
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
            transition={{ duration: 0.2 }}
            className={cn(styles.editPanel, className)}
            ref={ref}
            {...props}
          >
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
          </motion.div>

          <ModalConfirm
            title={'Требуется подтверждение!'}
            textBtn={'Удалить'}
            text={`Ваше действие уже нельзя будет отменить. Вы действительно хотите удалить?`}
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
            transition={{ duration: 0.2 }}
            className={cn(styles.editPanel, className)}
            ref={ref}
            {...props}
          >
            {getUrlEdit && (
              <P
                size='xs'
                fontstyle='thin'
                onClick={() => push(getUrlEdit(`${id}`))}
                className={styles.item}
              >
                Редактировать
              </P>
            )}
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
          </motion.div>

          <ModalConfirm
            title={'Требуется подтверждение!'}
            textBtn={'Удалить'}
            text={`Ваше действие уже нельзя будет отменить. Вы действительно хотите удалить?`}
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

EditPanel.displayName = 'EditPanel';
export default EditPanel;
