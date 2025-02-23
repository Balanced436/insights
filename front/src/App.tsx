import { useEffect, useState } from 'react'
import './App.css'
import Sources from './components/Sources'
import Source from './models/source'
import _ from 'lodash'
function App() {
  const [sources, setSources] = useState<Source[]>([]) // Ajouter le type explicite Source[]
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
        source.audioUrl,
        source.videoUrl,
        source.title,
        source.description,
        source.createdAt,
        source.updatedAt
        )
      );
      setSources(formattedSources);
      })
      .catch(error => {
      console.error('Error fetching sources:', error);
      });

  },[])
  return <Sources sources={sources}/>
} 

export default App
 