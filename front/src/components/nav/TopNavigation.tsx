import { Box, AppBar, Toolbar, Button } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const TopNavigation = () => {
	const { user } = useContext(UserContext);

	return (
		<Box sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
			{/* Make it one step above the drawer */}
			<AppBar position="fixed">
				<Toolbar>
					<Box sx={{ flexGrow: 1 }}>
						<Button color="inherit" component={Link} to="/">
							Home
						</Button>
						<Button color="inherit" component={Link} to="/login">
							Login
						</Button>
						<Button color="inherit" component={Link} to="/corpora">
							Corpora
						</Button>
					</Box>
					<Button color="inherit">{user ? user.email : 'Guest'}</Button>
					{/*<Avatar>GU</Avatar>*/}
				</Toolbar>
			</AppBar>
			<Toolbar />
		</Box>
	);
};
export default TopNavigation;
