import { useNavigate } from 'react-router-dom';
import { Carousel } from '../../components/carousel';
import { Icon } from '../../components/icons';
import { Loading } from '../../components/loading';
import { useWarnList } from '../../features/example/hooks/use-warns';
import { routes } from '../../router/routes';

export function HomePage() {
  const { data: warns, isLoading } = useWarnList();
  const navigate = useNavigate();
  return (
    <>
      {isLoading || !warns ? (
        <Loading />
      ) : (
        <div>
          <div className="h-[10px]"></div>
          <div className="flex justify-between p-1">
            <h1 className="font-bold">Ultimos Alertas </h1>
            <div className="h-[10px]"></div>
            <span
              onClick={() => {
                navigate(routes.WARNS());
              }}
              className="flex gap-5 text-xs items-center"
            >
              {' '}
              ver todos{``} <Icon className="mr-2" type="arrowRight" size={5} />
            </span>
          </div>

          <Carousel content={warns} />
        </div>
      )}
    </>
  );
}
