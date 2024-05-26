export interface CreateAddressDto {
  name?: string;
  street?: string;
  neighbourhood?: string;
  city: string;
  streetNumber?: number;
  zipCode?: string;
  alertsEnabled?: boolean;
  donationsEnabled?: boolean;
  volunteersEnabled?: boolean;
}
