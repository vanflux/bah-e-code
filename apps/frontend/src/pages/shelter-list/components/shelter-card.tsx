import { Typography } from '../../../components/Typography/index';
import { Button } from '../../../components/button';
import { Icon } from '../../../components/icons';

export interface ShelterCardProps {
  shelterId: string;
  name: string;
  pix?: string | null;
  address: string;
  street?: string | null;
  streetNumber?: number | null;
  neighbourhood?: string | null;
  city?: string | null;
  contact?: string | null;
  zipCode?: string | null;
  capacity?: number | null;
  petFriendly: boolean | null;
  shelteredPeople?: number | null;
  prioritySum: number;
  verified: boolean;
  latitude?: string | null;
  longitude?: string | null;
  actived: boolean;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export function ShelterCard({ name, address, contact, petFriendly, capacity, shelteredPeople }: ShelterCardProps) {
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
            <Icon type="gps" size={3} className="mt-[7px]" />
            <Typography size="h4">{address}</Typography>
          </div>
          {petFriendly ? (
            <div className="flex gap-2 items-center">
              <Icon type="dogFoot" size={3} />
              <Typography size="h4">O abrigo aceita animais</Typography>
            </div>
          ) : null}
          <div className="flex gap-2 items-center">
            <Icon type="people" size={3} />
            <Typography size="h4">
              {shelteredPeople}/{capacity} pessoas abrigadas
            </Typography>
          </div>
          <div className="flex gap-2 items-center">
            <Icon type="contact" size={3} />
            <Typography size="h4">Contato: {contact}</Typography>
          </div>
        </div>

        <div className="sm:w-36 flex justify-center">
          <img className="h-32 sm:w-36 sm:h-36 rounded" src="https://tinyurl.com/2hzpxu9c" />
        </div>
      </div>

      <div className="w-full flex sp gap-2">
        <Button className="flex-1">Ver detalhes</Button>
        <Button className="flex-1">Ver no mapa</Button>
      </div>
    </div>
  );
}
