import { Typography } from '../../../../components/Typography';
import { ShelterSupplyDto } from '../../dtos/shelter-supply.dto';

interface Props {
  shelterSupply: ShelterSupplyDto;
}

export default function Item({ shelterSupply }: Props) {
  return (
    <div className="flex w-full items-center py-1 justify-between">
      <Typography semibold>{shelterSupply.supply?.name}</Typography>
      <Typography size="h3" semibold>
        {shelterSupply.quantity ?? '-'}
      </Typography>
    </div>
  );
}
