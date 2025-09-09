import { useNavigate, useParams } from '@tanstack/react-router';
import SourcesGridView from '../components/source/SourcesGridView.tsx';
import { useSources } from '../hooks/useSources';
import Source from '../models/source.ts';
import { useCorpus } from '../hooks/useCorpora.ts';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
/**
 * SourcePage will display all sources inside a corpus
 * @constructor
 */
const SourcesPage = () => {
	const { corpusid } = useParams({ from: '/corpora/$corpusid/sources' });
	const corpusidSearchParams = Number(corpusid);
	const navigate = useNavigate();

	const handleSourceSelection = (source: Source): Promise<void> => navigate({ to: `/corpora/${source.corpusID}/sources/${source.id}` });

	const { data: sources, isLoading, isError, error } = useSources(corpusidSearchParams);
	const { data: corpusData, isLoading: isCorpusDataLoading, isError: isCorpusError, error: corpusError } = useCorpus(corpusidSearchParams);

	if (isLoading) {
		return <p>corpus is loading</p>;
	}

	if (isError) {
		return <p>{error?.message}</p>;
	}

	if (sources && corpusData) {
		return (
			<Box>
				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
					<Stack>
						<Typography variant={'h5'}>Corpus overview</Typography>
						<Typography>Title: {corpusData.title}</Typography>
						<Typography>Corpus id: {corpusData.id}</Typography>
					</Stack>

					<Box>
						<IconButton aria-label="AddIcon">
							<AddIcon />
						</IconButton>
						<IconButton aria-label="DeleteIcon">
							<DeleteIcon />
						</IconButton>
						<IconButton aria-label="EditIcon">
							<EditIcon />
						</IconButton>
					</Box>
				</Stack>
				<Stack sx={{ paddingTop: 5 }}>
					<SourcesGridView sources={sources} onSourceSelection={(source: Source) => handleSourceSelection(source)} />{' '}
				</Stack>
			</Box>
		);
	}

	return <p>no source found</p>;
};
export default SourcesPage;
