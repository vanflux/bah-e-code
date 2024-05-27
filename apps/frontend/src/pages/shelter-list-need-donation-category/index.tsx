import { useShelters, useSupplyCategory } from '../../features/shelters';
import { useCurrentLocation } from '../../features/current-location';
import { ShelterList } from '../../features/shelters/components/shelter-list';
import LocationSelectInput from '../../components/location-select-input';
import { Typography } from '../../components/Typography';
import { useParams } from 'react-router-dom';

export function ShelterListNeedDonationCategoryPage() {
  const { supplyCategoryId } = useParams();
  const { latitude, longitude } = useCurrentLocation();
  const { data: supplyCategory } = useSupplyCategory(supplyCategoryId);
  const { data: shelterPages, isLoading } = useShelters(
    {
      latitude: latitude!,
      longitude: longitude!,
      needSupplyCategoryId: supplyCategoryId,
    },
    !!latitude && !!longitude,
  );
  const shelters = shelterPages?.pages.flatMap((page) => page.items ?? []);

  return (
    <div className="flex flex-col flex-1">
      <ShelterList shelters={shelters} isLoading={isLoading}>
        <LocationSelectInput />
        {supplyCategory && <Typography semibold>Precisam de doações para {supplyCategory.name}:</Typography>}
      </ShelterList>
    </div>
  );
}
