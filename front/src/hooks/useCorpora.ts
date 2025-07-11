import { useQuery } from "@tanstack/react-query";
import CorpusType from "../models/corpus.ts";

const fetchCorpuses = async () => {
  const response = await fetch("http://localhost:4000/corpus");
  if (!response.ok) {
    throw new Error(`Error fetching corpus: ${response.status}`);
  }
  return response.json();
};

export const useCorpora = () => {
  return useQuery({
    queryKey: ["corpuses"],
    queryFn: fetchCorpuses,
    staleTime: 1000 * 60 * 5, // 5 minutes sans refetch
    gcTime: 1000 * 60 * 10, // garde en mémoire pendant 10 min
    select: (data: CorpusType[]) => data,
  });
};
