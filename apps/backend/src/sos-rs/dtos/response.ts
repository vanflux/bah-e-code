export interface SosRsResponse<T> {
  statusCode: number;
  message?: string;
  data: T;
}
