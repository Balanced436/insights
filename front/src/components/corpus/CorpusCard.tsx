import CorpusType from "../../models/corpus.ts";
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
 * @param {CorpusType} corpus - The corpus to display
 *
 */
export default function CorpusCard({ corpus }: { corpus: CorpusType }) {
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
        <Button size="small">Access</Button>
      </CardActions>
    </Card>
  );
}

/**
 *
 * A simple corpus header
 *
 * @param {CorpusType} corpus - The corpus to display
 *
 */
function CorpusSubheader({ corpus }: { corpus: CorpusType }) {
  return (
    <div>
      <p>{corpus.description}</p>
    </div>
  );
}
