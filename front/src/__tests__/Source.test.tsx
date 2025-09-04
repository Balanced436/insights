import { render, screen } from '@testing-library/react';
import SourcesGridView from '../components/source/SourcesGridView.tsx';
import SourcesExemple from './fixtures/sources.exemple';
it('Should display no sources ', async () => {
	render(<SourcesGridView sources={[]} />);
	screen.getByText('No sources');
});

it('Should display all provided sources ', async () => {
	render(<SourcesGridView sources={SourcesExemple} />);
	screen.getByText('No sources');
});
