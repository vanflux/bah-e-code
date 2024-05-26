import { Swiper, SwiperSlide } from 'swiper/react';
import CarouselItem from './carousel-item';
import { Pagination } from 'swiper';
import { Warn } from '../../features/example/models';
import 'swiper/css';
import 'swiper/css/pagination';

interface CarouselProps {
  content: Warn[];
}

export const Carousel = ({ content }: CarouselProps) => {
  return (
    <div className="p-1">
      <Swiper
        style={{
          width: '100%',
          height: '100%',
        }}
        slidesPerView={1.6}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
        allowTouchMove
      >
        {content.map((warn) => {
          return (
            <SwiperSlide key={warn.alertId}>
              <CarouselItem id={warn.alertId} title={warn.title} imgLink={warn.imageUrl} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
