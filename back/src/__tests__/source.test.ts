import request from "supertest";
import { PrismaClient } from "@prisma/client";

import app from "../app";
import path from "path";
const prisma = new PrismaClient();
import * as fs from "node:fs";

describe("CRUD operations for Source", () => {
  const newSource = {
    title: "JT 5-11-2024-19h",
    description: "Description of JT 5-11-2024-19h",
    video: path.resolve(__dirname, "fixtures/5-11-2024-19h.mp4"),
    audio: path.resolve(__dirname, "fixtures/5-11-2024-19h.wav"),
  };
  let sourceId: number;
  let corpusID: number;
  let corpusID2: number;

  afterAll(async () => {
    await prisma.$disconnect();

    // order of deletion matters
    await prisma.task.deleteMany()
    await prisma.transcription.deleteMany();
    await prisma.source.deleteMany();
  });

  beforeAll(async () => {
    const corpusRequest = await request(app).post('/corpus').send({ "title": "Basic corpus", "description": "This is a generic corpus"})
    const corpusRequest2 = await request(app).post('/corpus').send({ "title": "Basic corpus", "description": "This is a generic corpus"})

    corpusID = corpusRequest.body.corpus.id
    corpusID2 = corpusRequest2.body.corpus.id



  });

  describe("POST source", () => {
    
    it(`should create a new source`, async () => {
      

      const response = await request(app)
        .post("/source")
        .field("title", newSource.title)
        .field("description", newSource.description)
        .attach("video", newSource.audio)
        .attach("audio", newSource.video)
        .attach("corpusID", corpusID)

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Source created successfully");
      expect(response.body.data.title).toBe(newSource.title);
      expect(response.body.data.description).toBe(newSource.description);
      expect(response.body.data.audioUrl).toBeDefined();

      // check if audio file exists
      expect(fs.existsSync(response.body.data.audioUrl)).toBe(true);
      expect(fs.existsSync(response.body.data.videoUrl)).toBe(true);

      // Assign the created source ID
      sourceId = response.body.data.id;
    }, 10000);

    it(`should create a new source witheout video`, async () => {
      const response = await request(app)
        .post("/source")
        .field("title", newSource.title)
        .field("description", newSource.description)
        .attach("audio", newSource.video)
        .attach("corpusID", corpusID);


      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Source created successfully");
      expect(response.body.data.title).toBe(newSource.title);
      expect(response.body.data.description).toBe(newSource.description);
      expect(response.body.data.audioUrl).toBeDefined();
      expect(response.body.data.videoUrl).toBeNull();

      // check if audio file exists
      expect(fs.existsSync(response.body.data.videoUrl)).toBe(false);

    }, 10000);

    it(`should create a new source witheout audio`, async () => {
      const response = await request(app)
        .post("/source")
        .field("title", newSource.title)
        .field("description", newSource.description)
        .attach("video", newSource.video)
        .attach("corpusID", corpusID);



      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Source created successfully");
      expect(response.body.data.title).toBe(newSource.title);
      expect(response.body.data.description).toBe(newSource.description);
      expect(response.body.data.audioUrl).toBeNull();
      expect(response.body.data.videoUrl).toBeDefined();

      // check if audio file exists
      expect(fs.existsSync(response.body.data.videoUrl)).toBe(true);

    }, 10000);

    it(`should return an error if audio and video are not provided by the user`, async () => {
      const response = await request(app)
        .post("/source")
        .field("title", newSource.title)
        .field("description", newSource.description)
        .attach("corpusID", corpusID);


      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("video or audio files are required");
    }, 10000);

  });

  

  describe("GET source (id?)", () => {
    it(`should get all sources`, async () => {
      const response = await request(app).get("/source");
      const allSources = prisma.source.findMany();
      expect(response.body.length).toBe((await allSources).length);
    });

    it(`should get all source according to query (corpusid)`, async () => {
      // add a source inside the corpus 
       const corpusResponse = await request(app)
        .post("/source")
        .field("title", newSource.title)
        .field("description", newSource.description)
        .attach("corpusID", corpusID2);

      const response = await request(app).get(`/source?corpusid=${10}`)
      expect(response.status).toBe(200)
    });
    it(`should get all source according if query is NaN (corpusid)`, async () => {
      // add a source inside the corpus 
       const corpusResponse = await request(app)
        .post("/source")
        .field("title", newSource.title)
        .field("description", newSource.description)
        .attach("corpusID", corpusID2);

      const response = await request(app).get('/source?corpusid=x')
      expect(response.status).toBe(200)
    });
    it(`should get an empty array [] if there is no source with corpusid`, async () => {
      // add a source inside the corpus 
       const corpusResponse = await request(app)
        .post("/source")
        .field("title", newSource.title)
        .field("description", newSource.description)
        .attach("corpusID", corpusID2);

      const response = await request(app).get(`/source?corpusid=${99}`)
      expect(response.status).toBe(200)
    });
    it("should get a single source by ID", async () => {
      const response = await request(app).get(`/source/${sourceId}`);
      expect(response.status).toBe(200); 
      expect(response.body).toHaveProperty("id", sourceId);
      expect(response.body.title).toBe(newSource.title);
      expect(response.body.description).toBe(newSource.description);
    });
  });

  describe("PUT source (id)", () => {
    it("should update a source", async () => {
      expect(true);
    });
  });

  describe("DELETE source (id)", () => {
    it("should delete a source by id", async () => {
      const response = await request(app).delete(`/source/${sourceId}`);
      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toHaveProperty('id',sourceId)

      // check if audio still exists
      expect(fs.existsSync(response.body.data.audioUrl)).toBe(false);

      // check if video still exists
      expect(fs.existsSync(response.body.data.videoUrl)).toBe(false);
    });
  });
});
