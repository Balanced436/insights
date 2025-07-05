import { Outlet } from "@tanstack/react-router";
import TopNavigation from "./components/nav/TopNavigation";
export default function App() {
  return (
    <>
      <TopNavigation />
      <Outlet />
    </>
  );
}
