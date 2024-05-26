import { Typography } from '../../components/Typography';
import { Icon } from '../../components/icons';
import { Loading } from '../../components/loading';
import { WarnCard } from '../../components/warn-card';
import { useWarns } from '../../features/warns';

export const WarnList = () => {
  const { data: warns, isLoading } = useWarns();

  return (
    <>
      {isLoading || !warns ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-col justify-center gap-3 p-3">
            <div className="flex flex-col gap-2">
              <Typography align="center" semibold size="h2">
                Alertas
              </Typography>
              <div className="flex justify-center">
                <Icon type="alert" className="fill-red-500" size={10} />
              </div>
            </div>
            {warns.map((item) => (
              <WarnCard key={item.alertId} id={item.alertId} date={item.createdAt} title={item.title} />
            ))}
          </div>
        </>
      )}
    </>
  );
};
