export default class Transcription {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  sourceId: number;
  constructor(
    id: number,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    sourceId: number,
  ) {
    this.id = id;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.sourceId = sourceId;
  }
}
