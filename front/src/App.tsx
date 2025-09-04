import { Outlet } from '@tanstack/react-router';
import HeaderNavigation from './components/nav/HeaderNavigation.tsx';
import { Box, Stack } from '@mui/material';

/**
 * Main entry point for the application. This styling ensure that the outlet take up
 * all vertical space - height(HeaderNavigation).
 * @returns
 */
export default function App() {
	return (
		<Stack direction={'column'} sx={{ height: '100%' }}>
			<HeaderNavigation />
			<Box sx={{ flex: 1 }}>
				<Outlet />
			</Box>
		</Stack>
	);
}
