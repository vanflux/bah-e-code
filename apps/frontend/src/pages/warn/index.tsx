import { useParams } from 'react-router-dom';
import { Loading } from '../../components/loading';
import { useWarn } from '../../features/warns';

export const WarnPage = () => {
  const { warnId } = useParams();
  const { data: warn, isLoading } = useWarn(warnId || '');

  return (
    <div className="flex flex-col flex-1">
      {isLoading || !warn || !warnId ? (
        <Loading />
      ) : (
        <>
          <div>
            <img src={warn?.imageUrl} />
          </div>
          <div className="h-[20px]"></div>
          <div className="p-[5px]">
            <div>
              <h1 className="font-bold">{warn?.title}</h1>
            </div>
            <div>{warn?.body}</div>
          </div>
        </>
      )}
    </div>
  );
};
