import React, { useState, createContext, ReactNode } from 'react';
import Corpus from '../models/corpus.ts';

interface CorpusContextInterface {
	corpora: Corpus[] | [];
	setCorpora: React.Dispatch<React.SetStateAction<Corpus[] | []>>;
}

interface CorporaProviderProps {
	children: ReactNode;
}

export const CorpusContext = createContext<CorpusContextInterface>({
	corpora: [],
	setCorpora: () => {},
});

export const CorporaProvider = ({ children }: CorporaProviderProps) => {
	const [corpora, setCorpora] = useState<Corpus[] | []>([]);

	return <CorpusContext.Provider value={{ corpora, setCorpora }}>{children}</CorpusContext.Provider>;
};

export default CorpusContext;
