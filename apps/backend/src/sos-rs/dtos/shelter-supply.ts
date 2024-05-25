import { SosRsSupply } from './supply';

export interface SosRsShelterSupply {
  shelterId: string;
  supplyId: string;
  priority: number;
  quantity?: number;
  createdAt: string;
  updatedAt?: string;
  supply: SosRsSupply;
  tags: ('NeedDonations' | 'NeedVolunteers' | string)[];
}
