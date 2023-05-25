import styles from './ModalWindowGalleryAwards.module.scss';
import cn from 'classnames';
import ExitIcon from '@/icons/close.svg';
import { ForwardedRef, forwardRef, MouseEvent } from 'react';
import { ModalWindowGalleryAwardsProps } from './ModalWindowGalleryAwards.props';
import ChoiceItemImg from './ChoiceItemImg/ChoiceItemImg';
import { useModalWindowGalleryAwards } from './useModalWindowGalleryAwards';
import Select, { OnChangeValue } from 'react-select';
import makeAnimated from 'react-select/animated';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { useWindowSize } from '@/hooks/useWindowSize';
import { IOption } from '@/ui/SelectArtem/SelectArtem.interface';
import Htag from '@/ui/Htag/Htag';
import Button from '@/ui/Button/Button';
import { setVisible } from '@/store/features/visibleModalWindowGalleryAwards/visibleModalWindowGalleryAwards.slice';
import Spinner from '@/ui/Spinner/Spinner';
const animatedComponents = makeAnimated();

const ModalWindowGalleryAwards = forwardRef(
  (
    {
      img,
      setImg,
      textBtn,
      create,
      className,
      ...props
    }: ModalWindowGalleryAwardsProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const {
      awardsGallery,
      imagesPreview,
      setImagesPreview,
      onSubmit,
      folders,
      setIdFolder,
      dispatch,
      visibleModal,
      isAwardsGalleryLoading,
    } = useModalWindowGalleryAwards(create, setImg);

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

    let arrFolders: IOption[] = [];
    folders &&
      folders.data?.forEach((item) => {
        arrFolders.push({
          label: item.name,
          value: item.id.toString(),
        });
      });

    const onChange = (newValue: unknown | OnChangeValue<IOption, boolean>) => {
      setIdFolder(Number((newValue as IOption).value));
    };

    const handleCancel = (
      e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    ) => {
      e.preventDefault();
      dispatch(setVisible(false));
    };
    const handleDrag = (
      event: globalThis.MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ) => {
      if (info.offset.y > 100 && info.offset.y < 1000) {
        dispatch(setVisible(false));
      }
    };

    return (
      <AnimatePresence mode='wait'>
        {visibleModal && (
          <motion.div
            className={styles.modalWindow}
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={windowSize.winWidth > 768 ? variants : variantsMedia}
            transition={{ duration: 0.4 }}
            drag={windowSize.winWidth < 768 ? 'y' : undefined}
            onDragEnd={(event, info) => handleDrag(event, info)}
            dragSnapToOrigin={true}
          >
            <div
              className={styles.slash}
              onClick={() => dispatch(setVisible(false))}
            />
            <div className={styles.module} ref={ref}>
              <ExitIcon
                onClick={() => dispatch(setVisible(false))}
                className={styles.exit}
              />
              <Htag tag='h2' className={styles.title}>
                Выберите медаль
              </Htag>

              <Select
                classNamePrefix='custom-select-rating'
                placeholder={'Выберите папку с изображениями'}
                options={arrFolders}
                onChange={onChange}
                components={animatedComponents}
              />

              {
                <div className={cn(styles.wrapperChoiceImg)}>
                  {awardsGallery &&
                    awardsGallery.data?.map((item) => {
                      return (
                        <ChoiceItemImg
                          itemImg={item}
                          key={item.id}
                          imagesPreview={imagesPreview}
                          setImagesPreview={setImagesPreview}
                        />
                      );
                    })}
                  {isAwardsGalleryLoading && <Spinner />}
                </div>
              }

              <div className={styles.buttons}>
                <Button
                  onClick={(e) => handleCancel(e)}
                  appearance='whiteBlack'
                  size='l'
                  className={styles.cancelBtn}
                >
                  Отменить
                </Button>
                <Button
                  onClick={(e) => onSubmit(e)}
                  appearance='blackWhite'
                  size='l'
                  className={styles.confirmBtn}
                >
                  {textBtn}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

ModalWindowGalleryAwards.displayName = 'ModalWindowGalleryAwards';
export default ModalWindowGalleryAwards;
