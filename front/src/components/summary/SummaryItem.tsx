import Summary from '../../models/Summary.ts';
import { Typography } from '@mui/material';
function SummaryItem({ sumary }: { sumary: Summary }) {
	return <Typography>{sumary.content}</Typography>;
}
function Summaries({ summaries }: { summaries: Summary[] }) {
	if (summaries.length == 0) {
		return <Typography>No summary found for this source.</Typography>;
	}
	return summaries.map((e: Summary) => <SummaryItem key={e.id} sumary={e} />);
}

export default Summaries;
