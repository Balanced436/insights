import path from "path";
import request from "supertest";
import app from "../app";
import { Prisma, PrismaClient } from "@prisma/client";
describe("CRUD operations from summary", () => {
    const prisma = new PrismaClient();
    
    const sources = [{
        title: 'SEED1 title JT 5-11-2024-19h',
        description: 'SEED description JT 5-11-2024-19h',
        video: path.resolve(__dirname, "fixtures/5-11-2024-19h.mp4"),
        audio: path.resolve(__dirname, "fixtures/5-11-2024-19h.wav"),
    }, {
        title: 'SEED2 title JT 5-11-2024-19h',
        description: 'SEED description JT 5-11-2024-19h',
        video: path.resolve(__dirname, "fixtures/5-11-2024-19h.mp4"),
        audio: path.resolve(__dirname, "fixtures/5-11-2024-19h.wav"),
    }, {
        title: 'SEED3 title JT 5-11-2024-19h',
        description: 'SEED description JT 5-11-2024-19h',
        video: path.resolve(__dirname, "fixtures/5-11-2024-19h.mp4"),
        audio: path.resolve(__dirname, "fixtures/5-11-2024-19h.wav"),
    }];

    // add some transcriptions
    const transcriptions = [
        { "sourceId": 1, "skipTranscription": true },
        { "sourceId": 2, "skipTranscription": true },
        { "sourceId": 3, "skipTranscription": true }]

    beforeAll(async () => {
        for (var element of sources) {
            await request(app)
                .post('/source')
                .field('title', element.title)
                .field('description', element.description)
                .attach('video', element.video)
                .attach('audio', element.audio);
        }

        for (var transcription of transcriptions) {
            await request(app).post('/transcription').send({ "sourceId": transcription.sourceId, "skipTranscription": transcription.skipTranscription })
        }

    })

    describe("POST /summary/:transcriptionid?", () => {
        it("should post a new summary and return 201 if id is provided and return the summary", () => {
            const response = await request(app).post("/summary").then()
            expect(true).toBe(false)
        })

        it("should return status 400 if transcription id is not provided", () => {
            expect(true).toBe(false)
        })
    })

    describe("GET /summary", () => {
        it("should return all summaries and stauts 200", async () => {
            const summaries = await prisma.summary.findMany()
            const response = await request(app).get("/summary") 
            
            expect(response.body.length).toBe(summaries.length)
            expect(response.status).toBe(200)
        })

        it("should return a summary by id", () => {
            expect(true).toBe(false)
        })

        it("should return 400 if id is nan", () => {
            expect(true).toBe(false)
        })
    })

    describe('DELETE /summary/:transcriptionId?', () => {
        it("should return 201 ", () => {
            expect(true).toBe(false)
        })

        it("should return 401 if transcriptionId is not provided ", () => {
            expect(true).toBe(false)
        })
    })
})