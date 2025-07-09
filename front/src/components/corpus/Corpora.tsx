import CorpusType from "../../models/corpus";
import { CorporaCards } from "./CorporaCardsList";
import CorporaGrid from "./CorporaGrid";

interface CorporaProps {
  corpora: CorpusType[];
  display?: "GRID" | "CARDS";
}

const Corpora = ({ corpora, display = "GRID" }: CorporaProps) => {
  const handleCorpusSelection = (corpusid: number) => console.info(corpusid);
  return (
    <div>
      {display === "GRID" ? (
        <CorporaGrid
          corpora={corpora}
          onCorpusSelect={(corpusid) => handleCorpusSelection(corpusid)}
        />
      ) : (
        <CorporaCards
          corpora={corpora}
          onCorpusSelect={(corpusid) => handleCorpusSelection(corpusid)}
        />
      )}
    </div>
  );
};

export default Corpora;
