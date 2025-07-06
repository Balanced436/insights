import { Box, Stack, Typography } from "@mui/material";
import LoginForm from "../components/forms/LoginForm";

const LoginPage = () => {
  return (
    <Stack
      sx={{ justifyContent: "center", alignItems: "center", height: "100%" }}
    >
      <Box width={"500px"}>
        <LoginForm
          onSubmit={function (event: {
            email: string;
            password: string;
          }): void {
            throw new Error("Function not implemented.");
          }}
          variant={"filled"}
        />
      </Box>
    </Stack>
  );
};

export default LoginPage;
