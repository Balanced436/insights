import { Outlet } from '@tanstack/react-router';
import TopNavigation from './components/nav/TopNavigation';
import { Box, Stack } from '@mui/material';

/**
 * Main entry point for the application. This styling ensure that the outlet take up
 * all vertical space - height(TopNavigation).
 * @returns
 */
export default function App() {
	return (
		<Stack direction={'column'} sx={{ height: '100%' }}>
			<TopNavigation />
			<Box sx={{ flex: 1 }}>
				<Outlet />
			</Box>
		</Stack>
	);
}
