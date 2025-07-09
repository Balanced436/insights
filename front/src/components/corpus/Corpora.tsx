import CorpusType from "../../models/corpus";
import { CorporaCards } from "./CorporaCardsList";
import CorporaGrid from "./CorporaGrid";

interface CorporaProps {
  corpora: CorpusType[]
  display?: "GRID" | "CARDS"
}

const Corpora = ({ corpora, display = "GRID" }: CorporaProps) => {
  return (
    <div>
      {display === "GRID" ? (
        <CorporaGrid corpora={corpora}/>
      ) : (
        <CorporaCards corpora={corpora}/>
      )}
    </div>
  );
};

export default Corpora;
