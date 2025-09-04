import { StoryFn } from '@storybook/react';
import { fn } from '@storybook/test';
import SourcesGridView from '../components/source/SourcesGridView.tsx';
import sourcesExemple from '../__tests__/fixtures/sources.exemple';
import Source from '../models/source.ts';

const meta = {
	title: 'source/SourcesGridView',
	component: SourcesGridView,
	tags: ['autodocs'],
	args: { onSubmit: fn() },
};

export default meta;

const Template: StoryFn<typeof SourcesGridView> = () => (
	<SourcesGridView
		onSourceSelection={function (source: Source): void {
			console.info(source);
		}}
		sources={sourcesExemple}
	/>
);

export const Standard = Template.bind({});
