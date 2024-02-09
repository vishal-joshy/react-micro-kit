import { useQuery } from '@tanstack/react-query';

import { fetch } from '@/lib/fetch';

import { Cat } from '../types';

export const getCats = async (): Promise<Cat[]> => {
  const res = await fetch.get('images/search?limit=10');
  return res.data;
};

type UseUserOptions = {
  config?: object;
};

export default function useCats({ config }: UseUserOptions = {}) {
  return useQuery({
    ...config,
    queryKey: ['cats'],
    queryFn: () => getCats(),
  });
}
