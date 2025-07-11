import React, { useState, createContext, ReactNode } from "react";
import CorpusType from "../models/corpus";

interface CorporaContext {
  corpora: CorpusType[] | [];
  setCorpora: React.Dispatch<React.SetStateAction<CorpusType[] | []>>;
}

interface CorporaProviderProps {
  children: ReactNode;
}

export const CorporaContext = createContext<CorporaContext>({
  corpora: [],
  setCorpora: () => {},
});

export const CorporaProvider = ({ children }: CorporaProviderProps) => {
  const [corpora, setCorpora] = useState<CorpusType[] | []>([]);

  return (
    <CorporaContext.Provider value={{ corpora, setCorpora }}>
      {children}
    </CorporaContext.Provider>
  );
};

export default CorporaContext;
