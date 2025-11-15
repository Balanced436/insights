import { IconButton, InputAdornment, Stack, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

type corpusSearchBarProps = {
	onAddSourceClick: () => void;
	onSearchBarChange: () => void;
	onDateChange: () => void;
};
const CorpusSearchBar = ({ onSearchBarChange, onDateChange, onAddSourceClick }: corpusSearchBarProps) => {
	return (
		<Stack marginY={'1em'} direction={'row'} justifyContent={'space-between'}>
			<Stack direction={'row'}>
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
				<Button>Search</Button>
				<Button onClick={onAddSourceClick}>Add source</Button>
			</Stack>
		</Stack>
	);
};

export default CorpusSearchBar;
