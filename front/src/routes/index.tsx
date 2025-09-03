import { createRoute } from '@tanstack/react-router';
import rootRoute from './root';
import LandingPage from '../pages/LandingPage';

export const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	component: LandingPage,
});

export default indexRoute;
