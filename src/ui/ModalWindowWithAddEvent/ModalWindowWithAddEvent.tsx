import styles from './ModalWindowWithAddEvent.module.scss';
import { ModalWindowWithAddEventProps } from './ModalWindowWithAddEvent.props';
import cn from 'classnames';
import ExitIconSvg from '@/icons/close.svg';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef, 
  memo,
  useCallback,
  useState,
} from 'react';
import { useModalWindowWithAddEvent } from './useModalWindowWithAddEvent';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { useWindowSize } from '@/hooks/useWindowSize';
import Htag from '@/ui/Htag/Htag';
import Button from '@/ui/Button/Button';
import SpinnerFetching from '@/ui/SpinnerFetching/SpinnerFetching';
import { AddUserEventRequest } from '@/api/event/request/AddUserEventRequest';
import Field from '../Field/Field';
import SelectCalendar from '../SelectCalendar/SelectCalendar';
import dayjs from 'dayjs';
import { convertCorrectDataForUnix } from '@/utils/convertCorrectDataForUnix';
import { AddDeptEventRequest } from '@/api/event/request/AddDeptEventRequest';
import { useForm } from 'react-hook-form';

const ModalWindowWithAddEvent = forwardRef(
  (
    {
      textBtn,
      visibleModal,
      setVisibleModal,
      forWhat,
      id,
      className,
      ...props
    }: ModalWindowWithAddEventProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const {
      handleSubmit,
      register,
      formState: { errors, isDirty, isValid },
    } = useForm<AddUserEventRequest | AddDeptEventRequest>({
      mode: 'onChange',
    });

    const [date, setData] = useState<number>();

    const onChangeDate = useCallback((value: string | null) => {
      setData(
        dayjs(
          dayjs(convertCorrectDataForUnix(dayjs(value).format('DD.MM.YYYY')))
        ).unix() * 1000
      );
    }, []);

    const { onSubmit, handleCancel, createDeptEventInfo, createUserEventInfo } =
      useModalWindowWithAddEvent(setVisibleModal, forWhat, id, date);

    const { windowSize } = useWindowSize();

    const variants = {
      visible: {
        opacity: 1,
      },
      hidden: {
        opacity: 0,
      },
      exit: {
        opacity: 0,
      },
    };

    const variantsMedia = {
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

    const handleDrag = useCallback(
      (
        event: globalThis.MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
      ) => {
        if (info.offset.y > 100 && info.offset.y < 1000) {
          setVisibleModal(false);
        }
      },
      [setVisibleModal]
    );

    return (
      <>
        <AnimatePresence mode='wait'>
          {visibleModal && (
            <motion.div
              initial='hidden'
              animate='visible'
              exit='exit'
              variants={windowSize.winWidth <= 768 ? variantsMedia : variants}
              transition={{ duration: 0.4 }}
              className={cn(styles.modalWindow, className)}
              drag={windowSize.winWidth < 768 ? 'y' : undefined}
              onDragEnd={(event, info) => handleDrag(event, info)}
              dragSnapToOrigin={true}
              {...props}
            >
              <div className={styles.slash} onClick={handleCancel} />
              <div className={styles.module} ref={ref}>
                <ExitIcon onClick={handleCancel} />
                <Htag tag='h2' className={styles.title}>
                  Создать событие
                </Htag>

                <form>
                  <Field
                    {...register('eventName', {
                      required: 'Название!',
                    })}
                    title='Название события'
                    placeholder='Введите название'
                    error={errors.eventName}
                    className={styles.field}
                  />
                  <SelectCalendar
                    handleChangeDate={onChangeDate}
                    title='Дата события'
                    error={errors.eventDate}
                    className={styles.field}
                  />
                </form>

                <div className={styles.buttons}>
                  <Button
                    onClick={handleCancel}
                    appearance='whiteBlack'
                    size='l'
                    className={styles.cancel}
                  >
                    Отменить
                  </Button>
                  <Button
                    onClick={handleSubmit(onSubmit)}
                    appearance='blackWhite'
                    size='l'
                    className={styles.confirm}
                    disabled={!isDirty || !isValid || !date}
                  >
                    {textBtn}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {createDeptEventInfo.status == 'pending' ||
        createUserEventInfo.status == 'pending' ? (
          <SpinnerFetching />
        ) : null}
      </>
    );
  }
);

ModalWindowWithAddEvent.displayName = 'ModalWindowWithAddEvent';
export default memo(ModalWindowWithAddEvent);

//Для мемоизации svg icon
const ExitIcon = memo(
  ({
    ...props
  }: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >): JSX.Element => {
    return <ExitIconSvg className={styles.exit} {...props} />;
  }
);
ExitIcon.displayName = 'ExitIcon';
//__________________
