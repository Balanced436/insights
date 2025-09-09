import {useParams} from '@tanstack/react-router';
import {useSource} from '../hooks/useSources.ts';
import {SourceItem} from '../components/source/SourceItem.tsx';
import {useTranscriptions} from '../hooks/useTranscriptions.ts';
import Transcriptions from '../components/transcription/TranscriptionItem.tsx';
import {Typography, Stack, Box, IconButton} from '@mui/material';
import React from 'react';
import {useGetSummariesBySourceid} from '../hooks/useSummaries.tsx';
import Summaries from '../components/summary/SummaryItem.tsx';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

/**
 * This page will display source in a structured way.
 * @constructor
 */
const SourcePage = () => {
    const {sourceid} = useParams({
        from: '/corpora/$corpusid/sources/$sourceid',
    });

    const sourceidParams = Number(sourceid);
    const {data: sourceData, isLoading: isSourceLoading, error: isSourceError} = useSource(sourceidParams);
    const {
        data: transcriptionsData,
        isLoading: isTranscriptionLoading,
        isError: isTranscriptionError
    } = useTranscriptions(sourceidParams);
    const {
        data: summariesData,
        isLoading: isSummariesLoading,
        isError: isSummariesError
    } = useGetSummariesBySourceid(sourceidParams);

    return (
        sourceData && transcriptionsData && summariesData &&
        (<Stack>
            <Stack>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Stack>
                        <Typography variant={'h5'}>Source overview</Typography>
                        <Typography>Title: {sourceData.title}</Typography>
						<Typography>Source ID: {sourceData.id}</Typography>
                    </Stack>
                    <Box>
                        <IconButton aria-label="AddIcon">
                            <AddIcon/>
                        </IconButton>
                        <IconButton aria-label="DeleteIcon">
                            <DeleteIcon/>
                        </IconButton>
                        <IconButton aria-label="EditIcon">
                            <EditIcon/>
                        </IconButton>
                    </Box>
                </Stack>


            </Stack>
            <Stack sx={{marginTop: 5}}>
                <Typography variant={'h6'}>Source infos</Typography>
                {sourceData && <SourceItem source={sourceData}/>}
                <Typography variant={'h6'}>Transcriptions infos</Typography>
                {transcriptionsData && <Transcriptions transcriptions={transcriptionsData}/>}
                <Typography variant={'h6'}>Summary infos</Typography>
                {summariesData && <Summaries summaries={summariesData}/>}
            </Stack>

        </Stack>)
    );
};
export default SourcePage;
