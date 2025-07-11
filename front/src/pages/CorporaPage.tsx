import { useCorpora } from "../hooks/useCorpora";
import { useContext, useEffect } from "react";
import Corpora from "../components/corpus/Corpora";
import { CorporaContext } from "../contexts/CorporaContext";

const CorporaPage = () => {
  const { data, isLoading } = useCorpora();
  const { corpora, setCorpora } = useContext(CorporaContext);
  const handleCorpusSection = (corpusid: number) => console.info(`selected corpus id ${corpusid}`)

  useEffect(() => {
    if (data) {
      setCorpora(data ? data : []);
      console.info(data)
    }
  }, [data]);

  if (isLoading) return <p>corpora loading</p>
  if (data) return <Corpora corpora={corpora} display="GRID" onCorpusSelection={(corpusid)=>handleCorpusSection(corpusid)} />
};

export default CorporaPage;
