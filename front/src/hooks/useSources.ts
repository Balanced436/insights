import { useQuery } from "@tanstack/react-query";
import * as _ from "lodash";
import Source from "../models/source";

export const useSources = (corpusid: number | undefined) => {
  return useQuery({
    queryKey: ["sources", corpusid],
    queryFn: async () => {
      const url: URL = new URL("http://localhost:4000/source");
      corpusid && url.searchParams.append("corpusid", corpusid.toString());

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching sources: ${response.status}`);
      }
      return response.json();
    },
    select: (data) => {
      return _.map(
        data,
        (source) =>
          new Source(
            source.id,
            source.title,
            source.description,
            source.audioUrl,
            source.videoUrl,
            source.createdAt,
            source.updatedAt,
          ),
      );
    },
  });
};
