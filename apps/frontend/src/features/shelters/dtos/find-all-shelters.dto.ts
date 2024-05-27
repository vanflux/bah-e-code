export interface FindAllSheltersDto {
  latitude: number;
  longitude: number;
  search?: string;
  needVolunteers?: boolean;
  needPsico?: boolean;
  petFriendly?: boolean;
  page?: number;
  perPage?: number;
}
