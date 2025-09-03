import React, { useState, createContext, ReactNode } from 'react';
import Transcription from '../models/transcription';

interface TranscriptionContextType {
	transcriptions: Transcription[];
	setTranscriptions: React.Dispatch<React.SetStateAction<Transcription[]>>;
}

interface TranscriptionProviderProps {
	children: ReactNode;
}

export const TranscriptionContext = createContext<TranscriptionContextType>({
	transcriptions: [],
	setTranscriptions: () => {},
});

export const TranscriptionProvider = ({ children }: TranscriptionProviderProps) => {
	const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);

	return <TranscriptionContext.Provider value={{ transcriptions, setTranscriptions }}>{children}</TranscriptionContext.Provider>;
};
