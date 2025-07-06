import { Box, AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "@tanstack/react-router";

const TopNavigation = () => {
  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
};
export default TopNavigation;
