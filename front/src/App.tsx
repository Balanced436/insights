import { useEffect, useContext } from 'react'
import './App.css'
import Sources from './components/Sources'
import Source from './models/source'
import _ from 'lodash'
import { SourceContext } from './contexts/SourceContext';
import { TranscriptionContext } from './contexts/TranscriptionContext'
import Transcription from './models/transcription'

function App() {
  const { sources, setSources } = useContext(SourceContext);
  const { transcriptions, setTranscriptions } = useContext(TranscriptionContext);

  useEffect(() => {
    fetch('http://localhost:4000/source')
      .then(response => {
        if (!response.ok) {
          return Promise.reject(response);
        }
        return response.json();
      })
      .then(data => {
        const formattedSources = _.map(data, (source: Source) =>
          new Source(
            source.id,
            source.title,
            source.description,
            source.audioUrl,
            source.videoUrl,
            source.createdAt,
            source.updatedAt
          )
        );
        setSources(formattedSources);
        console.info(sources)
      })
      .catch(error => {
        console.error('Error fetching sources:', error);
      });

    fetch('http://localhost:4000/transcription').then(response => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      return response.json()
    }).then(data => {
      const formattedTranscriptions = _.map(data, (transcription: Transcription) =>
        new Transcription(
          transcription.id,
          transcription.content,
          transcription.createdAt,
          transcription.updatedAt,
          transcription.sourceId,
        )
      );
      setTranscriptions(formattedTranscriptions);
      console.info(transcriptions)
    })

  }, [])
  return <Sources sources={sources} onSourceClick={(source: Source) => console.info(source)} />
}

export default App
