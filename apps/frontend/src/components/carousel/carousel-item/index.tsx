import { useNavigate } from 'react-router-dom';
import { routes } from '../../../router/routes';

export interface CarouselItemProps {
  title: string;
  imgLink: string;
  id: string;
}

const CarouselItem = ({ title, imgLink, id }: CarouselItemProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(routes.WARN(id));
      }}
      className="border border-gray-300 shadow-sm rounded-lg w-[200px]  h-[202px] flex-col"
    >
      <img className="w-[200px] h-[132px] rounded-t-lg bg-cover" src={imgLink} />
      <div className="h-1/2 max-w[180px] break-words ">
        <b className="line-clamp-2">{title}</b>
      </div>
    </div>
  );
};

export default CarouselItem;
