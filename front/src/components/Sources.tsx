import Source from "../models/source";
import _ from 'lodash';
export default function Sources({ sources }: { sources: Source[] }) {
    const vue = _.isEmpty(sources) ? <p>No sources</p> : <ul>{sources.map((source: Source) => <li>{source.tostring()}</li>)}</ul>
    return vue
}