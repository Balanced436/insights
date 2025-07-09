import { useCorpora } from "../hooks/useCorpora";
import { useEffect } from "react";
import Corpora from "../components/corpus/Corpora";

const CorporaPage = () => {
  const { data } = useCorpora();

  useEffect(() => {
    console.info(data);
  }, []);
  return <Corpora corpora={data ? data : []} display="GRID" />;
};

export default CorporaPage;
