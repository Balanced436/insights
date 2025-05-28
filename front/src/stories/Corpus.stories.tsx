import { StoryFn } from "@storybook/react";
import Corpus from "../components/Corpus.tsx";
import CorpusType from "../models/corpus.ts";


const meta = {
    title: "UI/CorpusUI",
    component: Corpus,
    tags: ['autodocs']
};

export default meta;

const Template: StoryFn<typeof Corpus> = (args) => <Corpus {...args} />;


const testCorpus: CorpusType = {
    title : 'test',
    description: 'description',
    createdAt: new Date(),
    updatedAt: new Date(),
    corpusID : 99
}
export const Standard = Template.bind({});
Standard.args = {corpus : testCorpus};
