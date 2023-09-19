import styles from './EditPanel.module.scss';
import cn from 'classnames';
import { EditPanelProps } from './EditPanel.props';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import P from '../../P/P';
import { ForwardedRef, forwardRef, memo, useState } from 'react';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { useHeader } from '@/app/_components/MainLayout/Header/useHeader';
import ModalConfirm from '@/ui/ModalConfirm/ModalConfirm';

const EditPanel = forwardRef(
  (
    {
      getUrlEdit,
      getUrlCreate,
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
    const { close } = useHeader();
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
        height: !onlyRemove ? '180px' : 'auto',
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
            text={`Вы действительно хотите удалить?`}
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
            {getUrlEdit ? (
              <P
                size='xs'
                fontstyle='thin'
                onClick={() => {
                  push(getUrlEdit(`${id}`));
                  close();
                }}
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
            <P
              size='xs'
              fontstyle='thin'
              onClick={() => {
                push(getUrlCreate(`?id=${id}`));
                close();
              }}
              className={styles.item}
            >
              Создать отдел
            </P>
          </motion.div>

          <ModalConfirm
            text={`Вы действительно хотите удалить?`}
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
export default memo(EditPanel);
