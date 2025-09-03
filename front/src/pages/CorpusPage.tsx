import { useParams } from '@tanstack/react-router';
import Corpus from '../models/corpus.ts';
import { Stack } from '@mui/material';
import { useCorpus } from '../hooks/useCorpora';

const CorpusInfosPage = () => {
	const corpusidSearchParams = useParams({ from: '/corpora/$corpusid/infos' });
	const id = Number(corpusidSearchParams);

	if (isNaN(id)) {
		throw new Error('ID ERROR');
	}

	const { data: corpus, isLoading, isError, error } = useCorpus(id);

	if (isLoading) {
		return <p>corpus is loading</p>;
	}

	if (isError) {
		return <p>{error?.message}</p>;
	}

	if (corpus) {
		return <CorpusInfos corpus={corpus} />;
	}
	return <p>no corpus found</p>;
};

export default CorpusInfosPage;

export const CorpusInfos = ({ corpus }: { corpus: Corpus }) => {
	return (
		<Stack direction={'column'}>
			<span>Corpus title: {corpus.title}</span>
			<span>Corpus ID {corpus.id}</span>
			<span>Created at {corpus.createdAt.toString()}</span>
		</Stack>
	);
};
