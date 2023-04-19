import styles from './EditPanel.module.scss';
import cn from 'classnames';
import { EditPanelProps } from './EditPanel.props';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import P from '../../P/P';
import { ForwardedRef, forwardRef } from 'react';

const EditPanel = forwardRef(
  (
    {
      getUrlEdit,
      getUrlCreate,
      id,
      // deleteAsync,
      children,
      visible,
      className,
      onlyRemove,
      ...props
    }: EditPanelProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const { push } = useRouter();

    const option = {
      state: {
        id: '1',
      },
    };

    const deleteAsync = (id: string) => {};

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

    if (onlyRemove) {
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
          {getUrlEdit && (
            <P
              size='xs'
              fontstyle='thin'
              onClick={() => push(getUrlEdit(`/${id}`))}
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
          <P
            size='xs'
            fontstyle='thin'
            onClick={() => push(getUrlCreate(`?id=${id}`))}
            className={styles.item}
          >
            Создать отдел
          </P>
          {/* <P
            size='xs'
            fontstyle='thin'
            // onClick={() => deleteAsync(id)}
            className={styles.item}
          >
            Добавть сотрудника
          </P> */}
        </motion.div>
      );
    }
  }
);

EditPanel.displayName = 'EditPanel';
export default EditPanel;
