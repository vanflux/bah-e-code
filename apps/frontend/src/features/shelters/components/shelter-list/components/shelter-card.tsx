import { Link } from 'react-router-dom';
import { Typography } from '../../../../../components/Typography';
import { Icon } from '../../../../../components/icons';
import { ShelterDto } from '../../../dtos';
import { Button } from '../../../../../components/button';
import { routes } from '../../../../../router/routes';

export interface ShelterCardProps {
  data: ShelterDto;
  showMap?: (id: string) => void;
}

export function ShelterCard({ data, showMap }: ShelterCardProps) {
  const { shelterId, name, address, contact, petFriendly, capacity, shelteredPeople, imageUrl, latitude, longitude } = data;
  const hasLocation = !!latitude && !!longitude;

  function emitPoint() {
    if (!showMap) return;
    if (!hasLocation) return;
    showMap(shelterId);
  }

  return (
    <div className="flex flex-col gap-2 rounded-md shadow-system p-2">
      <div className="flex flex-col sm:flex-row sm:items-center">
        <div className="sm:w-[calc(100%-144px)]">
          <Typography size="h3" semibold>
            {name}
          </Typography>
          {capacity === shelteredPeople ? (
            <Typography size="h5" color="danger" semibold>
              Abrigo lotado
            </Typography>
          ) : null}
          <div className="flex gap-2 items-start">
            <Icon type="gps" size={3} className="mt-[7px] fill-gray-600" />
            <Typography size="h4">{address}</Typography>
          </div>
          {petFriendly ? (
            <div className="flex gap-2 items-center">
              <Icon type="dogFoot" size={3} className="fill-gray-600" />
              <Typography size="h4">O abrigo aceita animais</Typography>
            </div>
          ) : null}
          {shelteredPeople != null && capacity != null && (
            <div className="flex gap-2 items-center">
              <Icon type="people" size={3} className="fill-gray-600" />
              <Typography size="h4">
                {shelteredPeople}/{capacity} pessoas abrigadas
              </Typography>
            </div>
          )}
          {!!contact && (
            <div className="flex gap-2 items-center">
              <Icon type="contact" size={3} className="fill-gray-600" />
              <Typography size="h4">Contato: {contact}</Typography>
            </div>
          )}
        </div>

        {!!imageUrl && (
          <div className="sm:w-36 flex justify-center">
            <img className="h-32 sm:w-36 sm:h-36 rounded" src={imageUrl} />
          </div>
        )}
      </div>

      <div className="w-full flex sp gap-2">
        <Link to={routes.SHELTER(shelterId)} className="flex-1">
          <Button full>Ver detalhes</Button>
        </Link>

        {hasLocation && (
          <Button className="flex-1" onClick={emitPoint}>
            Ver no mapa
          </Button>
        )}
      </div>
    </div>
  );
}
