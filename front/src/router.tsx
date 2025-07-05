import { createRouter } from "@tanstack/react-router";
import indexRoute from "./routes";
import loginRoute from "./routes/login";
import rootRoute from "./routes/root";

const routeTree = rootRoute.addChildren([indexRoute, loginRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
