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
    /**
     * TODO: Define available navigations items : Dashboard, Tasks, Corpus Settings maybe using composite components
     * or juste use the corpusData props to know where to navigate
     */


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
                <Box component="main" sx={{ flexGrow: 1, minWidth: '300px'}}>
				    <Outlet />
                </Box>
			</Box>
		);
	}

	return <p>no source found</p>;
};
export default SourcesPage;
