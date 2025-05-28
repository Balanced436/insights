import React, { useState, createContext, ReactNode } from "react";
import Source from "../models/source";

interface SourceContextType {
  sources: Source[];
  setSources: React.Dispatch<React.SetStateAction<Source[]>>;
}

interface SourceProviderProps {
  children: ReactNode;
}

export const SourceContext = createContext<SourceContextType>({
  sources: [],
  setSources: () => {},
});

export const SourceProvider = ({ children }: SourceProviderProps) => {
  const [sources, setSources] = useState<Source[]>([]);

  return (
    <SourceContext.Provider value={{ sources, setSources }}>
      {children}
    </SourceContext.Provider>
  );
};
