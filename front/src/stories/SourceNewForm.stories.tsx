import { StoryFn } from '@storybook/react';
import SourceNewForm from '../components/source/SourceNewForm.tsx';
import { fn } from '@storybook/test';

const meta = {
	title: 'Form/SourceNewForm',
	component: SourceNewForm,
	tags: ['autodocs'],
	args: { onSubmit: fn() },
};

export default meta;

const Template: StoryFn<typeof SourceNewForm> = (args) => <SourceNewForm {...args} />;

export const Standard = Template.bind({});
