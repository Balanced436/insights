import Corpus, { CorporaProps } from "../../models/corpus.ts";
import { Stack } from "@mui/material";
import CorpusCard from "./CorpusCard.tsx";

/**
 * Display a list of corpus
 * @param corpora
 * @constructor
 */
export function CorporaCards({ corpora, onCorpusSelectSelection }: CorporaProps) {
  const handleCorpusSelection = (corpusid: Corpus) => onCorpusSelectSelection(corpusid);
  return (
    <Stack direction={"row"} spacing={3} useFlexGap sx={{ flexWrap: "wrap" }}>
      {corpora.map((corpus: Corpus) => (
        <CorpusCard
          key={corpus.id}
          corpus={corpus}
          onCorpusSelectSelection={ handleCorpusSelection}
        />
      ))}
    </Stack>
  );
}
