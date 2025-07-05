import { Link } from "@tanstack/react-router";

const TopNavigation = () => {
  return (
    <nav>
      <Link to="/">Home</Link> <Link to="/login">Login page</Link>
    </nav>
  );
};
export default TopNavigation;
