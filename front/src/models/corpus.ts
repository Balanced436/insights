type CorpusType = {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};
export default CorpusType;

export type CorporaProps = {
  corpora: CorpusType[];
  onCorpusSelectSelection: (corpusid: number) => void;
};

export type CorpusProps = {
  corpus: CorpusType;
  onCorpusSelectSelection: (corpusid: number) => void;
};
