import { SupplyDto } from './supply.dto';

export interface ShelterSupplyDto {
  shelterSupplyId: string;
  shelterId: string;
  supplyId: string;
  priority: number;
  quantity?: number;
  supply?: SupplyDto;
}
