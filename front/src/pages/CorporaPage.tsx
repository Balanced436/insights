import { useCorpora } from '../hooks/useCorpora';
import { Outlet, useNavigate } from '@tanstack/react-router';
import LeftCorporaNavigation from '../components/nav/LeftNavigation';
import { Box } from '@mui/material';
import Corpus from '../models/corpus.ts';

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
			<Box sx={{ display: 'flex' }}>
				<LeftCorporaNavigation corpora={data} onCorpusSelectSelection={handleCorpusSection} />
				<Box component="main" sx={{ flexGrow: 1, p: 3, minWidth: '300px', height: '100%' }}>
					<Outlet />
				</Box>
			</Box>
		);
	return <p>no corpora found</p>;
};

export default CorporaPage;
