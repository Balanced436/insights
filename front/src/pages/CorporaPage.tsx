import { Stack } from "@mui/material";
import { useCorpora } from "../hooks/useCorpora";
import { useEffect } from "react";
import Corpora from "../components/corpus/Corpora";

const CorporaPage = () => {
  const { status, data, error, isFetching } = useCorpora()

  useEffect(()=>{
    console.info(data)
  },[])
  return (
     <Corpora corpora={data ? data : []} display="GRID"/>
  );
};

export default CorporaPage;
