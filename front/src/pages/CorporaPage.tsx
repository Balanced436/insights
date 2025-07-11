import { useCorpora } from "../hooks/useCorpora";
import { useContext, useEffect } from "react";
import Corpora from "../components/corpus/Corpora";
import { CorporaContext } from "../contexts/CorporaContext";
import { useNavigate } from "@tanstack/react-router";

const CorporaPage = () => {
  const { data, isLoading } = useCorpora();
  const { corpora, setCorpora } = useContext(CorporaContext);
  const navigate = useNavigate()

  /**
   * handleCorpusSection
   * 
   * Navigate to the route /corpora/$corpusid
   * @param corpusid 
   * @returns void
   */
  const handleCorpusSection = (corpusid: number) => navigate({to : `/corpora/${corpusid}`})

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
