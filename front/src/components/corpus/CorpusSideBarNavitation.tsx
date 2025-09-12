import Corpus from '../../models/corpus.ts';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Divider, Stack } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import ListAltIcon from '@mui/icons-material/ListAlt';
interface CorpusSideBarNavigationProps {
	corpus?: Corpus;
}

const CorpusSideBarNavigation = ({ corpus }: CorpusSideBarNavigationProps) => {
	return (
		<Drawer
			variant="permanent"
			sx={{
				width: 300,
				[`& .MuiDrawer-paper`]: {
					width: 300,
					boxSizing: 'border-box',
				},
			}}
		>
			<Toolbar />
			<Stack direction={'row'} justifyContent={'center'} sx={{ px: 2, py: 2 }}>
				<Typography variant="overline" noWrap>
					{corpus?.title ?? 'Corpus title'}
				</Typography>
			</Stack>

			<Divider />

			<Box sx={{ overflow: 'auto' }}>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText primary={'Dashboard'} />
					</ListItemButton>
				</ListItem>

				<List>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<ListAltIcon />
							</ListItemIcon>
							<ListItemText primary={'Tasks'} />
						</ListItemButton>
					</ListItem>

					<ListItem disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<SettingsIcon />
							</ListItemIcon>
							<ListItemText primary={'Corpus settings'} />
						</ListItemButton>
					</ListItem>
				</List>
			</Box>
		</Drawer>
	);
};

export default CorpusSideBarNavigation;
