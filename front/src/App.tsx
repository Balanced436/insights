import { useEffect, useContext } from 'react'
import './App.css'
import Sources from './components/Sources'
import Source from './models/source'
import _ from 'lodash'
import {  SourceContext } from './contexts/SourceContext';

function App() {
  const { sources, setSources } = useContext(SourceContext);

  useEffect(()=>{
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

  },[])
  return <Sources sources={sources}/>
} 

export default App
