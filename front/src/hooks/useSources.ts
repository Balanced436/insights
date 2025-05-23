import { useState, useEffect } from 'react';
import _ from 'lodash';
import Source from '../models/source';

const useSources = () => {
    const [sources, setSources] = useState<Source[]>([]);

    useEffect(() => {
        fetch('http://localhost:4000/source')
            .then(response => response.ok ? response.json() : Promise.reject(response))
            .then(data => {
                const formattedSources = _.map(data, source => new Source(
                    source.id, source.title, source.description,
                    source.audioUrl, source.videoUrl, source.createdAt, source.updatedAt
                ));
                setSources(formattedSources);
            })
            .catch(error => console.error('Error fetching sources:', error));
    }, []);

    return sources;
};

export default useSources;
