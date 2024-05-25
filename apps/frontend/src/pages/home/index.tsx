import { Loading } from '../../components/loading';
import { Map } from '../../components/map';
import { Example, useExample } from '../../features/example';

export function HomePage() {
  const { data: example, isLoading } = useExample();

  return (
    <div className="flex flex-col flex-1">
      {/* {isLoading || !example ? <Loading /> : <Example example={example} />} */}
      <Map />
    </div>
  );
}
