export interface ShelterDto {
  shelterId: string;
  name: string;
  pix?: string;
  address: string;
  street?: string;
  streetNumber?: number;
  neighbourhood?: string;
  city?: string;
  contact?: string;
  zipCode?: string;
  capacity?: number;
  petFriendly: boolean;
  shelteredPeople?: number;
  prioritySum: number;
  verified: boolean;
  latitude?: number;
  longitude?: number;
  actived: boolean;
  category: string;
  createdAt: string;
  updatedAt: string;
}
