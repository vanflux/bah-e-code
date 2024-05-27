import { useInfiniteQuery } from '@tanstack/react-query';
import { GetSheltersToReceiveDonationsDto } from '../dtos';
import { getSheltersToReceiveDonations } from '../api';

export function useSheltersToReceiveDonation(body: GetSheltersToReceiveDonationsDto, enabled: boolean) {
  const page = body.page ?? 1;
  const perPage = body.perPage ?? 25;
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getSheltersToReceiveDonations({ ...body, ...pageParam }),
    queryKey: ['shelters', 'receive', body],
    initialPageParam: { page, perPage },
    getNextPageParam: (lastPage) => {
      const pages = Math.ceil(lastPage.total / perPage);
      if (page >= pages) return;
      return { page: page + 1, perPage };
    },
    getPreviousPageParam: () => {
      if (page <= 1) return;
      return { page: page - 1, perPage };
    },
    enabled,
  });
}
