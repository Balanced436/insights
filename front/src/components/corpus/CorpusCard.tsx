import Corpus, { CorpusProps } from "../../models/corpus.ts";
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

/**
 *
 * A component that renders one corpus
 *
 * @param {Corpus} corpus - The corpus to display
 *
 */
export default function CorpusCard({
  corpus,
  onCorpusSelectSelection,
}: CorpusProps) {
  const handleClick = (corpus: Corpus) => {
    onCorpusSelectSelection(corpus);
  };

  return (
    <Card
      sx={{
        width: 300,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <CardHeader
        title={corpus.title}
        subheader={<CorpusSubheader corpus={corpus} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
      />
      <CardActions>
        <Button size="small" onClick={() => handleClick(corpus)}>
          Access
        </Button>
      </CardActions>
    </Card>
  );
}

/**
 *
 * A simple corpus header
 *
 * @param {Corpus} corpus - The corpus to display
 *
 */
function CorpusSubheader({ corpus }: { corpus: Corpus }) {
  return (
    <div>
      <p>{corpus.description}</p>
    </div>
  );
}
