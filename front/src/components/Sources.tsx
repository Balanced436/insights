import { useState } from "react";
import Source from "../models/source";

enum SourceContext {
    VIEW = "VIEW",
    ADD = "ADD"
}

export default function Sources({ sources }: { sources: Source[] }) {
    const [context, setContext] = useState<SourceContext>(SourceContext.VIEW);
    const [newSource, setNewSource] = useState<{ title: string; description: string }>({
        title: "",
        description: "",
    });

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setNewSource((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.info("not implemented")
        setNewSource({ title: "", description: "" });
        setContext(SourceContext.VIEW);
    }

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

    const addSourceForm = (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Title" value={newSource.title} onChange={handleInputChange} required />
            <input type="text" name="description" placeholder="Description" value={newSource.description} onChange={handleInputChange} required />
            <button type="submit">Add Source</button>
            <button type="button" onClick={() => setContext(SourceContext.VIEW)}>Cancel</button>
        </form>
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
    return (
        <div>
            <button onClick={() => setContext(SourceContext.ADD)}>Add New Source</button>
            {context === SourceContext.ADD ? (
                addSourceForm
            ) : sources.length === 0 ? (
                <p>No sources</p>
            ) : (
                <table>
                    <thead>{tableHeader}</thead>
                    <tbody>{tableRows}</tbody>
                </table>
            )}
        </div>
    );
}
