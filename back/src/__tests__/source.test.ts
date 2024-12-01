import request from 'supertest';
import { PrismaClient } from '@prisma/client';

import app from '../app'
import path from 'path';
const prisma = new PrismaClient();
import * as fs from 'node:fs';

describe('CRUD operations for Source', () => {

  const newSource = {
    title: 'JT 5-11-2024-19h',
    description: 'Description of JT 5-11-2024-19h',
    video: path.resolve(__dirname, 'fixtures/5-11-2024-19h.mp4'),
    audio: path.resolve(__dirname, 'fixtures/5-11-2024-19h.wav')
  };
  let sourceId: number;

  afterAll(async () => {
    await prisma.source.deleteMany({where : {}})
    await prisma.$disconnect();
  });

  it(`should create a new source ${JSON.stringify(newSource)}`, async () => {
    const response = await request(app)
      .post('/source')
      .field('title', newSource.title)
      .field('description', newSource.description)
      .attach('video', newSource.audio)
      .attach('audio', newSource.video);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Source created successfully');
    expect(response.body.data.title).toBe(newSource.title)
    expect(response.body.data.description).toBe(newSource.description)
    expect(response.body.data.audioUrl).toBeDefined()

    // check if audio file exists
    expect(fs.existsSync(response.body.data.audioUrl)).toBe(true)
    expect(fs.existsSync(response.body.data.videoUrl)).toBe(true)
    
    sourceId = response.body.data.id;
    
  });

  it(`should get all sources`, async () => {
    const response = await request(app).get('/source')
    const allSources = prisma.source.findMany()
    expect(response.body.length).toBe((await allSources).length)
  });

  it('should get a single source by ID', async () => {
    const response = await request(app).get(`/source/${sourceId}`)
    expect(response.body).toHaveProperty('id',sourceId)
    expect(response.body.title).toBe(newSource.title)
    expect(response.body.description).toBe(newSource.description)
  });

  it('should update a source', async () => {
    expect(true)
  });

  it('should delete a source', async () => {
    expect(true)
  });
});