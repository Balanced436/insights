import { Box, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const CorpusSearchBar = () => {
	return (
		<Stack marginTop={'2em'} direction="row" justifyContent={'center'}>
			<Box>
				<TextField
					placeholder={'Search a corpus'}
					slotProps={{
						input: {
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position="end">
									<IconButton aria-label="AddIcon">
										<CloseIcon />
									</IconButton>
								</InputAdornment>
							),
						},
					}}
				/>
			</Box>
		</Stack>
	);
};

export default CorpusSearchBar;
