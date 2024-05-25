import { SosRsShelterSupply } from './shelter-supply';

export interface SosRsShelter {
  id: string;
  name: string;
  pix?: string;
  address: string;
  street?: string;
  neighbourhood?: string;
  city?: string;
  streetNumber?: string;
  zipCode?: string;
  capacity?: number;
  petFriendly?: boolean;
  shelteredPeople?: number;
  prioritySum: number;
  verified: boolean;
  latitude?: number;
  longitude?: number;
  actived: boolean;
  category: string;
  createdAt: string;
  updatedAt: string;
  shelterSupplies: SosRsShelterSupply[];
}
