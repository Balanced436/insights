export default class Source {
    id: number;
    title:string;
    description:string;
    videoUrl:string;
    audioUrl:string;
    createdAt:Date;
    updatedAt:Date;

    constructor(id:number, title: string, description: string, videoUrl: string, audioUrl: string, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.videoUrl = videoUrl;
        this.audioUrl = audioUrl;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    tostring(){
        return `${this.title} - ${this.description} - ${this.videoUrl} - ${this.audioUrl} - ${this.createdAt} - ${this.updatedAt}`
    }
}
