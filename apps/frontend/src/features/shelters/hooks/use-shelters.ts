import { useInfiniteQuery } from '@tanstack/react-query';
import { FindAllSheltersDto } from '../dtos';
import { findAllShelters } from '../api';

export function useShelters(body: FindAllSheltersDto) {
  const page = body.page ?? 1;
  const perPage = body.perPage ?? 25;
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => findAllShelters({ ...body, ...pageParam }),
    queryKey: ['shelters', body],
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
  });
}
