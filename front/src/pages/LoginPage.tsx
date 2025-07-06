import { Box, Stack } from "@mui/material";
import LoginForm from "../components/forms/LoginForm";
import { useAuthentification } from "../hooks/useLogin";

interface Credentials {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { mutate: login, isPending, error, data } = useAuthentification();

  const handleLogin = (userCredentials:Credentials) => {
    login(
      userCredentials,
      {
        onSuccess: (response) => {
          const token = response.token;
          console.info(token)
        },
      }
    );
  };

  return (
    <Stack
      sx={{ justifyContent: "center", alignItems: "center", height: "100%" }}
    >
      <Box width={"500px"}>
        <LoginForm onSubmit={handleLogin} variant={"filled"} />
      </Box>
    </Stack>
  );
};

export default LoginPage;
