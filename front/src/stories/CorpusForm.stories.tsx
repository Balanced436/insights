import { StoryFn } from '@storybook/react';
import { fn } from '@storybook/test';
import CorpusForm from '../components/forms/CorpusForm.tsx';

const meta = {
	title: 'Form/CorpusForm',
	component: CorpusForm,
	tags: ['autodocs'],
	args: { onSubmit: fn() },
};

export default meta;

const Template: StoryFn<typeof CorpusForm> = (args) => <CorpusForm {...args} />;

export const Standard = Template.bind({});
