import { useCorpora } from "../hooks/useCorpora";
import { useContext, useEffect } from "react";
import Corpora from "../components/corpus/Corpora";
import { CorporaContext } from "../contexts/CorporaContext";

const CorporaPage = () => {
  const { data, isLoading } = useCorpora();

  const { corpora, setCorpora } = useContext(CorporaContext);
  useEffect(() => {
    if (data) {
      setCorpora(data ? data : []);
      console.info(data)
    }
  }, [data]);


  return (<div>{!isLoading ? <Corpora corpora={corpora} display="GRID" /> : <p>loading</p>}</div>)
};

export default CorporaPage;
