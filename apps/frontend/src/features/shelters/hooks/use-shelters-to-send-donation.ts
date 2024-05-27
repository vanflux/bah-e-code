import { useInfiniteQuery } from '@tanstack/react-query';
import { GetSheltersToSendDonationsDto } from '../dtos';
import { getSheltersToSendDonations } from '../api';

export function useSheltersToSendDonation(body: GetSheltersToSendDonationsDto, enabled: boolean) {
  const page = body.page ?? 1;
  const perPage = body.perPage ?? 25;
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getSheltersToSendDonations({ ...body, ...pageParam }),
    queryKey: ['shelters', 'send', body],
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
