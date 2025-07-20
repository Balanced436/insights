import { CorporaProps } from "../../models/corpus";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
} from "@mui/material";

const DRAWER_WIDTH = 200;
const LeftCorporaNavigation = ({
  corpora,
  onCorpusSelectSelection,
}: CorporaProps) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        [`& .MuiDrawer-paper`]: {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {corpora.map((corpus) => (
            <ListItem key={corpus.id} disablePadding>
              <ListItemButton
                onClick={() => onCorpusSelectSelection(corpus.id)}
              >
                {corpus.title}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default LeftCorporaNavigation;
