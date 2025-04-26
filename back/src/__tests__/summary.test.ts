import path from "path";
import request from "supertest";
import app from "../app";
import {  PrismaClient, Summary, Transcription } from "@prisma/client";
import { assert } from "console";

describe("CRUD operations for summary", () => {
    const prisma = new PrismaClient();

    let source: request.Response, transcription: request.Response;

    beforeAll(async () => {
        source = await request(app).post('/source').
        field('title', "Title").
        field('description', "Description").
        attach('video', path.resolve(__dirname, "fixtures/5-11-2024-19h.mp4")).
        attach('audio', path.resolve(__dirname, "fixtures/5-11-2024-19h.wav"));

        transcription = await request(app).post('/transcription')
        .send({'sourceId': source.body.data.id})
        .send({'skipTranscription': true})
        

    });

    afterAll(async ()=>{
        // Order of deletion matters
        await prisma.summary.deleteMany()
        await prisma.task.deleteMany();
        await prisma.transcription.deleteMany();
        await prisma.source.deleteMany();

    })

    describe("POST summary", () => {
        it("should create a new summary and return 201 when transcriptionId is provided", async () => {
            const summary = await request(app).post('/summary')
            .send({'transcriptionId': transcription.body.task.transcriptionId})
            .send({'content': "Custom content"})
            
            expect(source.status).toBe(201)
            expect(transcription.body.task).toBeDefined()
            expect(summary.body.task).toBeDefined()
            expect(summary.status).toBe(201)
            expect(summary.body.task.transcriptionId).toBe(transcription.body.task.transcriptionId)
        });

        it("should return 400 with error 'Internal Server Error' and details 'transcriptionId must be provided' when transcriptionId is not provided", async () => {
            const summary = await request(app).post('/summary')
            .send({'content': "Custom content"})
            
            expect(summary.body.error).toBe("Internal Server Error")
            expect(summary.body.details).toBe("transcriptionId must be provided")
            expect(summary.status).toBe(400);
        });
    });

    describe("GET summary (id)", () => {
        it("should return all summaries with status 200", async () => {
            const summaries = await prisma.summary.findMany();
            const response = await request(app).get("/summary");

            expect(response.body.data.length).toBe(summaries.length);
            expect(response.status).toBe(200);
        });

        it("should return a summary by its id with status 200", async () => {
            // get a random summary
            const summary = await prisma.summary.findFirst()

            // get summary by id
            const response = await request(app).get(`/summary/${summary?.id}`);
            expect(response.status).toBe(200)

            // check summary route is able to retrieve a summary by id 
            /* expect(response.body.sourceId).toBe(summary?.sourceId) */
        });

        it("should return 400 when id is not a number", async () => {
            const response = await request(app).get("/summary/test");

            expect(response.status).toBe(400);
        });
    });

    describe("DELETE summary (id)", () => {
        it("should delete a summary and return 201 when transcriptionId is provided", async () => {
            // to create a new summary, i need a transcriptionID
            const transcriptionid = transcription.body.task.transcriptionId
            expect(transcriptionid).toBeDefined()
            const summary: Summary = await prisma.summary.create({data : {transcriptionId: transcriptionid, content :"testing purpose"}})
            expect(summary).toBeDefined()

            // delete this summary
            const response = await request(app).delete(`/summary/${summary?.id}`);
            expect(response.status).toBe(201)
            expect(response.body.id).toBe(summary.id);
            expect(response.body.transcriptionId).toBe(summary.transcriptionId);
            expect(response.body.content).toBe(summary.content);

            // this summary was deleted from db
            const deletedSummary = await prisma.summary.findUnique({where : {id:summary.id}})
            expect(deletedSummary).toBe(null)
            console.log("deleted summary",deletedSummary)
            /* expect().toBeDefined */

        });
        
        it("should return 400 when summary is not provided", async () => {
            // to create a new summary, i need a transcriptionID
            const transcriptionid = transcription.body.task.transcriptionId
            expect(transcriptionid).toBeDefined()
            const summary: Summary = await prisma.summary.create({data : {transcriptionId: transcriptionid}})

            // delete this summary
            const response = await request(app).delete(`/summary`);
            expect(response.status).toBe(400);
        });
    });

    describe("PUT summary (id)", () => {
        it("should update a summary", () => {
            expect(true).toBe(false);
        });

        it("should return 401 when transcriptionId is not provided", () => {
            expect(true).toBe(false);
        });
    });
});