import Corpus, { CorporaProps } from '../../models/corpus.ts';
import { Stack } from '@mui/material';
import CorpusCardItem from './CorpusCardItem.tsx';

/**
 * Display a list of corpus
 * @param corpora
 * @constructor
 */
export function CorpusCardList({ corpora, onCorpusSelectSelection }: CorporaProps) {
	const handleCorpusSelection = (corpusid: Corpus) => onCorpusSelectSelection(corpusid);
	return (
		<Stack direction={'row'} spacing={3} useFlexGap sx={{ flexWrap: 'wrap' }}>
			{corpora.map((corpus: Corpus) => (
				<CorpusCardItem key={corpus.id} corpus={corpus} onCorpusSelectSelection={handleCorpusSelection} />
			))}
		</Stack>
	);
}
