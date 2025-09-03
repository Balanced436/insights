import { useQuery } from '@tanstack/react-query';
import * as _ from 'lodash';
import Transcription from '../models/transcription';

export const useTranscriptions = (sourceid: number | undefined) => {
	return useQuery({
		queryKey: ['transcriptions', sourceid],
		queryFn: async () => {
			const url: URL = new URL('http://localhost:4000/transcription');
			if (sourceid) url.searchParams.append('sourceid', sourceid.toString());
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Error fetching transcriptions: ${response.status}`);
			}
			return response.json();
		},
		select: (data) => {
			return _.map(
				data,
				(transcription) =>
					new Transcription(transcription.id, transcription.content, transcription.createdAt, transcription.updatedAt, transcription.sourceId)
			);
		},
	});
};
