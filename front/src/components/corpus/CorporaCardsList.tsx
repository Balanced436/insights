import CorpusType from "../../models/corpus.ts";
import { Stack } from "@mui/material";
import CorpusCard from "./CorpusCard.tsx";

/**
 * Display a list of corpus
 * @param corpora
 * @constructor
 */
export function CorporaCards({ corpora }: { corpora: CorpusType[] }) {
  return (
    <Stack direction={"row"} spacing={3} useFlexGap sx={{ flexWrap: "wrap" }}>
      {corpora.map((corpus: CorpusType) => (
        <CorpusCard key={corpus.corpusID} corpus={corpus} />
      ))}
    </Stack>
  );
}
