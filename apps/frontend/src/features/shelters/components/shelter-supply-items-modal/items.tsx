import { Typography } from '../../../../components/Typography';
import { ShelterSupplyDto } from '../../dtos/shelter-supply.dto';
import { SupplyPriority } from '../../enums';
import Item from './item';

interface Props {
  shelterSupplies: ShelterSupplyDto[];
}

export default function Items({ shelterSupplies }: Props) {
  if (!shelterSupplies.length) return null;

  const priority = shelterSupplies[0].priority;

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          {priority === SupplyPriority.Urgent && (
            <>
              <div className="rounded-full w-4 h-4 bg-red-500" />
              <Typography bold size="h3" color="danger">
                Precisa com urgência
              </Typography>
            </>
          )}
          {priority === SupplyPriority.Needing && (
            <>
              <div className="rounded-full w-4 h-4 bg-orange-500" />
              <Typography bold size="h3" color="warning">
                Precisa
              </Typography>
            </>
          )}
          {priority === SupplyPriority.Remaining && (
            <>
              <div className="rounded-full w-4 h-4 bg-green-500" />
              <Typography bold size="h3" color="success">
                Precisa
              </Typography>
            </>
          )}
        </div>
        <Typography size="h3" bold>
          Qtd.
        </Typography>
      </div>

      {shelterSupplies.map((item) => (
        <Item key={item.shelterSupplyId} shelterSupply={item} />
      ))}
    </div>
  );
}
