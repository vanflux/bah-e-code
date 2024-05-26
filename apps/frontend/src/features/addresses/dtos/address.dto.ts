export interface AddressDto {
  addressId: string;
  userId: string;
  name: string;
  street: string;
  neighbourhood: string;
  city: string;
  streetNumber: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
  alertsEnabled: boolean;
  donationsEnabled: boolean;
  volunteersEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}
