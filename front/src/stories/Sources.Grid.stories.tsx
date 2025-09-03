import { StoryFn } from '@storybook/react';
import SourceForm from '../components/forms/SourceForm.tsx';
import { fn } from '@storybook/test';
import SourcesGrid from '../components/Source/SourcesGrid.tsx';
import sourcesExemple from '../__tests__/fixtures/sources.exemple';
import Source from '../models/source.ts';

const meta = {
	title: 'source/SourcesGrid',
	component: SourcesGrid,
	tags: ['autodocs'],
	args: { onSubmit: fn() },
};

export default meta;

const Template: StoryFn<typeof SourceForm> = (args) => (
	<SourcesGrid
		onSourceSelection={function (source: Source): void {
			console.info(source);
		}}
		sources={sourcesExemple}
		{...args}
	/>
);

export const Standard = Template.bind({});
