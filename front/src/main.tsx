import { createRoot } from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import './index.css';
import indexRoute from './routes';
import loginRoute from './routes/login';
import rootRoute from './routes/root';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import corporaRootRoute, { corporaListRoute, corpusEditRoute, corpusSourcesRoute, corpusSourceRoute, corpusSourcesRootRoute } from './routes/corpora';

const routeTree = rootRoute.addChildren([
	indexRoute,
	loginRoute,
	corporaRootRoute.addChildren([corporaListRoute, corpusEditRoute, corpusSourcesRoute.addChildren([corpusSourcesRootRoute]), corpusSourceRoute]),
]);

const queryClient = new QueryClient();
import UserProvider from './contexts/UserContext';

export const router = createRouter({ routeTree, context: queryClient });

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

createRoot(document.getElementById('root')!).render(
	<UserProvider>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</UserProvider>
);
