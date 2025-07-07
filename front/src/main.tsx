import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import "./index.css";
import indexRoute from "./routes";
import loginRoute from "./routes/login";
import rootRoute from "./routes/root";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const routeTree = rootRoute.addChildren([indexRoute, loginRoute]);
const queryClient = new QueryClient();
import  UserProvider  from "./contexts/UserContext"; 

export const router = createRouter({ routeTree, context: queryClient });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </UserProvider>
  </StrictMode>,
);
