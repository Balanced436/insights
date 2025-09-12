import { useParams } from '@tanstack/react-router';
import { useSources } from '../hooks/useSources.ts';
import SourcesGridView from '../components/source/SourcesGridView.tsx';
import Source from '../models/source.ts';

const CorpusInfosPage = () => {
	const { corpusid } = useParams({ from: '/corpora/$corpusid/sources' });
	const id = Number(corpusid);

	if (isNaN(id)) {
		throw new Error('ID ERROR');
	}
	const { data: sources, isLoading, isError, error } = useSources(id);

	if (isLoading) {
		return <p>corpus is loading</p>;
	}

	if (isError) {
		return <p>{error?.message}</p>;
	}

	if (sources) {
		return (
			<SourcesGridView
				sources={sources}
				onSourceSelection={function (source: Source): void {
					throw new Error('Function not implemented.');
				}}
			/>
		);
	}
	return <p>no corpus found</p>;
};

export default CorpusInfosPage;
