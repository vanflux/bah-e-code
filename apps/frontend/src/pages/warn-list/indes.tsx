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
          <div className="flex flex-wrap justify-center gap-3">
            <div className="">
              <h1>Alertas</h1>
              <div className="h-[10px]" />
              <div className="flex justify-center">
                <Icon type="alert" className="fill-red-500" size={7} />
              </div>
            </div>
            {warns.map((it) => (
              <>
                <WarnCard id={it.alertId} date={it.createdAt} title={it.title}></WarnCard>
              </>
            ))}
          </div>
        </>
      )}
    </>
  );
};
