import { Link } from 'react-router-dom';
import { routes } from '../../../router/routes';
import { Typography } from '../../../components/Typography';

export interface Props {
  title: string;
  imgLink: string;
  id: string;
}

export const WarnCarouselItem = ({ title, imgLink, id }: Props) => {
  return (
    <Link to={routes.WARN(id)} className="flex flex-col border-gray-300 shadow-system rounded-xl w-full h-full">
      <img className="flex-1 overflow-hidden rounded-t-xl bg-cover" src={imgLink} />
      <div className="h-20 p-2 break-words ">
        <Typography size="h4" semibold className="line-clamp-2">
          {title}
        </Typography>
      </div>
    </Link>
  );
};
