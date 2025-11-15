import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Button, Stack, TextField } from '@mui/material';
type sourceProps = {
	onSubmit: (event: any) => void;
};

function SourceNewForm({ onSubmit }: sourceProps) {
	const schema = z.object({
		title: z.string().min(1, { message: 'Le titre est requis' }),
		description: z.string().min(1, { message: 'La description est requise ' }),
		audio: z
			.custom<FileList>((val) => val instanceof FileList && val.length > 0, {
				message: 'Audio file is required',
			})
			.transform((fileList) => fileList[0]),
		video: z
			.custom<FileList>((val) => val instanceof FileList && val.length > 0, {
				message: 'Video file is required',
			})
			.transform((fileList) => fileList[0]),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: zodResolver(schema) });

	return (
		<form
			onSubmit={handleSubmit((data) => {
				console.info('Form submitted:', data);
				onSubmit(data);
			})}
		>
			<Stack spacing={3} width={500}>
				<TextField
					placeholder="The title of your source"
					{...register('title')}
					label="Title"
					size="small"
					error={!!errors.title}
					helperText={errors.title ? errors.title.message : ' '}
				/>
				<TextField
					{...register('description')}
					label="Description"
					placeholder="Short description of your source"
					size="small"
					error={!!errors.description}
					multiline
					rows={5}
					helperText={errors.description ? errors.description.message : ' '}
				/>

				<TextField
					placeholder={'Choisir un fichier audio'}
					variant="standard"
					type="file"
					label={'Audio'}
					{...register('audio')}
					helperText={errors.audio ? errors.audio.message : ' '}
					error={!!errors.audio}
				/>

				<TextField
					placeholder={'Choisir une vidéo'}
					variant="standard"
					type="file"
					label={'Vidéo'}
					{...register('video')}
					helperText={errors.video ? errors.video.message : ' '}
					error={!!errors.video}
				/>

				<Button type="submit" variant="contained">
					Soumettre
				</Button>
			</Stack>
		</form>
	);
}

export default SourceNewForm;
