import { Link } from 'react-router-dom';
import { Typography } from '../../../components/Typography/index';
import { Button } from '../../../components/button';
import { Icon } from '../../../components/icons';
import { routes } from '../../../router/routes';
import { ShelterDto } from '../../../features/shelters';
import { Point } from '../../../components/map';

export interface ShelterCardProps {
  data: ShelterDto;
  showMap?: (point: Point) => void;
}

export function ShelterCard({ data, showMap }: ShelterCardProps) {
  const { shelterId, name, address, contact, petFriendly, capacity, shelteredPeople, latitude, longitude } = data;

  function emitPoint() {
    if (!showMap) {
      return;
    }

    if (!latitude || !longitude) {
      return;
    }

    showMap({
      position: [latitude, longitude],
      label: name,
    });
  }

  return (
    <div className="flex flex-col gap-2 rounded-md shadow-system p-2">
      <div className="flex flex-col sm:flex-row sm:items-center">
        <div className="sm:w-[calc(100%-144px)]">
          <Typography size="h3" bold>
            {name}
          </Typography>
          {capacity === shelteredPeople ? (
            <Typography size="h5" color="danger" bold>
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
          <div className="flex gap-2 items-center">
            <Icon type="people" size={3} className="fill-gray-600" />
            <Typography size="h4">
              {shelteredPeople}/{capacity} pessoas abrigadas
            </Typography>
          </div>
          <div className="flex gap-2 items-center">
            <Icon type="contact" size={3} className="fill-gray-600" />
            <Typography size="h4">Contato: {contact}</Typography>
          </div>
        </div>

        <div className="sm:w-36 flex justify-center">
          <img className="h-32 sm:w-36 sm:h-36 rounded" src="https://tinyurl.com/2hzpxu9c" />
        </div>
      </div>

      <div className="w-full flex sp gap-2">
        <Link to={routes.SHELTER(shelterId)} className="flex-1">
          <Button full>Ver detalhes</Button>
        </Link>

        <Button className="flex-1" onClick={emitPoint}>
          Ver no mapa
        </Button>
      </div>
    </div>
  );
}
