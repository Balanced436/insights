import CorpusType from "../../models/corpus";
import { CorporaCards } from "./CorporaCardsList";
import CorporaGrid from "./CorporaGrid";

interface CorporaProps {
  corpora: CorpusType[];
  display?: "GRID" | "CARDS";
  onCorpusSelection: (corpusid: number) => void;
}

const Corpora = ({
  corpora,
  display = "GRID",
  onCorpusSelection,
}: CorporaProps) => {
  const handleCorpusSelection = (corpusid: number) =>
    onCorpusSelection(corpusid);
  return (
    <div>
      {display === "GRID" ? (
        <CorporaGrid
          corpora={corpora}
          onCorpusSelectSelection={handleCorpusSelection}
        />
      ) : (
        <CorporaCards
          corpora={corpora}
          onCorpusSelectSelection={handleCorpusSelection}
        />
      )}
    </div>
  );
};

export default Corpora;
