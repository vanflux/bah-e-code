import { Typography } from '../../components/Typography';
import { useShelter, useSheltersToReceiveDonation } from '../../features/shelters';
import { ShelterList } from '../../features/shelters/components/shelter-list';
import { useParams } from 'react-router-dom';

export function ShelterListToReceiveDonationsPage() {
  const { shelterId } = useParams();
  const { data: shelter } = useShelter(shelterId);
  const { data: shelterPages, isLoading } = useSheltersToReceiveDonation({ id: shelterId! }, !!shelterId);
  const shelters = shelterPages?.pages.flatMap((page) => page.items ?? []);

  return (
    <div className="flex flex-col flex-1">
      <ShelterList shelters={shelters} isLoading={isLoading}>
        {shelter && (
          <Typography semibold>
            O abrigo <u>{shelter.name}</u> pode receber doações de:
          </Typography>
        )}
      </ShelterList>
    </div>
  );
}
