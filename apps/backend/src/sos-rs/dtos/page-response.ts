import { SosRsResponse } from './response';

export type SosRsPageResponse<T> = SosRsResponse<{
  page: number;
  perPage: number;
  count: number;
  results?: T[];
}>;
