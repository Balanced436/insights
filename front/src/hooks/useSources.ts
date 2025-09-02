import {useQuery} from "@tanstack/react-query";
import * as _ from "lodash";
import Source from "../models/source";

/**
 * Get all sources according to corpusid or all sources if corpusid is not defined
 * @param corpusid
 */
export const useSources = (corpusid: number | undefined) => {
    return useQuery({
        queryKey: ["sources", corpusid],
        queryFn: async () => {
            const url: URL = new URL("http://localhost:4000/source");
            if (corpusid) url.searchParams.append("corpusid", corpusid.toString());

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
                        source.corpusID
                    ),
            );
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
};

/**
 * Get a specific source by id
 * @param sourceid
 */
export const useSource = (sourceid: number) => {
    return useQuery({
        queryKey: ["source", sourceid],
        queryFn: async () => {
            const url: URL = new URL(`http://localhost:4000/source/${sourceid}`);

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error fetching sources: ${response.status}`);
            }
            return response.json();
        },
        select: (data: Source) => {
            return data
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,

    });
};
