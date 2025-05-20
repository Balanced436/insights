import { Button, Stack, TextField } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type LoginProps = {
  onSubmit: (event: { email: string; password: string }) => void;
  variant: "outlined" | "standard" | "filled";
};

/**
 * Composant Login permettant d'afficher un formulaire de connexion.
 *
 * @param {LoginProps} props - Les propriétés du composant
 * @param {function} props.onSubmit - Fonction de gestion de la soumission du formulaire
 * @param {string} props.variant
 */
export default function Login({ onSubmit, variant }: LoginProps) {
  const schema = z.object({
    email: z.string().min(1, { message: "Email requis" }).email({ message: "Format d'email invalide" }),
    password: z.string().min(1, { message: "Mot de passe requis" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} width={500}>
        <TextField
          required
          {...register("email")}
          label="Email"
          type="email"
          id="email"
          size="small"
          variant={variant}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          required
          {...register("password")}
          label="Mot de passe"
          id="password"
          type="password"
          size="small"
          variant={variant}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button type="submit" variant="contained">
          Se connecter
        </Button>
      </Stack>
    </form>
  );
}
