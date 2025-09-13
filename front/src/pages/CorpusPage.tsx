import {useNavigate, useParams} from '@tanstack/react-router';
import { useSources } from '../hooks/useSources.ts';
import SourcesGridView from '../components/source/SourcesGridView.tsx';
import Source from '../models/source.ts';
import {Box} from "@mui/material";

const CorpusInfosPage = () => {
	const { corpusid } = useParams({ from: '/corpora/$corpusid/sources' });
	const id = Number(corpusid);
    const navigate = useNavigate()
    const handleSourceSelection = (source: Source): Promise<void> => navigate({ to: `/corpora/${source.corpusID}/sources/${source.id}` });


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
            <Box sx={{p:"1em"}}>
                <SourcesGridView
                    sources={sources}
                    onSourceSelection={handleSourceSelection}
                />

            </Box>
		);
	}
	return <p>no corpus found</p>;
};

export default CorpusInfosPage;
