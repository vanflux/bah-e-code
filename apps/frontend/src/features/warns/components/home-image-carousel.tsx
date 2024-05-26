import { Link } from 'react-router-dom';
import { Typography } from '../../../components/Typography';
import { routes } from '../../../router/routes';
import { Icon } from '../../../components/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useHomeImages } from '../hooks';
import { WarnCarouselItem } from './warn-carousel-item';
import { Loading } from '../../../components/loading';
import 'swiper/css';
import 'swiper/css/pagination';
import React from 'react';

export function HomeImageCarousel() {
  const { data: warns, isLoading } = useHomeImages();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <Typography size="h2" className="font-bold">
          Últimos Alertas
        </Typography>
        <Link to={routes.WARNS()} className="flex font-semibold gap-1 text-sm items-center">
          ver todos
          <Icon className="text-primary-500" type="chevronRight" size={7} />
        </Link>
      </div>
      {isLoading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        <div className="flex">
          <Swiper className="w-full h-full overflow-visible" slidesPerView="auto" spaceBetween={16} allowTouchMove>
            {warns?.map((warn) => {
              return (
                <SwiperSlide className="w-[200px] h-[202px]" key={warn.alertId}>
                  <WarnCarouselItem id={warn.alertId} title={warn.title} imgLink={warn.imageUrl} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </div>
  );
}
