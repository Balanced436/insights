import { useQuery } from "@tanstack/react-query";
import CorpusType from "../models/corpus.ts";

export const useCorpora = () => {
  return useQuery({
    queryKey: ["corpora"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/corpus");
      if (!response.ok) {
        throw new Error(`Error fetching corpus: ${response.status}`);
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    select: (data: CorpusType[]) => data,
  });
};

export const useCorpus = (corpusid: number) => {
  return useQuery({
    queryKey: ["corpus", corpusid],
    queryFn: async () => {
      const response = await fetch(`http://localhost:4000/corpus/${corpusid}`);
      if (!response.ok) {
        throw new Error(`Error fetching corpus: ${response.status}`);
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    select: (data: CorpusType) => data,
  });
};
