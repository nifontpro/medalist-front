'use client';

// import Carousel from 'react-material-ui-carousel';
import ImageDefault from '../ImageDefault/ImageDefault';
import styles from './ImagesCarousel.module.scss';
import { BaseImage } from '@/types/base/image/baseImage';
import { ImagesCarouselProps } from './ImagesCarousel.props.ts';
import cn from 'classnames';
import { memo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useWindowSize } from '@/hooks/useWindowSize';
import ModalPrevierImg from '../ModalPrevierImg/ModalPreviewImg';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

const ImagesCarousel = ({
  data,
  imageNum,
  setImageNum,
  images,
  className,
  forWhat,
  edit,
  forSecondImg = false,
}: ImagesCarouselProps) => {
  const pathname = usePathname();
  const { windowSize } = useWindowSize();

  // Модальное окно при нажатии на изображение
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [srcImg, setSrcImg] = useState<string | undefined>(undefined);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (images && setImageNum) {
      const { clientX, currentTarget } = event;

      const rect = currentTarget.getBoundingClientRect();
      const xPos = clientX - rect.left; // x position within the element
      const widthPortion = rect.width / images.length; // поделите на количество слайдов

      const slideIndex = Math.min(
        Math.floor(xPos / widthPortion),
        images.length - 1
      );
      setImageNum(slideIndex);
    }
  };

  if (edit == true) {
    return (
      <>
        {data && setImageNum && data.length > 0 ? (
          <>
            <div onMouseMove={handleMouseMove}>
              <Carousel
                selectedItem={imageNum}
                swipeable={true}
                showStatus={false}
                showThumbs={false}
                showIndicators={pathname.split('/')[1] !== 'award'}
                useKeyboardArrows={true}
                emulateTouch={true}
                showArrows={false}
                renderIndicator={(onClickHandler, isSelected, index, label) => {
                  if (isSelected) {
                    return (
                      <li
                        className={styles.myIndicatorSelected}
                        aria-label={`Selected: ${label} ${index + 1}`}
                        // title={`Selected: ${label} ${index + 1}`} // Появляется tooltip при наведении индикатора
                      />
                    );
                  }
                  return (
                    <li
                      className={styles.myIndicator}
                      onClick={onClickHandler}
                      onKeyDown={onClickHandler}
                      value={index}
                      key={index}
                      role='button'
                      tabIndex={0}
                      // title={`${label} ${index + 1}`}
                      aria-label={`${label} ${index + 1}`}
                    />
                  );
                }}
              >
                {images?.map((item: BaseImage) => (
                  <div
                    onClick={() => {
                      setSrcImg(item.imageUrl);
                      setOpenModalConfirm(true);
                    }}
                    key={item.id}
                    className={styles.ImagesWrapper}
                  >
                    <ImageDefault
                      src={item.imageUrl}
                      alt='preview image'
                      width={400}
                      height={400}
                      className={cn({
                        [styles.imageCard]: !forSecondImg,
                        [styles.imageCardSecond]: forSecondImg,
                      })}
                      forWhat={forWhat}
                    />
                  </div>
                ))}
              </Carousel>
            </div>

            <ModalPrevierImg
              srcImg={srcImg}
              openModalConfirm={openModalConfirm}
              setOpenModalConfirm={setOpenModalConfirm}
            />
          </>
        ) : (
          <div
            className={cn({
              [styles.imageDefault]: !forSecondImg,
              [styles.imageDefaultSecond]: forSecondImg,
            })}
          >
            <ImageDefault
              src={undefined}
              width={400}
              height={400}
              alt='preview image'
              forWhat={forWhat}
            />
          </div>
        )}
      </>
    );
  } else {
    return (
      <div>
        {data.length > 0 ? (
          <div onMouseMove={handleMouseMove}>
            <Carousel
              selectedItem={imageNum}
              swipeable={true}
              showStatus={false}
              showThumbs={false}
              useKeyboardArrows={true}
              emulateTouch={true}
              showArrows={false}
              showIndicators={data.length !== 1}
              className={cn(styles.carousel, className)}
              renderIndicator={(onClickHandler, isSelected, index, label) => {
                if (isSelected) {
                  return (
                    <li
                      className={styles.myIndicatorSelected}
                      aria-label={`Selected: ${label} ${index + 1}`}
                      // title={`Selected: ${label} ${index + 1}`}
                    />
                  );
                }
                return (
                  <li
                    className={styles.myIndicator}
                    onClick={onClickHandler}
                    onKeyDown={onClickHandler}
                    value={index}
                    key={index}
                    role='button'
                    tabIndex={0}
                    // title={`${label} ${index + 1}`}
                    aria-label={`${label} ${index + 1}`}
                  />
                );
              }}
            >
              {data?.map((item: BaseImage) => (
                <div key={item.id}>
                  <ImageDefault
                    src={item.imageUrl}
                    width={400}
                    height={400}
                    alt='preview image'
                    className={styles.imageCard}
                    forWhat={forWhat}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        ) : (
          <div className={styles.imageDefault}>
            <ImageDefault
              src={undefined}
              width={400}
              height={400}
              alt='preview image'
              forWhat={forWhat}
            />
          </div>
        )}
      </div>
    );
  }
};

export default memo(ImagesCarousel);
