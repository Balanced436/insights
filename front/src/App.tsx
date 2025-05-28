import "./App.css";
import Sources from "./components/Sources";
import { useSources } from "./hooks/useSources";
export default function App() {
  const {
    data: sourcesData,
    isLoading: sourcesLoading,
    error: sourcesError,
  } = useSources();

  if (sourcesLoading) {
    return <div>Loading...</div>;
  }

  if (sourcesError) {
    return <div>Error loading sources: {sourcesError.message}</div>;
  }

  return (
    <Sources
      sources={sourcesData || []}
      onSourceClick={(source) => console.info(source)}
    />
  );
}
