import { LMap } from '../../components/map';
import { useShelterPoints } from '../../features/shelters';

export function MapPage() {
  const { data: shelterPoints } = useShelterPoints();

  return (
    <div className="flex flex-col flex-1">
      <LMap shelterPoints={shelterPoints} />
    </div>
  );
}
