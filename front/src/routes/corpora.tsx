import { createRoute } from "@tanstack/react-router";
import rootRoute from "./root";
import CorporaPage from "../pages/CorporaPage";

export const corporaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/corpora",
  component: CorporaPage,
});

export default corporaRoute;
