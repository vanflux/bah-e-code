import { useNavigate } from 'react-router-dom';
import { routes } from '../../router/routes';
import { formatDDMMYYYY, formatHHMM } from '../../utils/date';

interface WarnCardProps {
  id: string;
  title: string;
  date: string;
}

export const WarnCard = ({ date, id, title }: WarnCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="border border-gray-300 shadow rounded-lg max-w-[90%] p-2" onClick={() => navigate(routes.WARN(id))}>
      <h3 className="text-sm font-bold">{title}</h3>
      <div className="h[10px]"></div>
      <p className="text-red-500">{`${formatDDMMYYYY(date)} ás ${formatHHMM(date)}`}</p>
    </div>
  );
};
