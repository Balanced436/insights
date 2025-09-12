import Summary from '../../models/Summary.ts';
import { Typography } from '@mui/material';
import Markdown from 'react-markdown';
function SummaryItem({ summary }: { summary: Summary }) {
	return <Markdown>{summary.content}</Markdown>;
}
function Summaries({ summaries }: { summaries: Summary[] }) {
	if (summaries.length == 0) {
		return <Typography>No summary found for this source.</Typography>;
	}
	return summaries.map((e: Summary) => <SummaryItem key={e.id} summary={e} />);
}

export default Summaries;
