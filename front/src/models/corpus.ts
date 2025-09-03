type Corpus = {
	id: number;
	title: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
};
export default Corpus;

export type CorporaProps = {
	corpora: Corpus[];
	onCorpusSelectSelection: (corpus: Corpus) => void;
};

export type CorpusProps = {
	corpus: Corpus;
	onCorpusSelectSelection: (corpus: Corpus) => void;
};
