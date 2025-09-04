import { StoryFn } from '@storybook/react';
import UserLoginForm from '../components/user/UserLoginForm.tsx';
import { fn } from '@storybook/test';

const meta = {
	title: 'Form/UserLoginForm',
	component: UserLoginForm,
	tags: ['autodocs'],
	args: { onSubmit: fn() },
};

export default meta;

const Template: StoryFn<typeof UserLoginForm> = (args) => <UserLoginForm {...args} />;

export const Standard = Template.bind({});
Standard.args = { variant: 'standard' };

export const Outlined = Template.bind({});
Outlined.args = { variant: 'outlined' };

export const Filled = Template.bind({});
Filled.args = { variant: 'filled' };
