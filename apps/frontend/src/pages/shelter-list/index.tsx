import { useState } from 'react';
import { ShelterCard } from './components/shelter-card';
import { SearchInput } from '../../components/search-input';
import { useShelters } from '../../features/shelters';
import { Loading } from '../../components/loading';

export function ShelterListPage() {
  const [search, setSearch] = useState('');
  const { data: shelterPages, isLoading } = useShelters({
    search,
  });

  const shelters = shelterPages?.pages.flatMap((page) => page.items ?? []);

  return (
    <div className="flex flex-col flex-1 p-4 gap-4">
      <SearchInput value={search} onChange={setSearch} />

      {isLoading ? (
        <div className="flex flex-col justify-center items-center flex-1">
          <Loading />
        </div>
      ) : (
        shelters?.map((shelter) => <ShelterCard key={shelter.shelterId} {...(shelter as any)}></ShelterCard>)
      )}
    </div>
  );
}
