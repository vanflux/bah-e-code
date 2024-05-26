import { useEffect, useRef, useState } from 'react';
import { ShelterCard } from './components/shelter-card';
import { SearchInput } from '../../components/search-input';
import { ShelterDto, useShelters } from '../../features/shelters';
import { Loading } from '../../components/loading';
import { LMap, Point } from '../../components/map';
import { LatLngTuple, Map } from 'leaflet';
import { useWatchPosition } from '../../hooks/use-watch-position';

function mapPoints(shelters: ShelterDto[] | undefined) {
  if (!shelters) {
    return [];
  }

  return shelters
    .filter(({ latitude, longitude }) => latitude && longitude)
    .map(
      (shelter): Point => ({
        position: [shelter.latitude!, shelter.longitude!],
        label: shelter.name,
        id: shelter.shelterId,
      }),
    );
}

export function ShelterListPage() {
  const [search, setSearch] = useState('');
  const { data: shelterPages, isLoading } = useShelters({
    search,
  });
  const anchorRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map>(null);

  const shelters = shelterPages?.pages.flatMap((page) => page.items ?? []);

  function handleShowMap(id: string) {
    if (anchorRef.current) {
      anchorRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    if (!mapRef.current) {
      return;
    }

    const shelter = shelters?.find((shelter) => shelter.shelterId === id);

    if (!shelter?.latitude || !shelter.longitude) {
      return;
    }

    mapRef.current.setView([shelter.latitude, shelter.longitude], 16);
  }

  return (
    <div>
      <div ref={anchorRef} />
      <LMap className="h-72" points={mapPoints(shelters)} ref={mapRef} />

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
