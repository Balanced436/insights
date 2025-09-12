import { Outlet, useNavigate, useParams } from '@tanstack/react-router';
import { useSources } from '../hooks/useSources';
import Source from '../models/source.ts';
import { useCorpus } from '../hooks/useCorpora.ts';
import { Box } from '@mui/material';
import CorpusSideBarNavigation from '../components/corpus/CorpusSideBarNavitation.tsx';

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
			<Box display={'flex'}>
				{/* replace this with a specific navigation for corpus */}
				<CorpusSideBarNavigation corpus={corpusData} />
				<Outlet />
			</Box>
		);
	}

	return <p>no source found</p>;
};
export default SourcesPage;
