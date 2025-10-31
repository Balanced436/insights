import {Box, IconButton, InputAdornment, Stack, TextField, Button, Typography} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers"
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';


type corpusSearchBarProps = {
    onAddSourceClick: () => {},
    onSearchBarChange: () => {},
    onDateChange: () => {},
}
const CorpusSearchBar = () => {
    return (
        <Stack marginY={'1em'} direction={"row"} justifyContent={'space-between'}>

            <Stack direction={"row"}>
                <TextField
                    placeholder={'Search a corpus'}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton aria-label="AddIcon">
                                        <CloseIcon/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <Button>Search</Button>
            </Stack>
        </Stack>
    );
};

export default CorpusSearchBar;
