export interface FindAllSheltersDto {
  latitude: number;
  longitude: number;
  search?: string;
  needVolunteers?: boolean;
  needPsico?: boolean;
  needSupplyCategoryId?: string;
  petFriendly?: boolean;
  page?: number;
  perPage?: number;
}
