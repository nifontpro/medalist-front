'use client';
import Carousel from 'react-material-ui-carousel';
import ImageDefault from '../ImageDefault/ImageDefault';
import styles from './ImagesCarousel.module.scss';
import { BaseImage } from '@/types/base/image/baseImage';
import { ImagesCarouselProps } from './ImagesCarousel.props.ts';
import cn from 'classnames';
import { memo } from 'react';

const ImagesCarousel = ({
  data,
  imageNum,
  setImageNum,
  images,
  className,
  edit,
}: ImagesCarouselProps) => {
  if (edit == true) {
    return (
      <>
        {data && setImageNum && data.length > 0 ? (
          <Carousel
            swipe={true}
            index={imageNum}
            changeOnFirstRender={true}
            onChange={(now?: number, previous?: number) => {
              now && setImageNum(now);
            }}
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
                  key={item.id}
                  src={item.imageUrl}
                  width={400}
                  height={400}
                  alt='preview image'
                  objectFit='cover'
                  // priority={true}
                  // className='rounded-[10px]'
                />
              );
            })}
          </Carousel>
        ) : (
          <div className={styles.imageDefault}>
            <ImageDefault
              src={undefined}
              width={400}
              height={400}
              alt='preview image'
              objectFit='cover'
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
            />
          </div>
        )}
      </div>
    );
  }
};

export default memo(ImagesCarousel);
