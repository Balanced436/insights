import React, { useState, createContext, ReactNode } from 'react';
import Corpus from '../models/corpus.ts';

interface CorporaContext {
	corpora: Corpus[] | [];
	setCorpora: React.Dispatch<React.SetStateAction<Corpus[] | []>>;
}

interface CorporaProviderProps {
	children: ReactNode;
}

export const CorporaContext = createContext<CorporaContext>({
	corpora: [],
	setCorpora: () => {},
});

export const CorporaProvider = ({ children }: CorporaProviderProps) => {
	const [corpora, setCorpora] = useState<Corpus[] | []>([]);

	return <CorporaContext.Provider value={{ corpora, setCorpora }}>{children}</CorporaContext.Provider>;
};

export default CorporaContext;
