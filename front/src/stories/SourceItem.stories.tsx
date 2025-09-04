import { StoryFn } from '@storybook/react';
import { fn } from '@storybook/test';
import sourcesExemple from '../__tests__/fixtures/sources.exemple';
import { SourceItem } from '../components/source/SourceItem.tsx';

const meta = {
	title: 'source/SourceInfos',
	component: SourceItem,
	tags: ['autodocs'],
	args: { onSubmit: fn() },
};

export default meta;

const Template: StoryFn<typeof SourceItem> = () => <SourceItem source={sourcesExemple[0]}  />;

export const Standard = Template.bind({});
