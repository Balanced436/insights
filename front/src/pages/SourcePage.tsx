import { useParams } from "@tanstack/react-router";

/**
 * @constructor
 */
const SourcePage = () => {
    const {corpusid, sourceid} = useParams({ from: "/corpora/$corpusid/sources/$sourceid" });
    console.log(corpusid, sourceid);


    return <p>no source found</p>;
};
export default SourcePage;
