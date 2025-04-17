import path from "path";
import request from "supertest";
import app from "../app";
import { Prisma, PrismaClient } from "@prisma/client";

describe("CRUD operations for summary", () => {
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

    const transcriptions = [
        { "sourceId": 1, "skipTranscription": true },
        { "sourceId": 2, "skipTranscription": true },
        { "sourceId": 3, "skipTranscription": true }
    ];

    beforeAll(async () => {
        for (const element of sources) {
            await request(app)
                .post('/source')
                .field('title', element.title)
                .field('description', element.description)
                .attach('video', element.video)
                .attach('audio', element.audio);
        }

        for (const transcription of transcriptions) {
            await request(app).post('/transcription').send({ "sourceId": transcription.sourceId, "skipTranscription": transcription.skipTranscription });
        }
    });

    describe("POST /summary/:transcriptionid?", () => {
        it("should create a new summary and return 201 when transcriptionId is provided", async () => {
            const response = await request(app).post("/summary")
                .field("transcriptionId", 1)
                .field("sourceId", 1);

            expect(response.statusCode).toBe(400);
        });

        it("should return 400 when transcriptionId is not provided", async () => {
            const response = await request(app).post("/summary");
            expect(response.status).toBe(400);
        });
    });

    describe("GET /summary", () => {
        it("should return all summaries with status 200", async () => {
            const summaries = await prisma.summary.findMany();
            const response = await request(app).get("/summary");

            expect(response.body.data.length).toBe(summaries.length);
            expect(response.status).toBe(200);
        });

        it("should return a summary by id with status 200", async () => {
            const response = await request(app).get("/summary/1");

            expect(response.status).toBe(200);
        });

        it("should return 400 when id is not a number", async () => {
            const response = await request(app).get("/summary");

            expect(response.status).toBe(400);
        });
    });

    describe("DELETE /summary/:transcriptionId?", () => {
        it("should delete a summary and return 201 when transcriptionId is provided", () => {
            expect(true).toBe(false);
        });

        it("should return 401 when transcriptionId is not provided", () => {
            expect(true).toBe(false);
        });
    });
});