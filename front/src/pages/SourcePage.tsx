import { useParams } from "@tanstack/react-router";
import Sources from "../components/Sources";
import { useSources } from "../hooks/useSources";
import { Typography } from "@mui/material";

const SourcePage = () => {
  const idParam = useParams({ from: "/corpora/$id/sources" }).id;
  const id = Number(idParam);

  const { data: sources, isLoading, isError, error } = useSources(id);

  if (isLoading) {
    return <p>corpus is loading</p>;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  if (sources) {
    return (
      <div>
        <Sources sources={sources} onSourceSelection={console.info} />{" "}
      </div>
    );
  }

  return <p>no source found</p>;
};
export default SourcePage;
