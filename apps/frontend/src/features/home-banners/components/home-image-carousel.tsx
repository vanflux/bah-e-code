import { Swiper, SwiperSlide } from 'swiper/react';
import { useHomeImages } from '../hooks';
import { Loading } from '../../../components/loading';
import 'swiper/css';
import 'swiper/css/pagination';
import { HomeImageCarouselItem } from './home-image-carousel-item';

export function HomeImageCarousel() {
  const { data: images, isLoading } = useHomeImages();

  return (
    <div className="flex flex-col gap-3">
      {isLoading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        <div className="flex">
          <Swiper className="w-full h-full overflow-visible" slidesPerView="auto" spaceBetween={16} allowTouchMove>
            {images?.map((image) => {
              return (
                <SwiperSlide className="w-[200px] h-[202px]">
                  <HomeImageCarouselItem extLink={image.imageUrl} imgLink={image.imageUrl} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </div>
  );
}
