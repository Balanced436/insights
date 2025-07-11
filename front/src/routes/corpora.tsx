import { createRoute } from "@tanstack/react-router";
import rootRoute from "./root";
import CorporaPage from "../pages/CorporaPage";
import { CorporaProvider } from "../contexts/CorporaContext";

export const corporaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/corpora",
  component: () => {
    return <CorporaProvider>
             <CorporaPage/>
          </CorporaProvider>
  },

});

export default corporaRoute;
