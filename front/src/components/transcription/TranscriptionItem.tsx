import Transcription from '../../models/transcription.ts';
import { Typography } from '@mui/material';

export default function TranscriptionItem({ transcriptions }: { transcriptions: Transcription[] }) {
	if (transcriptions.length === 0) {
		return <Typography>No transcriptions found.</Typography>;
	} else {
		return <Typography>{transcriptions[0].content}</Typography>;
	}
}
