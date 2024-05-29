import { Link, useParams } from 'react-router-dom';
import { Typography } from '../../components/Typography';
import { Icon, IconType } from '../../components/icons';
import { LMap } from '../../components/map';
import LocationSelectInput from '../../components/location-select-input';
import { ShelterSuppliesModal, SupplyPriority, useShelter } from '../../features/shelters';
import { Loading } from '../../components/loading';
import { useMemo, useState } from 'react';
import { ShelterSupplyDto } from '../../features/shelters/dtos/shelter-supply.dto';
import { SupplyCategoryDto } from '../../features/shelters/dtos/supply-category.dto';
import { Button } from '../../components/button';
import { routes } from '../../router/routes';
import { useShelterPoints } from '../../features/shelters/hooks/use-shelter-points';
import { ShelterPoint } from '../../components/map/components/shelter-marker';

export function ShelterDetails() {
  const { shelterId } = useParams();
  const { data: shelter, isLoading } = useShelter(shelterId);
  const { data: shelterPointDtos } = useShelterPoints();
  const [showingShelterSupplies, setShowingShelterSupplies] = useState<ShelterSupplyDto[]>();

  const getItems = (priorities: SupplyPriority[]) => {
    if (!shelter?.shelterSupplies) return [];
    const items: {
      category: SupplyCategoryDto;
      shelterSupplies: ShelterSupplyDto[];
    }[] = [];
    for (const shelterSupply of shelter.shelterSupplies) {
      if (!priorities.includes(shelterSupply.priority)) continue;
      const category = shelterSupply.supply?.supplyCategory;
      if (!category) continue;
      const item = items.find((item) => item.category.supplyCategoryId === category.supplyCategoryId);
      if (item) {
        item.shelterSupplies.push(shelterSupply);
      } else {
        items.push({ category, shelterSupplies: [shelterSupply] });
      }
    }
    return items?.sort((a, b) => {
      if (a.category.icon && b.category.icon) return a.category.name.localeCompare(b.category.name);
      if (a.category.icon) return -1;
      if (b.category.icon) return 1;
      return a.category.name.localeCompare(b.category.name);
    });
  };

  const needingItems = useMemo(() => getItems([SupplyPriority.Needing, SupplyPriority.Urgent]), [getItems]);

  const remainingItems = useMemo(() => getItems([SupplyPriority.Remaining]), [getItems]);

  const shelterPoints = useMemo(
    () =>
      shelterPointDtos?.map<ShelterPoint>((item) => ({
        ...item,
        disabled: item.shelterId !== shelterId,
      })),
    [shelterPointDtos, shelterId],
  );

  const hasPeopleData = shelter?.shelteredPeople != null && shelter.capacity != null;

  const isFull = hasPeopleData && shelter.shelteredPeople === shelter.capacity;

  return (
    <div className="flex flex-col gap-3">
      <LMap className="min-h-60" shelterPoints={shelterPoints} />
      <div className="flex flex-col gap-2 px-4 pb-3">
        <LocationSelectInput />

        <ShelterSuppliesModal
          open={!!showingShelterSupplies?.length}
          shelterSupplies={showingShelterSupplies ?? []}
          onOpenChange={() => setShowingShelterSupplies([])}
        />

        {isLoading || !shelter ? (
          <Loading />
        ) : (
          <>
            <Typography size="h1" bold>
              {shelter.name}
            </Typography>
            {hasPeopleData != null && (
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${isFull ? 'bg-danger' : 'bg-success'}`} />
                <Typography size="h4" bold color={isFull ? 'danger' : 'success'}>
                  {isFull ? 'Abrigo lotado' : 'Abrigo disponível'}
                </Typography>
              </div>
            )}
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
            {!!needingItems.length && (
              <>
                <Typography size="h3" bold>
                  Doações necessárias
                </Typography>

                <div className="grid grid-cols-3 gap-3">
                  {needingItems.map((item) => (
                    <div
                      key={item.category.supplyCategoryId}
                      className="flex flex-col items-center justify-center h-[120px] gap-1 p-3 shadow-system rounded-xl cursor-pointer overflow-hidden"
                      onClick={() => setShowingShelterSupplies(item.shelterSupplies)}
                    >
                      <Icon size={12} className="text-red-500" type={(item.category.icon as IconType) ?? 'shelter'} />
                      <Typography size="h5" semibold align="center" className="break-words text-red-500">
                        {item.category.name}
                      </Typography>
                    </div>
                  ))}
                </div>

                <Link to={routes.SHELTERS_TO_RECEIVE_DOTATIONS(shelterId!)}>
                  <Button>Localizar items em outros abrigos</Button>
                </Link>
              </>
            )}
            {!!remainingItems.length && (
              <>
                <Typography size="h3" bold>
                  Sobrando para doações
                </Typography>

                <div className="grid grid-cols-3 gap-3">
                  {remainingItems.map((item) => (
                    <div
                      key={item.category.supplyCategoryId}
                      className="flex flex-col items-center justify-center h-[120px] gap-1 p-3 shadow-system rounded-xl cursor-pointer overflow-hidden"
                      onClick={() => setShowingShelterSupplies(item.shelterSupplies)}
                    >
                      <Icon size={12} className="text-green-500" type={(item.category.icon as IconType) ?? 'shelter'} />
                      <Typography semibold align="center" className="break-words text-green-500">
                        {item.category.name}
                      </Typography>
                    </div>
                  ))}
                </div>

                <Link to={routes.SHELTERS_TO_SEND_DOTATIONS(shelterId!)}>
                  <Button>Localizar abrigos para doar</Button>
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
