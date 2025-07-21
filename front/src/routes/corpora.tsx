import { createRoute } from "@tanstack/react-router";
import rootRoute from "./root";
import CorporaPage from "../pages/CorporaPage";
import { CorporaProvider } from "../contexts/CorporaContext";
import CorpusInfosPage from "../pages/CorpusPage";
import SourcePage from "../pages/SourcePage";

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
export const corpusInfosRoute = createRoute({
  getParentRoute: () => corporaRoute,
  path: "$id/infos",
  component: CorpusInfosPage,
});

// route /corpora/:id displays a specific corpus
export const corpusSourcesRoute = createRoute({
  getParentRoute: () => corporaRoute,
  path: "$id/sources",
  component: SourcePage,
});

// route /corpora/:id/edit
export const corpusEditRoute = createRoute({
  getParentRoute: () => corporaRoute,
  path: "$id/edit",
  component: () => <p>edit a specific corpus</p>,
});

export default corporaRoute;
