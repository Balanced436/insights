import { StoryFn } from "@storybook/react";

import { CorpusCardsList } from "../components/corpus/CorpusCardsList.tsx";

const meta = {
  title: "UI/CorpusesUI",
  component: CorpusCardsList,
  tags: ["autodocs"],
};

export default meta;

const Template: StoryFn<typeof CorpusCardsList> = (args) => (
  <CorpusCardsList {...args} />
);

const testCorpus = [
  {
    title: "Journal Antenne Réunion",
    description: `Ce corpus contient les diffusions JT de 19h`,
    createdAt: new Date(),
    updatedAt: new Date(),
    corpusID: 99,
  },
  {
    title: "Chaîne youtube BFMTV",
    description: `Ce corpus contient les vidéos provenant de la chaine youtube bfmtv`,
    createdAt: new Date(),
    updatedAt: new Date(),
    corpusID: 98,
  },
  {
    title: "Journal TF1",
    description: `Ce corpus contient les diffusions JT de TF1`,
    createdAt: new Date(),
    updatedAt: new Date(),
    corpusID: 98,
  },
];
export const Standard = Template.bind({});
Standard.args = { corpora: testCorpus };
