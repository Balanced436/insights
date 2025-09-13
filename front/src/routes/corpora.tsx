import { createRoute, Outlet } from '@tanstack/react-router';
import rootRoute from './root';
import CorporaPage from '../pages/CorporaPage';
import CorpusInfosPage from '../pages/CorpusPage';
import SourcesPage from '../pages/SourcesPage.tsx';
import SourcePage from '../pages/SourcePage.tsx';

//TODO: Find a better naming convention for routes
export const corporaRootRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/corpora',
	component: () => <Outlet />,
});

// route /corpora displays corpora
export const corporaListRoute = createRoute({
	getParentRoute: () => corporaRootRoute,
	path: '/',
	component: CorporaPage,
});

// route /corpora/:id displays a specific corpus
export const corpusSourcesRoute = createRoute({
	getParentRoute: () => corporaRootRoute,
	path: '$corpusid/sources',
	component: SourcesPage,
});

// List all sources related to a specific corpus
export const corpusSourcesRootRoute = createRoute({
	getParentRoute: () => corpusSourcesRoute,
	path: '/',
	component: CorpusInfosPage,
});

// Display a specific source inside of a corpus
export const corpusSourceRoute = createRoute({
	getParentRoute: () => corpusSourcesRoute,
	path: '$sourceid',
	component: SourcePage,
});

// route /corpora/:id/edit
export const corpusEditRoute = createRoute({
	getParentRoute: () => corporaRootRoute,
	path: '$corpusid/edit',
	component: () => <p>edit a specific corpus</p>,
});

export default corporaRootRoute;
