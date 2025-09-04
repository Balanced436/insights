import { StoryFn } from '@storybook/react';
import { fn } from '@storybook/test';
import CorpusNewForm from '../components/corpus/CorpusNewForm.tsx';

const meta = {
	title: 'Form/CorpusNewForm',
	component: CorpusNewForm,
	tags: ['autodocs'],
	args: { onSubmit: fn() },
};

export default meta;

const Template: StoryFn<typeof CorpusNewForm> = (args) => <CorpusNewForm {...args} />;

export const Standard = Template.bind({});
