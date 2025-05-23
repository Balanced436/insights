import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, useForm } from "react-hook-form";
import { Button, Input, Stack, TextField } from "@mui/material";


type sourceProps = {
    onSubmit: (event: any) => {}
}


/**
 * Fonction permettant d'ajouter un source
 * @param {function} props.onSubmit - fonction déclencher lorsque l'utilise valide le formulaire
 * @param {}
 */
function SourceForm({ onSubmit }: sourceProps) {

    const schema = z.object({
        title: z.string().min(1, { message: "Le titre est requis" }),
        description: z.string().min(1, { message: "La description est requise " }),
        video: z.instanceof(File, { message: "The video is required" }),
        audio: z.instanceof(File, { message: "Audio file is required" })
    })

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) })

    return <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} width={500}>
            <TextField {...register('title')}
                       label={"Tile"} size="small"
                       error={!!errors.title}
                       helperText={errors.title? errors.title.message : " "} />
            <TextField {...register('description')}
                       label={"Description"}
                       size="small"
                       error={!!errors.description}
                       multiline
                       rows={5}
                       helperText={errors.description? errors.description.message : " "} />
            <Button type="submit" variant="contained">
                Soumettre
            </Button>
        </Stack>
    </form>


}

export default SourceForm;