import { useParams } from 'react-router-dom';
import { Typography } from '../../components/Typography';
import { Icon, IconType } from '../../components/icons';
import { LMap } from '../../components/map';
import LocationSelectInput from '../../components/location-select-input';
import { SupplyPriority, useShelter } from '../../features/shelters';
import { Loading } from '../../components/loading';
import { useMemo } from 'react';
import { ShelterSupplyDto } from '../../features/shelters/dtos/shelter-supply.dto';
import { SupplyCategoryDto } from '../../features/shelters/dtos/supply-category.dto';

function isAvaillable(used?: number, total?: number) {
  if (used == null || total == null) return null;

  const full = used === total;

  const text = full ? 'Abrigo lotado' : 'Abrigo disponível';

  return (
    <div className="flex items-center gap-2">
      <div className={`w-4 h-4 rounded-full ${full ? 'bg-danger' : 'bg-success'}`} />
      <Typography size="h4" bold color={full ? 'danger' : 'success'}>
        {text}
      </Typography>
    </div>
  );
}

export function ShelterDetails() {
  const { shelterId } = useParams();
  const { data: shelter, isLoading } = useShelter(shelterId);

  console.log(shelter?.shelterSupplies, '<');
  const getCategories = (priorities: SupplyPriority[]) => {
    if (!shelter?.shelterSupplies) return [];
    const categories: SupplyCategoryDto[] = [];
    for (const shelterSupply of shelter.shelterSupplies) {
      if (!priorities.includes(shelterSupply.priority)) continue;
      const category = shelterSupply.supply?.supplyCategory;
      if (!category) continue;
      if (categories.find((item) => item.supplyCategoryId === category.supplyCategoryId)) continue;
      categories.push(category);
    }
    return categories;
  };

  const needingCategories = useMemo(() => getCategories([SupplyPriority.Needing, SupplyPriority.Urgent]), [getCategories]);

  const remainingCategories = useMemo(() => getCategories([SupplyPriority.Remaining]), [getCategories]);

  return (
    <div className="flex flex-col gap-3">
      <LMap className="min-h-60" />
      <LocationSelectInput />

      {isLoading || !shelter ? (
        <Loading />
      ) : (
        <div className="p-4 flex flex-col gap-2">
          <Typography size="h1" bold>
            {shelter.name}
          </Typography>
          {isAvaillable(shelter.shelteredPeople, shelter.capacity)}
          <Typography size="h3" bold>
            Detalhes do abrigo
          </Typography>

          <div className="p-2 border-b-2 border-[#2582f0]/50">
            <div className="flex gap-2 items-start">
              <Icon type="gps" size={3} className="mt-[7px] fill-danger" />
              <Typography size="h4">{shelter.address}</Typography>
            </div>
            {shelter.petFriendly && (
              <div className="flex gap-2 items-center">
                <Icon type="dogFoot" size={3} className="fill-[#FF00A8]" />
                <Typography size="h4">O abrigo aceita animais</Typography>
              </div>
            )}
            {shelter.shelteredPeople != null && shelter.capacity != null && (
              <div className="flex gap-2 items-center">
                <Icon type="people" size={3} className="fill-success" />
                <Typography size="h4">
                  {shelter.shelteredPeople}/{shelter.capacity} pessoas abrigadas
                </Typography>
              </div>
            )}
            {shelter.contact && (
              <div className="flex gap-2 items-center">
                <Icon type="contact" size={3} className="fill-[#2582f0]" />
                <Typography size="h4">Contato: {shelter.contact}</Typography>
              </div>
            )}
          </div>

          <Typography size="h3" bold>
            Doações necessárias
          </Typography>

          <div className="grid grid-cols-3 gap-3">
            {needingCategories.map((category) => (
              <div className="flex flex-col items-center justify-center h-[120px] gap-1 p-3 shadow-system rounded-xl overflow-hidden">
                <Icon size={12} className="text-red-500" type={(category.icon as IconType) ?? 'shelter'} />
                <Typography size="h5" semibold align="center" className="break-words text-red-500">
                  {category.name}
                </Typography>
              </div>
            ))}
          </div>

          <Typography size="h3" bold>
            Sobrando para doações
          </Typography>

          <div className="grid grid-cols-3 gap-3">
            {remainingCategories.map((category) => (
              <div className="flex flex-col items-center justify-center h-[120px] gap-1 p-3 shadow-system rounded-xl overflow-hidden">
                <Icon size={12} className="text-green-500" type={(category.icon as IconType) ?? 'shelter'} />
                <Typography semibold align="center" className="break-words text-green-500">
                  {category.name}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
