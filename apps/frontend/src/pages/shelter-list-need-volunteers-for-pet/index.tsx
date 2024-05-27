import { useShelters } from '../../features/shelters';
import { useCurrentLocation } from '../../features/current-location';
import { ShelterList } from '../../features/shelters/components/shelter-list';
import LocationSelectInput from '../../components/location-select-input';
import { Typography } from '../../components/Typography';

export function ShelterListNeedVolunteersForPetPage() {
  const { latitude, longitude } = useCurrentLocation();
  const { data: shelterPages, isLoading } = useShelters(
    {
      latitude: latitude!,
      longitude: longitude!,
      needVolunteers: true,
      petFriendly: true,
    },
    !!latitude && !!longitude,
  );
  const shelters = shelterPages?.pages.flatMap((page) => page.items ?? []);

  return (
    <div className="flex flex-col flex-1">
      <ShelterList shelters={shelters} isLoading={isLoading}>
        <LocationSelectInput />
        <Typography semibold>Precisam de voluntários para pets:</Typography>
      </ShelterList>
    </div>
  );
}
