import { StoryFn } from '@storybook/react';

import { CorpusCardList } from '../components/corpus/CorpusCardList.tsx';

const meta = {
	title: 'UI/CorpusesUI',
	component: CorpusCardList,
	tags: ['autodocs'],
};

export default meta;

const Template: StoryFn<typeof CorpusCardList> = (args) => <CorpusCardList {...args} />;

const testCorpus = [
	{
		id: 1,
		title: 'ANTENNE REUNION',
		description: `Ce corpus contient les diffusions JT de 19h`,
		createdAt: new Date(),
		updatedAt: new Date(),
		corpusID: 99,
	},
	{
		id: 2,
		title: 'BFMTV',
		description: `Ce corpus contient les vidéos provenant de la chaine youtube bfmtv`,
		createdAt: new Date(),
		updatedAt: new Date(),
		corpusID: 98,
	},
	{
		id: 3,
		title: 'TF1',
		description: `Ce corpus contient les diffusions JT de TF1`,
		createdAt: new Date(),
		updatedAt: new Date(),
		corpusID: 98,
	},
];
export const Standard = Template.bind({});
Standard.args = { corpora: testCorpus };
