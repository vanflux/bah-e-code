import { useMemo, useRef, useState } from 'react';
import { ShelterCard } from './components/shelter-card';
import { SearchInput } from '../../components/search-input';
import { useShelters } from '../../features/shelters';
import { Loading } from '../../components/loading';
import { LMap, Point } from '../../components/map';
import { Map } from 'leaflet';
import { useCurrentLocation } from '../../features/current-location';
import LocationSelectInput from '../../components/location-select-input';

export function ShelterListPage() {
  const [search, setSearch] = useState('');
  const { latitude, longitude } = useCurrentLocation();
  const { data: shelterPages, isLoading } = useShelters(
    {
      latitude: latitude!,
      longitude: longitude!,
      search,
    },
    !!latitude && !!longitude,
  );
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

    mapRef.current.setView([shelter.latitude, shelter.longitude], 17, { animate: true });
  }

  const points = useMemo(() => {
    if (!shelters) return [];
    return shelters
      .filter(({ latitude, longitude }) => latitude && longitude)
      .map(
        (shelter): Point => ({
          position: [shelter.latitude!, shelter.longitude!],
          label: shelter.name,
          id: shelter.shelterId,
        }),
      );
  }, [shelters]);

  return (
    <div>
      <div ref={anchorRef} />
      <LMap className="min-h-60" points={points} ref={mapRef} />

      <div className="flex flex-col flex-1 p-4 gap-4">
        <LocationSelectInput />
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
