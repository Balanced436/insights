import Source from "../models/source";

export default function Sources({ sources }: { sources: Source[] }) {
  const tableHeader = (
    <tr>
      <th>Title</th>
      <th>Description</th>
      <th>Audio Url</th>
      <th>Video Url</th>
      <th>Created At</th>
      <th>Updated At</th>
    </tr>
  );


  function getRowFromSource(source: Source) {
    const { title, description, videoUrl, audioUrl, createdAt, updatedAt } = source;
    return (
      <tr key={title}>
        <td>{title}</td>
        <td>{description}</td>
        <td>{audioUrl}</td>
        <td>{videoUrl}</td>
        <td>{createdAt.toString()}</td>
        <td>{updatedAt.toString()}</td>
      </tr>
    );
  }

  const tableRows = sources.map(getRowFromSource);

  return sources.length === 0 ? (
    <p>No sources</p>
  ) : (
    <table>
      <thead>{tableHeader}</thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
}