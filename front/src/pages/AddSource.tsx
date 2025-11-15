import { Box, Breadcrumbs, Link, Stack, Typography } from '@mui/material';
import SourceNewForm from '../components/source/SourceNewForm.tsx';
import { useParams } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { NewSource } from '../models/source.ts';

const AddSource = () => {
	const { corpusid } = useParams({ from: '/corpora/$corpusid/sources' });

	const source = useMutation({
		mutationFn: async (s: NewSource) => {
			const formdata = new FormData();
			formdata.append('title', s.title);
			formdata.append('description', s.description);
			formdata.append('corpusID', corpusid);
			formdata.append('audio', s.audio);
			formdata.append('video', s.video);

			const requestOptions = {
				method: 'POST',
				body: formdata,
			};
			try {
				const response = await fetch('http://localhost:4000/source', requestOptions);
				const result_1 = await response.text();
				return console.log(result_1);
			} catch (error) {
				return console.error(error);
			}
		},
	});

	return (
		<Box>
			<Breadcrumbs aria-label="breadcrumb">
				<Link underline="hover" color="inherit" href="/">
					Corpora
				</Link>
				<Link underline="hover" color="inherit" href="/">
					Sources
				</Link>
				<Typography sx={{ color: 'text.primary' }}>New</Typography>
			</Breadcrumbs>
			<Typography>Create a new source</Typography>
			<Stack direction={'row'} justifyContent={'center'}>
				<SourceNewForm onSubmit={source.mutate} />
			</Stack>
		</Box>
	);
};

export default AddSource;
