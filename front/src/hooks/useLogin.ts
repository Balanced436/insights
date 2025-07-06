import { useMutation } from "@tanstack/react-query";

interface Credentials {
  email: string;
  password: string;
}

const authenticateUser = async (userCredentials: Credentials) => {
  const response = await fetch("http://localhost:4000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userCredentials),
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.status}`);
  }

  return response.json();
};

export const useAuthentification = () => {
  return useMutation({
    mutationFn: authenticateUser,
  });
};
