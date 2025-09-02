import { useParams } from "@tanstack/react-router";
import {useSource} from "../hooks/useSources.ts";
import {SourceInfos} from "../components/Source/Source.tsx";

/**
 * This page will display source in a structured way.
 * @constructor
 */
const SourcePage = () => {
    const {corpusid, sourceid} = useParams({ from: "/corpora/$corpusid/sources/$sourceid" });
    console.log(corpusid, sourceid);

    const sourceParams = Number(sourceid)
    const { data: source, isLoading, isError, error } = useSource(sourceParams);

    if (isLoading) {
        return <p>isloading</p>
    }

    if (isLoading) {
        return <p>corpus is loading</p>;
    }

    if (isError) {
        return <p>{error?.message}</p>;
    }

    if (source) {
        return <SourceInfos source={source}/>
    }
};
export default SourcePage;
