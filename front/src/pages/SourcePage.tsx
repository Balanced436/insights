import { useParams } from '@tanstack/react-router';
import { useSource } from '../hooks/useSources.ts';
import { SourceItem } from '../components/source/SourceItem.tsx';
import { useTranscriptions } from '../hooks/useTranscriptions.ts';
import Transcriptions from '../components/transcription/TranscriptionItem.tsx';
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
			{sourceData && <SourceItem source={sourceData} />}

			<Typography variant={'h6'}>Transcriptions infos</Typography>
			{transcriptionsData && <Transcriptions transcriptions={transcriptionsData} />}
		</div>
	);
};
export default SourcePage;
