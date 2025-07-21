import { useParams } from "@tanstack/react-router";
import CorpusType from "../models/corpus";
import { Stack } from "@mui/material";
import { useCorpus } from "../hooks/useCorpora";

const CorpusInfosPage = () => {
  const idParam = useParams({ from: "/corpora/$id/infos" }).id;
  const id = Number(idParam);

  if (isNaN(id)) {
    throw new Error("ID ERROR");
  }

  const { data: corpus, isLoading, isError, error } = useCorpus(id);

  if (isLoading) {
    return <p>corpus is loading</p>;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  if (corpus) {
    return <Corpus corpus={corpus} />;
  }
  return <p>no corpus found</p>;
};

export default CorpusInfosPage;

export const Corpus = ({ corpus }: { corpus: CorpusType }) => {
  return (
    <Stack direction={"column"}>
      <span>Corpus title: {corpus.title}</span>
      <span>Corpus ID {corpus.id}</span>
      <span>Created at {corpus.createdAt.toString()}</span>
    </Stack>
  );
};
