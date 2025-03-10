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

  afterAll(async () => {
    await prisma.$disconnect();

    // order of deletion matters
    await prisma.task.deleteMany()
    await prisma.transcription.deleteMany();
    await prisma.source.deleteMany();
  });

  describe("POST /source", () => {
    it(`should create a new source`, async () => {
      const response = await request(app)
        .post("/source")
        .field("title", newSource.title)
        .field("description", newSource.description)
        .attach("video", newSource.audio)
        .attach("audio", newSource.video);

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
        .attach("audio", newSource.video);


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
        .attach("video", newSource.video);


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

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("video or audio files are required");
    }, 10000);

  });

  

  describe("GET /source", () => {
    it(`should get all sources`, async () => {
      const response = await request(app).get("/source");
      const allSources = prisma.source.findMany();
      expect(response.body.length).toBe((await allSources).length);
    });

    it("should get a single source by ID", async () => {
      const response = await request(app).get(`/source/${sourceId}`);
      expect(response.status).toBe(200); 
      expect(response.body).toHaveProperty("id", sourceId);
      expect(response.body.title).toBe(newSource.title);
      expect(response.body.description).toBe(newSource.description);
    });
  });

  describe("PUT /source", () => {
    it("should update a source", async () => {
      expect(true);
    });
  });

  describe("DELETE /source", () => {
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
