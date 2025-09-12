import { useCorpora } from '../hooks/useCorpora';
import { useNavigate } from '@tanstack/react-router';
import { Box, Stack } from '@mui/material';
import Corpus from '../models/corpus.ts';
import CorpusView from '../components/corpus/CorpusView.tsx';
import { Typography } from '@mui/material';

const CorporaPage = () => {
	const { data, isLoading } = useCorpora();
	const navigate = useNavigate();

	/**
	 * handleCorpusSection
	 *
	 * Navigate to the route /corpora/$corpusid
	 * @param corpusid
	 * @returns void
	 */
	const handleCorpusSection = (corpus: Corpus) => navigate({ to: `/corpora/${corpus.id}/sources` });

	if (isLoading) return <p>corpora is loading</p>;
	if (data)
		return (
			<Stack justifyContent="center" direction={'row'} height={'100%'}>
				<Stack sx={{ width: '60%', border: '' }}>
					<Stack direction="row" justifyContent={'space-between'} marginTop={'1em'}>
						<Stack>
							<Typography variant={'h5'}>Corpus overview</Typography>
							<Typography>Your corpus</Typography>
						</Stack>
					</Stack>
					<Box marginTop={'20px'}>
						<CorpusView corpora={data} onCorpusSelection={handleCorpusSection} display={'CARDS'} />
					</Box>
				</Stack>
			</Stack>
		);
	return <p>no corpora found</p>;
};

export default CorporaPage;
