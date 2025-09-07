import { useQuery } from '@tanstack/react-query';
import Summary from '../models/Summary';

export const useGetSummariesBySourceid = (sourceid: number) => {
	return useQuery({
		queryKey: ['sourceid', sourceid],
		queryFn: async () => {
			const response = await fetch(`http://localhost:4000/summary?sourceid=${sourceid}`);
			if (!response.ok) {
				throw new Error(`Error fetching corpus: ${response.status}`);
			}
			return response.json();
		},
		staleTime: 1000 * 60 * 5,
		gcTime: 1000 * 60 * 10,
		select: (r): Summary[] => r.data,
	});
};
