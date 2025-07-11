import { useContext } from "react"
import { CorporaContext } from "../contexts/CorporaContext"
import { useParams } from "@tanstack/react-router"
import CorpusType from "../models/corpus"
import { Stack } from "@mui/material"


const CorpusPage = () => {
    const { corpora } = useContext(CorporaContext)
    const id = Number(useParams({ from: '/corpora/$id' }).id)
    if (isNaN(id) || id < 0 || id > corpora.length) {
        // TODO: use zod to validate params inside createRoute option
        throw Error('ID ERROR')
    }
    const selectedCorpus: CorpusType = corpora[id]
    return <Corpus corpus={selectedCorpus} />
}

export default CorpusPage


export const Corpus = ({ corpus }: { corpus: CorpusType }) => {
    return <Stack direction={'column'}>
        <span>
            Corpus title: {corpus.title}
        </span>
        <span>
            Corpus ID {corpus.id}
        </span>
        <span>
            Created at {corpus.createdAt.toString()}
        </span>
    </Stack>
}