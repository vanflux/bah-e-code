import { useState } from 'react';
import { Icon } from '../../components/icons';
import { ShelterCard, ShelterCardProps } from './components/shelter-card';

const mock: Partial<ShelterCardProps>[] = [
  {
    shelterId: '1',
    name: 'Projeto Surfar',
    address: 'R. Borborema, 687 E 691, Vila João Pessoa, Porto Alegre',
    city: 'Gravatai',
    street: 'Rua Domingo Dorivaldo Thiesen',
    streetNumber: 744,
    zipCode: '94950590',
    capacity: 200,
    shelteredPeople: 200,
    contact: '(51) 99543-3412',
    petFriendly: true,
  },
  {
    shelterId: '2',
    name: 'Projeto Surfar',
    address: 'R. Borborema, 687 E 691, Vila João Pessoa, Porto Alegre',
    city: 'Gravatai',
    street: 'Rua Domingo Dorivaldo Thiesen',
    streetNumber: 744,
    zipCode: '94950590',
    capacity: 200,
    shelteredPeople: 80,
    contact: '(51) 99543-3412',
    petFriendly: false,
  },
];

interface SearchInputProps {
  onSearch: (value: string) => void;
  value: string;
}

function SearchInput({ onSearch, value }: SearchInputProps) {
  return (
    <div className="shadow-system rounded-full flex items-center pl-4 h-14">
      <input
        onChange={(e) => onSearch(e.target.value)}
        value={value}
        type="text"
        placeholder="Buscar abrigo por nome ou endereço"
        className="grow outline-none"
      />
      <div className="w-14 h-14 flex items-center justify-center">
        <Icon type="search" size={4} />
      </div>
    </div>
  );
}

export function ShelterListPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="flex flex-col flex-1 p-8 gap-4">
      <div className="pb-2">
        <SearchInput value={search} onSearch={setSearch} />
      </div>

      {search}

      {mock.map((shelter) => (
        <ShelterCard key={shelter.shelterId} {...(shelter as any)}></ShelterCard>
      ))}
    </div>
  );
}
