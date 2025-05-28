import CorpusType from '../models/corpus.ts'

import {Button, Card, CardActions, CardHeader} from "@mui/material";

/**
 *
 * A component that renders one corpus
 *
 * @param {CorpusType} corpus - The corpus to display
 *
 */
export default function Corpus({corpus}: { corpus: CorpusType }) {
    return <Card>
        <CardHeader
            title={corpus.title}
            subheader={corpus.description}
        />
        <CardActions>
            <Button size="small">Access</Button>
        </CardActions>
    </Card>
}
