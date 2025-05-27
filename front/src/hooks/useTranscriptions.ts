import {useQuery} from '@tanstack/react-query'
import * as _ from 'lodash'
import Transcription from '../models/transcription'

const fetchTranscriptions = async () => {
    const response = await fetch('http://localhost:4000/transcription')
    if (!response.ok) {
        throw new Error(`Error fetching transcriptions: ${response.status}`)
    }
    return response.json()
}

export const useTranscriptions = () => {
    return useQuery({
        queryKey: ['transcriptions'],
        queryFn: fetchTranscriptions,
        select: (data) => {
            return _.map(data, (transcription) =>
                new Transcription(
                    transcription.id,
                    transcription.content,
                    transcription.createdAt,
                    transcription.updatedAt,
                    transcription.sourceId,
                )
            )
        }
    })
}