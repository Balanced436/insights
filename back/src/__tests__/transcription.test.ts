import request from "supertest";
import app from "../app"
import path from "path";

describe("CRUD operations for Transcriptions",()=>{
      const newSource = {
        title: "JT 5-11-2024-19h",
        description: "Description of JT 5-11-2024-19h",
        video: path.resolve(__dirname, "fixtures/5-11-2024-19h.mp4"),
        audio: path.resolve(__dirname, "fixtures/5-11-2024-19h.wav"),
      };
      
    let sourceId: number;

    beforeAll(async ()=>{
        const response = await request(app)
        .post("/source")
        .field("title", newSource.title)
        .field("description", newSource.description)
        .attach("video", newSource.audio)
        .attach("audio", newSource.video);
        sourceId = response.body.data.id;
    })


    describe("POST /transcription",()=>{
        it("should return a unique task id",async()=>{
            expect(true).toBe(false)
        })
    })
    
    describe("GET /transcription",async ()=>{
        expect(true).toBe(false)
    })
})