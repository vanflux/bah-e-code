import { useNavigate } from 'react-router-dom';
import { routes } from '../../router/routes';
import { formatDDMMYYYY, formatHHMM } from '../../utils/date';
import { Typography } from '../Typography';

interface WarnCardProps {
  id: string;
  title: string;
  city: string;
  date: string;
}

export const WarnCard = ({ date, city, id, title }: WarnCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col shadow-system rounded-xl p-2 gap-2 cursor-pointer" onClick={() => navigate(routes.WARN(id))}>
      <Typography semibold size="h4">
        {title}
      </Typography>
      <div className="flex justify-between gap-3">
        <Typography size="h5" className="text-red-500">
          {`${formatDDMMYYYY(date)} ás ${formatHHMM(date)}`}
        </Typography>
        <Typography size="h5">{city}</Typography>
      </div>
    </div>
  );
};
