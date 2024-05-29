import { ReactNode, useRef } from 'react';
import { ShelterDto } from '../../dtos';
import { Map } from 'leaflet';
import { LMap } from '../../../../components/map';
import { Loading } from '../../../../components/loading';
import { ShelterCard } from './components/shelter-card';
import { Typography } from '../../../../components/Typography';
import { useShelterPoints } from '../../hooks/use-shelter-points';

interface Props {
  shelters?: ShelterDto[];
  total?: number;
  isLoading?: boolean;
  children?: ReactNode;
}

export function ShelterList({ shelters, total, isLoading, children }: Props) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const { data: shelterPoints } = useShelterPoints();
  const mapRef = useRef<Map>(null);

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

  return (
    <div className="flex flex-col flex-1">
      <div ref={anchorRef} />

      <LMap className="min-h-60 h-60 max-h-60 shadow-system" shelterPoints={shelterPoints} ref={mapRef} />

      <div className="flex flex-col h-[calc(100vh-378px)] overflow-auto px-4 py-3 gap-4">
        {children}
        {isLoading ? (
          <div className="flex flex-col justify-center items-center flex-1">
            <Loading />
          </div>
        ) : !!shelters?.length ? (
          <div className="flex flex-col gap-3">
            {total != null && <Typography semibold>Resultados encontrados ({total}):</Typography>}
            {shelters?.map((shelter) => <ShelterCard key={shelter.shelterId} data={shelter} showMap={handleShowMap}></ShelterCard>)}
          </div>
        ) : (
          <div className="flex flex-col flex-1 justify-center items-center">
            <Typography semibold color="danger">
              Nenhum resultado encontrado.
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}
