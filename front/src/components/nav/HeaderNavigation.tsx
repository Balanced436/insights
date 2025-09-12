import { Box, AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const HeaderNavigation = () => {
	const { user } = useContext(UserContext);

	return (
		<Box sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
			{/* Make it one step above the drawer */}
			<AppBar position="fixed">
				<Toolbar>
					<Box sx={{ flexGrow: 1 }}>
						<Button color="inherit" component={Link} to="/">
							<Typography variant={'overline'}>Home</Typography>
						</Button>
						<Button color="inherit" component={Link} to="/login">
							<Typography variant={'overline'}>Login</Typography>
						</Button>
						<Button color="inherit" component={Link} to="/corpora">
							<Typography variant={'overline'}>Corpora</Typography>
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
export default HeaderNavigation;
