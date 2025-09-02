import Source from "../../models/source";
const SourcesExemple: Source[] = [
  new Source(
    1,
    "title1",
    "description1",
    "videoUrl1",
    "audioUrl1",
    new Date(),
    new Date(),
      1
  ),
  new Source(
    2,
    "title2",
    "description2",
    "videoUrl2",
    "audioUrl2",
    new Date(),
    new Date(),
      1
  ),
] as Source[];
export default SourcesExemple;
