import { UseQueryOptions, keepPreviousData } from '@tanstack/react-query';

export type QueryOptions = {
  enabled?: boolean;
  staleTime?: number;
  keepPreviusData?: boolean;
};

export function buildOptions(options: QueryOptions = {}) {
  return {
    enabled: options.enabled,
    staleTime: options.staleTime,
    placeholderData: options.keepPreviusData ? keepPreviousData : undefined,
  };
}
