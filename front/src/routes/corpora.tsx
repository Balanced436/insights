import { createRoute, Outlet } from "@tanstack/react-router";
import rootRoute from "./root";
import CorporaPage from "../pages/CorporaPage";
import { CorporaProvider } from "../contexts/CorporaContext";
import CorpusPage from "../pages/CorpusPage";

export const corporaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/corpora",
  component: () => (
    <CorporaProvider>
      <CorporaPage />
    </CorporaProvider>
  ),
});

// route /corpora displays corpora
export const corporaIndexRoute = createRoute({
  getParentRoute: () => corporaRoute,
  path: "/",
  component: () => <p>Corpora index</p>,
});

// route /corpora/:id displays a specific corpus
export const corpusDetailRoute = createRoute({
  getParentRoute: () => corporaRoute,
  path: "$id",
  component: CorpusPage,
});

// route /corpora/:id/edit
export const corpusEditRoute = createRoute({
  getParentRoute: () => corporaRoute,
  path: "$id/edit",
  component: () => <p>edit a specific corpus</p>,
});

export default corporaRoute;
