import { useParams } from '@tanstack/react-router';
import { useSource } from '../hooks/useSources.ts';
import { SourceInfos } from '../components/Source/Source.tsx';
import { useTranscriptions } from '../hooks/useTranscriptions.ts';
import TranscriptionInfos from '../components/Transcription.tsx';
import { Typography } from '@mui/material';
import React from 'react';
/**
 * This page will display source in a structured way.
 * @constructor
 */
const SourcePage = () => {
	const { sourceid } = useParams({
		from: '/corpora/$corpusid/sources/$sourceid',
	});

	const sourceidParams = Number(sourceid);
	const { data: sourceData, isLoading: isSourceLoading, error: isSourceError } = useSource(sourceidParams);
	const { data: transcriptionsData, isLoading: isTranscriptionLoading, isError: isTranscriptionError } = useTranscriptions(sourceidParams);

	return (
		<div>
			<Typography variant={'h6'}>Source infos</Typography>
			{sourceData && <SourceInfos source={sourceData} />}

			<Typography variant={'h6'}>Transcriptions infos</Typography>
			{transcriptionsData && <TranscriptionInfos transcriptions={transcriptionsData} />}
		</div>
	);
};
export default SourcePage;
