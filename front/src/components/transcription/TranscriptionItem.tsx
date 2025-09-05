import Transcription from '../../models/transcription.ts';
import {Stack, Typography} from '@mui/material';

function TranscriptionItem({transcription}: { transcription: Transcription }) {
        return <Typography>content: {transcription.content}</Typography>;
}

export default function Transcriptions({transcriptions}: { transcriptions: Transcription[] }) {
    if (transcriptions.length === 0) {
        return <Typography>No transcriptions found.</Typography>;
    } else {
        return transcriptions.map((transcription:Transcription)=>{
            return <Stack>
                <Typography> transcription id: {transcription.id} </Typography>
                <TranscriptionItem key = {transcription.id} transcription={transcription}></TranscriptionItem>
            </Stack>
        })
    }
}