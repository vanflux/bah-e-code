import { httpClient } from '../../../services/http-client';
import { WaterLevelDto } from '../dtos';

export const getLastWaterLevels = async (riverId: string, days: number) => {
  return httpClient.get<WaterLevelDto[]>(`/v1/rivers/${riverId}/water-levels/last`, { params: { days } }).then((res) => res.data);
};
