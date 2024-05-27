import { useQuery } from '@tanstack/react-query';
import { getShelterPoints } from '../api';

export const useShelterPoints = () => {
  return useQuery({
    queryKey: ['shelters', 'points'],
    queryFn: () => getShelterPoints(),
  });
};
