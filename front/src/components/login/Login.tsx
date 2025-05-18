import { Button, Stack, TextField } from "@mui/material";

type LoginProps = {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    variant: "outlined" | "standard" | "filled"
};

/**
 * Composant Login permettant d'afficher un formulaire de connexion.
 *
 * @param {LoginProps} props - Les propriétés du composant
 * @param {function} props.onSubmit - Fonction de gestion de la soumission du formulaire
 * @param {function} props.variant

 */
export default function Login({ onSubmit, variant }: LoginProps) {
    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            onSubmit(e)
        }}>
            <Stack spacing={3} width={500}>
                <TextField label="Email" type="email" id="email" size="small" variant={variant} ></TextField>
                <TextField label = "Password" id="password" type="password" size="small" variant={variant}></TextField>
                <Button type="submit">Se connecter</Button>
            </Stack>

        </form>
    );
}
