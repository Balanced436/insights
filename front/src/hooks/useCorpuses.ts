import {useQuery} from '@tanstack/react-query'
import CorpusType from "../models/corpus.ts";

const fetchCorpuses = async () => {
    const response = await fetch('http://localhost:4000/corpus')
    if (!response.ok) {
        throw new Error(`Error fetching corpus: ${response.status}`)
    }
    return response.json()
}

export const useCorpuses = () => {
    return useQuery({
        queryKey: ['corpuses'],
        queryFn: fetchCorpuses,
        select: (data: CorpusType[]) => {
            data
        }
    })
}