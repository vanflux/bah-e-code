import { Typography } from '../../components/Typography';
import { useShelter, useSheltersToSendDonation } from '../../features/shelters';
import { ShelterList } from '../../features/shelters/components/shelter-list';
import { useParams } from 'react-router-dom';

export function ShelterListToSendDonationsPage() {
  const { shelterId } = useParams();
  const { data: shelter } = useShelter(shelterId);
  const { data: shelterPages, isLoading } = useSheltersToSendDonation({ id: shelterId! }, !!shelterId);
  const shelters = shelterPages?.pages.flatMap((page) => page.items ?? []);

  return (
    <div className="flex flex-col flex-1">
      <ShelterList shelters={shelters} isLoading={isLoading}>
        {shelter && (
          <Typography semibold>
            O abrigo <u>{shelter.name}</u> pode doar items para:
          </Typography>
        )}
      </ShelterList>
    </div>
  );
}
