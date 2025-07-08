import { Stack } from "@mui/material";
import CorpusGrid from "../components/corpus/CorpusGrid";
import { useCorpora } from "../hooks/useCorpora";
import { useEffect } from "react";

const CorporaPage = () => {
  const { status, data, error, isFetching } = useCorpora()

  useEffect(()=>{
    console.info(data)
  },[])
  return (
    <Stack
      sx={{ justifyContent: "center", alignItems: "center", height: "100%" }}
    >
     <CorpusGrid corpora={data ? data : []}/>
    </Stack>
  );
};

export default CorporaPage;
