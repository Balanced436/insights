import {useNavigate, useParams} from '@tanstack/react-router';
import { useSources } from '../hooks/useSources.ts';
import SourcesGridView from '../components/source/SourcesGridView.tsx';
import Source from '../models/source.ts';
import {Box, Typography, Button, IconButton, TextField, Breadcrumbs, Link, Divider, Stack} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CorpusSearchBar from "../components/corpus/CorpusSearchBar.tsx";

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
				<Breadcrumbs aria-label="breadcrumb">
					<Link underline="hover" color="inherit" href="/">
						Corpora
					</Link>
					<Link underline="hover" color="inherit" href="/">
						Sources
					</Link>
					<Typography sx={{ color: 'text.primary' }}>Dashboard</Typography>
				</Breadcrumbs>
				<CorpusSearchBar/>

				<Box>
					<Stack orientation={"row"} justifyContent={"space-between"}>
							<Typography variant={"subtitle1"}>The content of this corpus</Typography>
							<AddIcon>
						</AddIcon>

					</Stack>
					<SourcesGridView
						sources={sources}
						onSourceSelection={handleSourceSelection}
					/>
				</Box>

            </Box>
		);
	}
	return <p>no corpus found</p>;
};

export default CorpusInfosPage;
