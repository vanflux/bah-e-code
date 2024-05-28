import { useQuery } from '@tanstack/react-query';
import { getLastWaterLevels } from '../api';

export const useLastWaterLevels = (riverId: string | undefined, days = 7) => {
  return useQuery({
    queryKey: ['rivers', riverId, 'water-levels', 'last', days],
    queryFn: () => getLastWaterLevels(riverId!, days),
    enabled: !!riverId,
  });
};
