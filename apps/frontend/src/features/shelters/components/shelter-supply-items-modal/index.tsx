import { useMemo } from 'react';
import { Modal } from '../../../../components/modal';
import { ShelterSupplyDto } from '../../dtos/shelter-supply.dto';
import { SupplyPriority } from '../../enums';
import Items from './items';

interface Props {
  open: boolean;
  shelterSupplies: ShelterSupplyDto[];
  onOpenChange: (open?: boolean) => void;
}

export function ShelterSuppliesModal({ open, shelterSupplies, onOpenChange }: Props) {
  const { remaining, needing, urgent } = useMemo(() => {
    const remaining: ShelterSupplyDto[] = [];
    const needing: ShelterSupplyDto[] = [];
    const urgent: ShelterSupplyDto[] = [];
    for (const shelterSupply of shelterSupplies) {
      if (shelterSupply.priority === SupplyPriority.Remaining) needing.push(shelterSupply);
      if (shelterSupply.priority === SupplyPriority.Needing) needing.push(shelterSupply);
      if (shelterSupply.priority === SupplyPriority.Urgent) urgent.push(shelterSupply);
    }
    return { remaining, needing, urgent };
  }, [shelterSupplies]);

  return (
    <Modal open={open} onOpenChange={onOpenChange} className="pt-11">
      <Items shelterSupplies={urgent} />
      <Items shelterSupplies={needing} />
      <Items shelterSupplies={remaining} />
    </Modal>
  );
}
