import { useState } from 'react';
import { useShelters } from '../../features/shelters';
import { useCurrentLocation } from '../../features/current-location';
import { ShelterList } from '../../features/shelters/components/shelter-list';
import LocationSelectInput from '../../components/location-select-input';
import { SearchInput } from '../../components/search-input';
import { Typography } from '../../components/Typography';

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
  const shelters = shelterPages?.pages.flatMap((page) => page.items ?? []);

  return (
    <div className="flex flex-col flex-1">
      <ShelterList shelters={shelters} isLoading={isLoading}>
        <LocationSelectInput />
        <SearchInput value={search} onChange={setSearch} />
      </ShelterList>
    </div>
  );
}
