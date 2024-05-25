import Navbar from '../../components/NavBar';
import { Footer } from '../../components/layouts/components/footer';
import { Header } from '../../components/layouts/components/header';
import { Loading } from '../../components/loading';
import { Map } from '../../components/map';
import { Example, useExample } from '../../features/example';

export function HomePage() {
  const { data: example, isLoading } = useExample();

  return (
    <div className="flex flex-col flex-1">
      {/* {isLoading || !example ? <Loading /> : <Example example={example} />} */}
      asdasdasd
    </div>
  );
}
