import styles from './EditPanel.module.scss';
import cn from 'classnames';
import { EditPanelProps } from './EditPanel.props';
import { useParams, usePathname, useRouter } from 'next/navigation';
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
      handlereturn1,
      paycode,
      children,
      visible,
      className,
      onlyRemove,
      gift,
      ...props
    }: EditPanelProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const params = useParams();
    const pathName = usePathname();

    const { typeOfUser } = useAppSelector(
      (state: RootState) => state.userSelection
    );
    const { push, back } = useRouter();

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

    const handleDelete = () => {
      if (params.id == id) {
        if (pathName.split('/')[1] == 'department') {
          deleteAsync(Number(id));
          push(`/department/${localStorage.getItem('selectCompany')}`);
        } else {
          deleteAsync(Number(id));
          back();
        }
      } else {
        deleteAsync(Number(id));
      }
    };

    const handleReturnAdmin = () => {
      if (handlereturn1) handlereturn1(Number(id));
    };

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
                {paycode == 'PAY'
                  ? 'Выдать'
                  : paycode == 'GIVEN'
                  ? 'Принять возврат'
                  : gift
                  ? 'Отказаться от приза'
                  : 'Удалить'}
              </P>
            ) : null}
          </motion.div>

          <ModalConfirm
            title={'Требуется подтверждение!'}
            textBtn={
              paycode == 'PAY'
                ? 'Выдать'
                : paycode == 'GIVEN'
                ? 'Принять'
                : gift
                ? 'Отказаться'
                : 'Удалить'
            }
            text={`Ваше действие уже нельзя будет отменить. Вы действительно хотите ${
              paycode == 'PAY'
                ? 'Выдать'
                : paycode == 'GIVEN'
                ? 'Принять возврат'
                : gift
                ? 'Отказаться от приза'
                : 'Удалить'
            }?`}
            openModalConfirm={openModalConfirm}
            setOpenModalConfirm={setOpenModalConfirm}
            onConfirm={paycode == 'GIVEN' ? handleReturnAdmin : handleDelete}
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
                onClick={() => {
                  gift ? handlereturn1 : push(getUrlEdit(`${id}`));
                }}
                className={styles.item}
              >
                {gift ? 'Выдать' : 'Редактировать'}
              </P>
            )}
            {id ? (
              <P
                size='xs'
                fontstyle='thin'
                onClick={() => setOpenModalConfirm(true)}
                className={styles.item}
              >
                {gift ? 'Вернуть' : 'Удалить'}
              </P>
            ) : null}
          </motion.div>

          <ModalConfirm
            title={'Требуется подтверждение!'}
            textBtn={gift ? 'Вернуть' : 'Удалить'}
            text={`Ваше действие уже нельзя будет отменить. Вы действительно хотите удалить?`}
            openModalConfirm={openModalConfirm}
            setOpenModalConfirm={setOpenModalConfirm}
            onConfirm={handleDelete}
          />
        </>
      );
    }
  }
);

EditPanel.displayName = 'EditPanel';
export default EditPanel;
