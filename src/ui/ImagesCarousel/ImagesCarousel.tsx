'use client';

import Carousel from 'react-material-ui-carousel';
import ImageDefault from '../ImageDefault/ImageDefault';
import styles from './ImagesCarousel.module.scss';
import { BaseImage } from '@/types/base/image/baseImage';
import { ImagesCarouselProps } from './ImagesCarousel.props.ts';
import cn from 'classnames';
import { memo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useWindowSize } from '@/hooks/useWindowSize';
import ModalPrevierImg from '../ModalPrevierImg/ModalPreviewImg';

const ImagesCarousel = ({
  data,
  imageNum,
  setImageNum,
  images,
  className,
  edit,
}: ImagesCarouselProps) => {
  const pathname = usePathname();
  const { windowSize } = useWindowSize();

  // Модальное окно при нажатии на изображение
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [srcImg, setSrcImg] = useState<string | undefined>(undefined);

  if (edit == true) {
    return (
      <>
        {data && setImageNum && data.length > 0 ? (
          <>
            <Carousel
              navButtonsAlwaysInvisible={
                pathname.split('/')[1] == 'award' ? true : false
              }
              className='width-[100%]'
              IndicatorIcon={
                pathname.split('/')[1] == 'award' ? null : undefined
              }
              swipe={true}
              index={imageNum}
              changeOnFirstRender={true}
              onChange={(now?: number, previous?: number) => {
                now && setImageNum(now);
              }}
              height={windowSize.winWidth < 1280 ? 250 : 400}
              autoPlay={false}
              indicatorContainerProps={{
                style: {
                  marginTop: '0px', //
                },
              }}
            >
              {images?.map((item: BaseImage) => {
                return (
                  <ImageDefault
                    onClick={() => {
                      setSrcImg(item.imageUrl);
                      setOpenModalConfirm(true);
                    }}
                    key={item.id}
                    src={item.imageUrl}
                    width={400}
                    height={400}
                    alt='preview image'
                    forWhat='user'
                  />
                );
              })}
            </Carousel>
            <ModalPrevierImg
              srcImg={srcImg}
              openModalConfirm={openModalConfirm}
              setOpenModalConfirm={setOpenModalConfirm}
            />
          </>
        ) : (
          <div className={styles.imageDefault}>
            <ImageDefault
              src={undefined}
              width={400}
              height={400}
              alt='preview image'
              forWhat='user'
              // objectFit='cover'
            />
          </div>
        )}
      </>
    );
  } else {
    return (
      <div>
        {data.length > 0 ? (
          <Carousel
            navButtonsAlwaysInvisible={data.length == 1 ? true : false}
            IndicatorIcon={data.length == 1 ? null : undefined}
            className={cn(styles.carousel, className)}
            swipe={true}
            autoPlay={true}
            indicatorContainerProps={{
              style: {
                marginTop: '0px',
              },
            }}
          >
            {data?.map((item: BaseImage) => {
              return (
                <ImageDefault
                  key={item.id}
                  src={item.imageUrl}
                  width={400}
                  height={400}
                  alt='preview image'
                  className={styles.imageCard}
                  forWhat='user'
                  // priority={true}
                />
              );
            })}
          </Carousel>
        ) : (
          <div className={styles.imageDefault}>
            <ImageDefault
              src={undefined}
              width={250}
              height={250}
              alt='preview image'
              className='@apply w-[250px] h-[250px]'
              forWhat='user'
            />
          </div>
        )}
      </div>
    );
  }
};

export default memo(ImagesCarousel);
