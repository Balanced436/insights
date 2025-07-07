import { Box, Stack } from "@mui/material";
import LoginForm from "../components/forms/LoginForm";
import { useAuthentification } from "../hooks/useLogin";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

interface Credentials {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { mutate: login, isPending, error, data } = useAuthentification();
  const { setUser } = useContext(UserContext);

  const handleLogin = (userCredentials:Credentials) => {
    login(
      userCredentials,
      {
        onSuccess: (response) => {
          localStorage.setItem("user", JSON.stringify(response))
          setUser(response)
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
