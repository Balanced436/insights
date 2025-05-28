import CorpusType from '../models/corpus.ts'
import {Box, Button, Card, CardActions, CardHeader, IconButton} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';



/**
 *
 * A component that renders one corpus
 *
 * @param {CorpusType} corpus - The corpus to display
 *
 */
export default function Corpus({corpus}: { corpus: CorpusType }) {
    return (
        <Card>
            <CardHeader
                title={corpus.title}
                subheader={<CorpusSubheader corpus={corpus}/>}
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon/>
                    </IconButton>
                }
            />
            <CardActions>
                <Button size="small">Access</Button>
            </CardActions>
        </Card>)
}

/**
 *
 * A simple corpus header
 *
 * @param {CorpusType} corpus - The corpus to display
 *
 */
function CorpusSubheader({corpus}: { corpus: CorpusType }) {
    return (
        <div>
            <p>{corpus.description}</p>
            <p>Creation date: {new Intl.DateTimeFormat("fr-FR").format(corpus.createdAt)}</p>
            <p>Last update: {Intl.DateTimeFormat("fr-FR").format(corpus.createdAt)}</p>
        </div>)
}

/**
 * Display a list of corpus
 * @param corpuses
 * @constructor
 */
export function Corpuses({corpuses}: { corpuses: CorpusType[] }) {
    return <div>{corpuses.map((corp: CorpusType) => <Corpus corpus={corp}/>)}</div>
}