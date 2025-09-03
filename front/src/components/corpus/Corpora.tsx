import Corpus from '../../models/corpus.ts';
import { CorporaCards } from './CorporaCardsList';
import CorporaGrid from './CorporaGrid';

interface CorporaProps {
	corpora: Corpus[];
	display?: 'GRID' | 'CARDS';
	onCorpusSelection: (corpus: Corpus) => void;
}

const Corpora = ({ corpora, display = 'GRID', onCorpusSelection }: CorporaProps) => {
	const handleCorpusSelection = (corpus: Corpus) => onCorpusSelection(corpus);
	return (
		<div>
			{display === 'GRID' ? (
				<CorporaGrid corpora={corpora} onCorpusSelectSelection={handleCorpusSelection} />
			) : (
				<CorporaCards corpora={corpora} onCorpusSelectSelection={handleCorpusSelection} />
			)}
		</div>
	);
};

export default Corpora;
