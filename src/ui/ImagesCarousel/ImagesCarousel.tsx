'use client';
import Carousel from 'react-material-ui-carousel';
import { ImageDefault } from '../ImageDefault/ImageDefault';
import styles from './ImagesCarousel.module.scss';
import { BaseImage } from '@/domain/model/base/image/baseImage';
import { ImagesCarouselProps } from './ImagesCarousel.props.ts';
import cn from 'classnames';

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
                  width={250}
                  height={250}
                  alt='preview image'
                  objectFit='cover'
                  // priority={true}
                  // className='rounded-[10px]'
                />
              );
            })}
          </Carousel>
        ) : (
          <ImageDefault
            src={undefined}
            width={250}
            height={250}
            alt='preview image'
            objectFit='cover'
          />
        )}
      </>
    );
  } else {
    return (
      <>
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
                  objectFit='cover'
                  // priority={true}
                />
              );
            })}
          </Carousel>
        ) : (
          <ImageDefault
            src={undefined}
            width={250}
            height={250}
            alt='preview image'
            objectFit='cover'
            className={className}
          />
        )}
      </>
    );
  }
};

export default ImagesCarousel;
