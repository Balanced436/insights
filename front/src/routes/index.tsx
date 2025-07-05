import { createRoute } from "@tanstack/react-router";
import rootRoute from "./root";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <p>Landing page router</p>,
});

export default indexRoute;
