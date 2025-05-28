import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button, Stack, TextField } from "@mui/material";
import CorpusType from "../../models/corpus.ts";

type CorpusProps = {
  onSubmit: (event: Partial<CorpusType>) => void;
};

/**
 * Composant permettant de créer un corpus
 * @param {function} props.onSubmit - Fonction appelée lors de la soumission du formulaire
 */
function CorpusForm({ onSubmit }: CorpusProps) {
  const schema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string(),
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
          {...register("title")}
          label="Title"
          title="Title"
          size="small"
          error={!!errors.title}
          helperText={errors.title ? errors.title.message : " "}
        />

        <TextField
          {...register("description")}
          rows={5}
          multiline
          label="Description"
          title="Description"
          size="small"
          helperText={errors.description ? errors.description.message : " "}
        />
        <Button type="submit" variant="contained">
          Soumettre
        </Button>
      </Stack>
    </form>
  );
}

export default CorpusForm;
