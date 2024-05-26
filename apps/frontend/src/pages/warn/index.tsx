import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFullWarn } from '../../features/example';
import { FullWarn } from '../../features/example/models';
import { Loading } from '../../components/loading';

interface Warn {
  title: string;
  text: string;
  image: string;
}

const WarnPage: React.FC = () => {
  const { warnId } = useParams();
  const { data: warn, isLoading } = useFullWarn(warnId || '');

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

export default WarnPage;
