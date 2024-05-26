import { useNavigate } from 'react-router-dom';
import { Carousel } from '../../components/carousel';
import { Icon } from '../../components/icons';
import { Loading } from '../../components/loading';
import { useWarnList } from '../../features/example/hooks/use-warns';
import { routes } from '../../router/routes';
import { IconCard } from '../../components/icon-card';

export function HomePage() {
  const { data: warns, isLoading } = useWarnList();
  const navigate = useNavigate();
  return (
    <>
      {isLoading || !warns ? (
        <Loading />
      ) : (
        <div className="p-1">
          <div className="h-[10px]"></div>
          <div className="flex justify-between">
            <h1 className="font-bold">Últimos Alertas </h1>
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
          <div className="h-[30px]"></div>
          <h2 className="font-bold">Menu</h2>
          <div className="flex justify-center w-[100%]">
            <div className="flex flex-wrap p-[10px] justify-evenly gap-5">
              <IconCard iconSize={7} text="Abrigos" navigate={() => navigate(routes.SHELTERS())} iconColor="blue" iconType="shelter" />
              <IconCard text="Alertas" navigate={() => navigate(routes.WARNS())} iconColor="red" iconType="alert" />
              <IconCard
                iconSize={7}
                text="Notificações"
                navigate={() => navigate(routes.NOTIFICATIONS())}
                iconColor="blue"
                iconType="bell"
              />
              <IconCard iconSize={9} text="Doações" navigate={() => navigate(routes.HOME())} iconColor="red" iconType="donation" />
              <IconCard text="Voluntários" navigate={() => navigate(routes.HOME())} iconColor="red" iconType="volunteer" />
            </div>
          </div>
        </div>
      )}
      <div></div>
    </>
  );
}
