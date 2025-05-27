import {useQuery} from '@tanstack/react-query'
import * as _ from 'lodash'
import Source from '../models/source'

const fetchSources = async () => {
    const response = await fetch('http://localhost:4000/source')
    if (!response.ok) {
        throw new Error(`Error fetching sources: ${response.status}`)
    }
    return response.json()
}

export const useSources = () => {
    return useQuery({
        queryKey: ['sources'],
        queryFn: fetchSources,
        select: (data) => {
            return _.map(data, (source) =>
                new Source(
                    source.id,
                    source.title,
                    source.description,
                    source.audioUrl,
                    source.videoUrl,
                    source.createdAt,
                    source.updatedAt
                )
            )
        }
    })
}
