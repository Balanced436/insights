import { useNavigate, useParams } from '@tanstack/react-router';
import SourcesGrid from '../components/Source/SourcesGrid.tsx';
import { useSources } from '../hooks/useSources';
import Source from '../models/source.ts';

/**
 * SourcePage will display all sources inside a corpus
 * @constructor
 */
const SourcesPage = () => {
	const { corpusid } = useParams({ from: '/corpora/$corpusid/sources' });
	const corpusidSearchParams = Number(corpusid);
	const navigate = useNavigate();

	// TODO : Switch to this signature (source: Source) : Promise<void>
	const handleSourceSelection = (source: Source): Promise<void> => navigate({ to: `/corpora/${source.corpusID}/sources/${source.id}` });

	const { data: sources, isLoading, isError, error } = useSources(corpusidSearchParams);

	if (isLoading) {
		return <p>corpus is loading</p>;
	}

	if (isError) {
		return <p>{error?.message}</p>;
	}

	if (sources) {
		return (
			<div>
				<SourcesGrid sources={sources} onSourceSelection={(source: Source) => handleSourceSelection(source)} />{' '}
			</div>
		);
	}

	return <p>no source found</p>;
};
export default SourcesPage;
