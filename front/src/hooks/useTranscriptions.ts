import { useState, useEffect } from 'react';
import _ from 'lodash';
import Transcription from '../models/transcription';

const useTranscriptions = () => {
    const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);

    useEffect(() => {
        fetch('http://localhost:4000/transcription')
            .then(response => response.ok ? response.json() : Promise.reject(response))
            .then(data => {
                const formattedTranscriptions = _.map(data, transcription => new Transcription(
                    transcription.id, transcription.content, transcription.createdAt,
                    transcription.updatedAt, transcription.sourceId
                ));
                setTranscriptions(formattedTranscriptions);
            })
            .catch(error => console.error('Error fetching transcriptions:', error));
    }, []);

    return transcriptions;
};

export default useTranscriptions;
