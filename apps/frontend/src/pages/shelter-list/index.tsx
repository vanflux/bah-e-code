import { useRef, useState } from 'react';
import { ShelterCard } from './components/shelter-card';
import { SearchInput } from '../../components/search-input';
import { useShelters } from '../../features/shelters';
import { Loading } from '../../components/loading';
import { Map, Point } from '../../components/map';

export function ShelterListPage() {
  const [search, setSearch] = useState('');
  const { data: shelterPages, isLoading } = useShelters({
    search,
  });
  const mapRef = useRef<HTMLDivElement>(null);

  const [points, setPoints] = useState<Point[]>([]);

  const shelters = shelterPages?.pages.flatMap((page) => page.items ?? []);

  function handleShowMap(point: Point) {
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    setPoints(() => [point]);
  }

  return (
    <div>
      <div ref={mapRef} />
      <Map className="h-72" points={points} />

      <div className="flex flex-col flex-1 p-4 gap-4">
        <SearchInput value={search} onChange={setSearch} />

        {isLoading ? (
          <div className="flex flex-col justify-center items-center flex-1">
            <Loading />
          </div>
        ) : (
          shelters?.map((shelter) => <ShelterCard key={shelter.shelterId} data={shelter} showMap={handleShowMap}></ShelterCard>)
        )}
      </div>
    </div>
  );
}
