import { StoryFn } from '@storybook/react';
import { fn } from '@storybook/test';
import CorpusSearchBar from '../components/corpus/CorpusSearchBar.tsx';

const meta = {
	title: 'Corpus/CorpusSearchBar',
	component: CorpusSearchBar,
	tags: ['autodocs'],
	args: { onSubmit: fn() },
};

export default meta;

const Template: StoryFn<typeof CorpusSearchBar> = (args) => <CorpusSearchBar />;

export const Standard = Template.bind({});
Standard.args = {};
