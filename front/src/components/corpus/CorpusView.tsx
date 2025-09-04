import Corpus from '../../models/corpus.ts';
import { CorpusCardList } from './CorpusCardList.tsx';
import CorpusGrid from './CorpusGrid.tsx';

interface CorporaProps {
	corpora: Corpus[];
	display?: 'GRID' | 'CARDS';
	onCorpusSelection: (corpus: Corpus) => void;
}

const CorpusView = ({ corpora, display = 'GRID', onCorpusSelection }: CorporaProps) => {
	const handleCorpusSelection = (corpus: Corpus) => onCorpusSelection(corpus);
	return (
		<div>
			{display === 'GRID' ? (
				<CorpusGrid corpora={corpora} onCorpusSelectSelection={handleCorpusSelection} />
			) : (
				<CorpusCardList corpora={corpora} onCorpusSelectSelection={handleCorpusSelection} />
			)}
		</div>
	);
};

export default CorpusView;
