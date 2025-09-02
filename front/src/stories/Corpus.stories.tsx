import { StoryFn } from "@storybook/react";
import CorpusCard from "../components/corpus/CorpusCard.tsx";
import Corpus from "../models/corpus.ts";

const meta = {
  title: "UI/CorpusUI",
  component: CorpusCard,
  tags: ["autodocs"],
};

export default meta;

const Template: StoryFn<typeof CorpusCard> = (args) => (
  <div>
    <CorpusCard {...args} />
  </div>
);

const testCorpus: Corpus = {
  title: "ANTENNE REUNION",
  description: `Ce corpus contient les diffusions JT de 19h`,
  createdAt: new Date(),
  updatedAt: new Date(),
  id: 99,
};
export const Standard = Template.bind({});
Standard.args = { corpus: testCorpus };
