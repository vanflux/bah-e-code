import { useParams } from 'react-router-dom';
import { Loading } from '../../components/loading';
import { useWarn } from '../../features/warns';
import { Typography } from '../../components/Typography';
import { formatDDMMYYYY, formatHHMM } from '../../utils/date';

export const WarnPage = () => {
  const { warnId } = useParams();
  const { data: warn, isLoading } = useWarn(warnId || '');

  return (
    <div className="flex flex-col flex-1 gap-3">
      {isLoading || !warn || !warnId ? (
        <Loading />
      ) : (
        <div className="flex flex-col flex-1 gap-3">
          <div>
            <img src={warn?.imageUrl} />
          </div>
          <div className="flex flex-col flex-1 gap-3 px-3 pb-5">
            <Typography semibold size="h2">
              {warn?.title}
            </Typography>
            <Typography align="end" size="h6">
              {`${formatDDMMYYYY(warn.createdAt)} ás ${formatHHMM(warn.createdAt)}`}
            </Typography>
            <Typography align="justify">{warn?.body}</Typography>
          </div>
        </div>
      )}
    </div>
  );
};
